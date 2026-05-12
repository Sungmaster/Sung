import json
import pytest
from unittest.mock import patch, MagicMock
from scripts.fetch_rss import fetch_headlines, load_sample_headlines


def test_fetch_headlines_returns_list():
    mock_feed = MagicMock()
    mock_feed.entries = []
    with patch("scripts.fetch_rss.feedparser.parse", return_value=mock_feed):
        result = fetch_headlines()
    assert isinstance(result, list)


def test_fetch_headlines_caps_at_seven():
    entry = MagicMock()
    entry.get = lambda k, d="": {"title": "T", "summary": "S", "link": "L", "published": "P"}.get(k, d)
    mock_feed = MagicMock()
    mock_feed.entries = [entry] * 10
    with patch("scripts.fetch_rss.feedparser.parse", return_value=mock_feed):
        result = fetch_headlines(max_per_feed=10)
    assert len(result) <= 7


def test_fetch_headlines_graceful_on_failure():
    with patch("scripts.fetch_rss.feedparser.parse", side_effect=Exception("network error")):
        result = fetch_headlines()
    assert result == []


def test_headline_has_required_keys():
    entry = MagicMock()
    entry.get = lambda k, d="": {"title": "Title", "summary": "Summary", "link": "http://x.com", "published": "Mon"}.get(k, d)
    mock_feed = MagicMock()
    mock_feed.entries = [entry]
    # Use side_effect to return empty feed for first call, then feed with entry for second
    with patch("scripts.fetch_rss.feedparser.parse", side_effect=[mock_feed, MagicMock(entries=[])]):
        result = fetch_headlines()
    assert len(result) == 1
    assert set(result[0].keys()) == {"title", "summary", "link", "published"}


def test_load_sample_headlines(tmp_path, monkeypatch):
    sample = [{"title": "T", "summary": "S", "link": "L", "published": "P"}]
    sample_file = tmp_path / "rss_sample.json"
    sample_file.write_text(json.dumps(sample))
    monkeypatch.setenv("SAMPLE_DATA_DIR", str(tmp_path))
    result = load_sample_headlines()
    assert result == sample
