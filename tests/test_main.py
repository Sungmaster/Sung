import pytest
from unittest.mock import patch
from scripts.main import run

SAMPLE_HEADLINES = [{"title": "T", "summary": "S", "link": "L", "published": "P"}]
SAMPLE_VNINDEX = {"index": 1287.0, "change": 8.0, "change_pct": 0.6, "gainers": [], "losers": []}
SAMPLE_HTML = "<html><body>test</body></html>"


def test_run_calls_all_steps():
    with patch("scripts.main.fetch_headlines", return_value=SAMPLE_HEADLINES) as mock_rss, \
         patch("scripts.main.scrape_vnindex", return_value=SAMPLE_VNINDEX) as mock_vn, \
         patch("scripts.main.generate_brief", return_value=SAMPLE_HTML) as mock_gen, \
         patch("scripts.main.send_brief") as mock_email:
        run()
    mock_rss.assert_called_once()
    mock_vn.assert_called_once()
    mock_gen.assert_called_once_with(SAMPLE_HEADLINES, SAMPLE_VNINDEX)
    mock_email.assert_called_once_with(SAMPLE_HTML)


def test_run_uses_sample_data_when_env_set(monkeypatch):
    monkeypatch.setenv("USE_SAMPLE_DATA", "true")
    with patch("scripts.main.load_sample_headlines", return_value=SAMPLE_HEADLINES), \
         patch("scripts.main.load_sample_vnindex", return_value=SAMPLE_VNINDEX), \
         patch("scripts.main.generate_brief", return_value=SAMPLE_HTML), \
         patch("scripts.main.send_brief"):
        run()


def test_run_raises_on_email_failure():
    with patch("scripts.main.fetch_headlines", return_value=SAMPLE_HEADLINES), \
         patch("scripts.main.scrape_vnindex", return_value=SAMPLE_VNINDEX), \
         patch("scripts.main.generate_brief", return_value=SAMPLE_HTML), \
         patch("scripts.main.send_brief", side_effect=Exception("SMTP error")):
        with pytest.raises(Exception, match="SMTP error"):
            run()
