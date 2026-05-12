import json
import pytest
from unittest.mock import patch, MagicMock
from bs4 import BeautifulSoup
from scripts.scrape_vnindex import scrape_vnindex, load_sample_vnindex, _parse, EMPTY_VNINDEX


MOCK_HTML = """
<html><body>
<div class="price-board">
  <span class="index-value">1,287.45</span>
  <span class="index-change">+8.32</span>
  <span class="index-change-pct">+0.65%</span>
</div>
<table class="top-movers">
  <tr class="gainer"><td class="ticker">VNM</td><td class="price">80,500</td><td class="pct">+4.80%</td></tr>
  <tr class="gainer"><td class="ticker">FPT</td><td class="price">125,000</td><td class="pct">+3.20%</td></tr>
  <tr class="gainer"><td class="ticker">MWG</td><td class="price">45,200</td><td class="pct">+2.90%</td></tr>
  <tr class="loser"><td class="ticker">HPG</td><td class="price">26,300</td><td class="pct">-2.10%</td></tr>
  <tr class="loser"><td class="ticker">VIC</td><td class="price">42,100</td><td class="pct">-1.80%</td></tr>
  <tr class="loser"><td class="ticker">NVL</td><td class="price">11,500</td><td class="pct">-1.50%</td></tr>
</table>
</body></html>
"""


def test_scrape_vnindex_returns_dict():
    mock_resp = MagicMock()
    mock_resp.text = MOCK_HTML
    mock_resp.raise_for_status = MagicMock()
    with patch("scripts.scrape_vnindex.requests.get", return_value=mock_resp):
        result = scrape_vnindex()
    assert isinstance(result, dict)


def test_scrape_vnindex_has_required_keys():
    mock_resp = MagicMock()
    mock_resp.text = MOCK_HTML
    mock_resp.raise_for_status = MagicMock()
    with patch("scripts.scrape_vnindex.requests.get", return_value=mock_resp):
        result = scrape_vnindex()
    assert set(result.keys()) == {"index", "change", "change_pct", "gainers", "losers"}


def test_scrape_vnindex_graceful_on_network_failure():
    with patch("scripts.scrape_vnindex.requests.get", side_effect=Exception("timeout")):
        result = scrape_vnindex()
    assert result == EMPTY_VNINDEX


def test_scrape_vnindex_graceful_on_http_error():
    mock_resp = MagicMock()
    mock_resp.raise_for_status.side_effect = Exception("404")
    with patch("scripts.scrape_vnindex.requests.get", return_value=mock_resp):
        result = scrape_vnindex()
    assert result == EMPTY_VNINDEX


def test_load_sample_vnindex(tmp_path, monkeypatch):
    sample = {"index": 1287.45, "change": 8.32, "change_pct": 0.65, "gainers": [], "losers": []}
    sample_file = tmp_path / "vnindex_sample.json"
    sample_file.write_text(json.dumps(sample))
    monkeypatch.setenv("SAMPLE_DATA_DIR", str(tmp_path))
    result = load_sample_vnindex()
    assert result == sample


def test_parse_returns_empty_on_malformed_html():
    soup = BeautifulSoup("<html><body></body></html>", "html.parser")
    result = _parse(soup)
    assert result["index"] is None
    assert result["gainers"] == []
    assert result["losers"] == []
