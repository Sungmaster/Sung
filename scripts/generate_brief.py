import os
from datetime import date
from jinja2 import Environment, FileSystemLoader


def generate_brief(
    headlines: list[dict],
    vnindex: dict,
    output_dir: str = "output",
    template_dir: str = "templates",
) -> str:
    today = date.today()
    today_display = today.strftime("%d/%m/%Y")
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template("morning_brief.html")
    html = template.render(date=today_display, headlines=headlines, vnindex=vnindex)

    os.makedirs(output_dir, exist_ok=True)
    filename = os.path.join(output_dir, f"{today.isoformat()}.html")
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)

    return html
