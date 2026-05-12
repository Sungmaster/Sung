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
