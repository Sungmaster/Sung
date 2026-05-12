import json
import pytest
from pathlib import Path

SAMPLE_JSON_PATH = Path(__file__).parent.parent / "sample_data" / "sample_20260512.json"

REQUIRED_TOP_FIELDS = [
    "date", "market_summary", "vnindex", "global_indices",
    "top_movers", "sector_performance", "macro_themes",
    "scenarios", "actions", "portfolio_changes",
    "economic_calendar", "commodities", "fx_rates",
    "analyst_note", "disclaimer",
]

@pytest.fixture
def sample_data():
    return json.loads(SAMPLE_JSON_PATH.read_text())

def test_sample_json_exists():
    assert SAMPLE_JSON_PATH.exists(), f"Missing: {SAMPLE_JSON_PATH}"

def test_sample_json_has_required_fields():
    data = json.loads(SAMPLE_JSON_PATH.read_text())
    for field in REQUIRED_TOP_FIELDS:
        assert field in data, f"Missing required field: {field}"

def test_sample_json_scenarios_sum_to_100():
    data = json.loads(SAMPLE_JSON_PATH.read_text())
    total = sum(s["probability_pct"] for s in data["scenarios"])
    assert total == 100, f"Scenario probabilities must sum to 100, got {total}"

def test_sample_json_vnindex_has_required_keys():
    data = json.loads(SAMPLE_JSON_PATH.read_text())
    vn = data["vnindex"]
    for key in ["current", "change", "change_pct", "volume_bn_vnd", "gainers", "losers"]:
        assert key in vn, f"vnindex missing key: {key}"

def test_sample_json_actions_non_empty():
    data = json.loads(SAMPLE_JSON_PATH.read_text())
    assert len(data["actions"]) >= 1, "actions must have at least 1 item"

from pathlib import Path as _Path

CSS_PATH = _Path(__file__).parent.parent / "templates" / "morning_brief_style.css"

def test_css_file_exists():
    assert CSS_PATH.exists(), f"Missing: {CSS_PATH}"

def test_css_contains_color_tokens():
    css = CSS_PATH.read_text()
    assert "#F5B800" in css, "Missing yellow brand color #F5B800"
    assert "#111827" in css, "Missing navy color #111827"
    assert "#047857" in css, "Missing positive green #047857"
    assert "#B91C1C" in css, "Missing negative red #B91C1C"

def test_css_contains_a4_page():
    css = CSS_PATH.read_text()
    assert "@page" in css, "Missing @page rule for A4"
    assert "210mm" in css or "A4" in css, "Missing A4 dimensions"

from jinja2 import Environment, FileSystemLoader, select_autoescape as _select_autoescape

_TEMPLATE_DIR = str(_Path(__file__).parent.parent / "templates")
_TEMPLATE_NAME = "morning_brief_template.html"

def _render_template(data: dict) -> str:
    env = Environment(
        loader=FileSystemLoader(_TEMPLATE_DIR),
        autoescape=_select_autoescape(["html"]),
    )
    tmpl = env.get_template(_TEMPLATE_NAME)
    css = (_Path(_TEMPLATE_DIR) / "morning_brief_style.css").read_text()
    return tmpl.render(**data, css_content=css, chart_uri=None)

def test_template_renders_without_error(sample_data):
    html = _render_template(sample_data)
    assert "<html" in html

def test_template_contains_vnindex(sample_data):
    html = _render_template(sample_data)
    assert "1287" in html

def test_template_contains_scenarios(sample_data):
    html = _render_template(sample_data)
    assert "Co so" in html
    assert "Tang gia" in html

def test_template_contains_actions(sample_data):
    html = _render_template(sample_data)
    assert "VCB" in html

def test_template_contains_disclaimer(sample_data):
    html = _render_template(sample_data)
    assert "Cafe Capital" in html

from scripts.generate_morning_brief_pdf import validate_data, generate_chart, render_html, quality_check, run_pipeline

def test_validate_data_passes_with_valid_json(sample_data):
    validate_data(sample_data)  # must not raise

def test_validate_data_raises_on_missing_field(sample_data):
    del sample_data["vnindex"]
    with pytest.raises(ValueError, match="vnindex"):
        validate_data(sample_data)

def test_validate_data_raises_if_scenarios_do_not_sum_to_100(sample_data):
    sample_data["scenarios"][0]["probability_pct"] = 99
    with pytest.raises(ValueError, match="100"):
        validate_data(sample_data)

def test_generate_chart_creates_png(sample_data, tmp_path):
    uri = generate_chart(sample_data, str(tmp_path))
    assert uri.startswith("file:///"), f"Expected file:// URI, got: {uri}"
    chart_path = tmp_path / "sector_chart.png"
    assert chart_path.exists(), "sector_chart.png not created"
    assert chart_path.stat().st_size > 1000, "Chart PNG too small"

def test_render_html_contains_expected_content(sample_data, tmp_path):
    uri = generate_chart(sample_data, str(tmp_path))
    html = render_html(sample_data, uri, str(_Path(__file__).parent.parent / "templates"))
    assert "<html" in html
    assert "1287" in html
    assert "VCB" in html

def test_quality_check_passes_for_good_html_and_pdf(tmp_path):
    pdf_path = tmp_path / "test.pdf"
    pdf_path.write_bytes(b"%PDF-1.4 " + b"x" * 15000)
    result = quality_check("<html><body>ok</body></html>", str(pdf_path))
    assert result["ok"] is True
    assert result["issues"] == []

def test_quality_check_flags_small_pdf(tmp_path):
    pdf_path = tmp_path / "tiny.pdf"
    pdf_path.write_bytes(b"tiny")
    result = quality_check("<html></html>", str(pdf_path))
    assert result["ok"] is False
    assert any("small" in issue for issue in result["issues"])
