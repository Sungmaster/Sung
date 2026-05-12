import logging
import os
import sys

from scripts.fetch_rss import fetch_headlines, load_sample_headlines
from scripts.scrape_vnindex import scrape_vnindex, load_sample_vnindex
from scripts.generate_brief import generate_brief
from scripts.send_email import send_brief

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


def run() -> None:
    use_sample = os.environ.get("USE_SAMPLE_DATA", "").lower() == "true"

    if use_sample:
        logging.info("Using sample data (USE_SAMPLE_DATA=true)")
        headlines = load_sample_headlines()
        vnindex = load_sample_vnindex()
    else:
        headlines = fetch_headlines()
        vnindex = scrape_vnindex()

    html = generate_brief(headlines, vnindex)
    send_brief(html)
    logging.info("Morning brief complete.")


if __name__ == "__main__":
    try:
        run()
    except Exception as e:
        logging.error("Fatal error: %s", e, exc_info=True)
        sys.exit(1)
