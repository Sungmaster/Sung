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
