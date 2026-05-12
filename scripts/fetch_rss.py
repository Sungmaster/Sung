import json
import logging
import os
import feedparser

RSS_FEEDS = [
    "https://feeds.reuters.com/reuters/businessNews",
    "https://feeds.bbci.co.uk/news/business/rss.xml",
]


def fetch_headlines(max_per_feed: int = 4) -> list[dict]:
    headlines = []
    for url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:max_per_feed]:
                headlines.append({
                    "title": entry.get("title", ""),
                    "summary": entry.get("summary", ""),
                    "link": entry.get("link", ""),
                    "published": entry.get("published", ""),
                })
        except Exception as e:
            logging.warning(f"RSS fetch failed for {url}: {e}")
    return headlines[:7]


def load_sample_headlines() -> list[dict]:
    data_dir = os.environ.get("SAMPLE_DATA_DIR", "sample_data")
    path = os.path.join(data_dir, "rss_sample.json")
    with open(path) as f:
        return json.load(f)
