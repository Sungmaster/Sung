import json
import logging
import os
import requests
from bs4 import BeautifulSoup

CAFEF_URL = "https://cafef.vn/thi-truong-chung-khoan.chn"

EMPTY_VNINDEX = {
    "index": None,
    "change": None,
    "change_pct": None,
    "gainers": [],
    "losers": [],
}


def scrape_vnindex() -> dict:
    try:
        resp = requests.get(
            CAFEF_URL,
            timeout=10,
            headers={"User-Agent": "Mozilla/5.0 (compatible; CafeCapitalBot/1.0)"},
        )
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")
        return _parse(soup)
    except Exception as e:
        logging.warning(f"VnIndex scrape failed: {e}")
        return {**EMPTY_VNINDEX, "gainers": [], "losers": []}


def _parse(soup: BeautifulSoup) -> dict:
    try:
        index_el = soup.select_one(".index-value")
        change_el = soup.select_one(".index-change")
        change_pct_el = soup.select_one(".index-change-pct")

        index = float(index_el.text.strip().replace(",", "")) if index_el else None
        change = float(change_el.text.strip().replace(",", "").replace("+", "")) if change_el else None
        change_pct = (
            float(change_pct_el.text.strip().replace(",", "").replace("+", "").replace("%", ""))
            if change_pct_el else None
        )

        gainers = [
            {
                "ticker": r.select_one(".ticker").text.strip(),
                "price": r.select_one(".price").text.strip(),
                "change_pct": float(r.select_one(".pct").text.strip().replace("+", "").replace("%", "")),
            }
            for r in soup.select("tr.gainer")[:3]
        ]
        losers = [
            {
                "ticker": r.select_one(".ticker").text.strip(),
                "price": r.select_one(".price").text.strip(),
                "change_pct": float(r.select_one(".pct").text.strip().replace(",", "").replace("+", "").replace("%", "")),
            }
            for r in soup.select("tr.loser")[:3]
        ]
        return {"index": index, "change": change, "change_pct": change_pct, "gainers": gainers, "losers": losers}
    except Exception as e:
        logging.warning(f"VnIndex parse failed: {e}")
        return {**EMPTY_VNINDEX, "gainers": [], "losers": []}


def load_sample_vnindex() -> dict:
    data_dir = os.environ.get("SAMPLE_DATA_DIR", "sample_data")
    path = os.path.join(data_dir, "vnindex_sample.json")
    try:
        with open(path) as f:
            return json.load(f)
    except Exception as e:
        logging.error(f"Failed to load sample vnindex from {path}: {e}")
        raise
