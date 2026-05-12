import argparse
import json
import logging
import os
import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from jinja2 import Environment, FileSystemLoader, select_autoescape
from weasyprint import HTML

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

REQUIRED_FIELDS = [
    "date", "market_summary", "vnindex", "global_indices",
    "top_movers", "sector_performance", "macro_themes",
    "scenarios", "actions", "portfolio_changes",
    "economic_calendar", "commodities", "fx_rates",
    "analyst_note", "disclaimer",
]


def validate_data(data: dict) -> None:
    for field in REQUIRED_FIELDS:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
    total = sum(s["probability_pct"] for s in data["scenarios"])
    if total != 100:
        raise ValueError(f"Scenario probabilities must sum to 100, got {total}")


def generate_chart(data: dict, out_dir: str) -> str:
    sectors = [s["sector"] for s in data["sector_performance"]]
    changes = [s["change_pct"] for s in data["sector_performance"]]
    colors = ["#047857" if c >= 0 else "#B91C1C" for c in changes]

    fig, ax = plt.subplots(figsize=(8, 2.8))
    ax.barh(sectors, changes, color=colors, height=0.6)
    ax.axvline(0, color="#111827", linewidth=0.8)
    ax.set_xlabel("Thay doi (%)", fontsize=8)
    ax.tick_params(labelsize=8)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    fig.tight_layout(pad=0.5)

    os.makedirs(out_dir, exist_ok=True)
    chart_path = Path(out_dir) / "sector_chart.png"
    fig.savefig(str(chart_path), dpi=150, bbox_inches="tight")
    plt.close(fig)
    return chart_path.absolute().as_uri()


def render_html(data: dict, chart_uri: str, template_dir: str) -> str:
    env = Environment(
        loader=FileSystemLoader(template_dir),
        autoescape=select_autoescape(["html"]),
    )
    template = env.get_template("morning_brief_template.html")
    css = (Path(template_dir) / "morning_brief_style.css").read_text()
    return template.render(**data, css_content=css, chart_uri=chart_uri)


def quality_check(html: str, pdf_path: str) -> dict:
    issues = []
    if "<html" not in html:
        issues.append("HTML missing <html> tag")
    pdf_size = os.path.getsize(pdf_path)
    if pdf_size < 10_000:
        issues.append(f"PDF suspiciously small: {pdf_size} bytes")
    return {"issues": issues, "pdf_size_bytes": pdf_size, "ok": len(issues) == 0}


def run_pipeline(json_path: str, out_dir: str = "output", template_dir: str = "templates") -> dict:
    logging.info("Step 1: Loading data from %s", json_path)
    data = json.loads(Path(json_path).read_text())

    logging.info("Step 2: Validating data")
    validate_data(data)

    logging.info("Step 3: Generating sector chart")
    chart_uri = generate_chart(data, out_dir)

    logging.info("Step 4: Rendering HTML")
    html = render_html(data, chart_uri, template_dir)

    logging.info("Step 5: Converting HTML to PDF")
    os.makedirs(out_dir, exist_ok=True)
    pdf_path = str(Path(out_dir) / f"{data['date']}.pdf")
    HTML(string=html, base_url=str(Path(out_dir).absolute())).write_pdf(pdf_path)
    logging.info("PDF written: %s", pdf_path)

    logging.info("Step 6: Quality check")
    qc = quality_check(html, pdf_path)
    if not qc["ok"]:
        logging.warning("Quality issues: %s", qc["issues"])

    return {"html": html, "pdf_path": pdf_path, "quality": qc}


def main():
    parser = argparse.ArgumentParser(description="Generate Cafe Capital Morning Brief PDF")
    parser.add_argument("json_path", help="Path to input JSON file")
    parser.add_argument("--out-dir", default="output", help="Output directory (default: output)")
    parser.add_argument("--template-dir", default="templates", help="Template directory (default: templates)")
    args = parser.parse_args()

    try:
        result = run_pipeline(args.json_path, args.out_dir, args.template_dir)
        print(f"PDF generated: {result['pdf_path']}")
        print(f"PDF size: {result['quality']['pdf_size_bytes']:,} bytes")
        if result["quality"]["issues"]:
            print(f"Quality issues: {result['quality']['issues']}")
            sys.exit(1)
    except Exception as e:
        logging.error("Pipeline failed: %s", e, exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
