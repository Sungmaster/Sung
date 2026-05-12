# Cafe Capital Morning Brief — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an automated daily morning brief that fetches global economics RSS news and Vietnamese VnIndex data, renders a Vietnamese HTML report, emails it to recipients, and saves it as a file — triggered by a GitHub Actions cron at 6:00 AM Vietnam time.

**Architecture:** Python scripts run sequentially: `fetch_rss.py` pulls RSS headlines, `scrape_vnindex.py` scrapes VnIndex data from CafeF, `generate_brief.py` renders a Jinja2 HTML template in Vietnamese, and `send_email.py` delivers the result via SMTP. Orchestrated by `main.py` and scheduled via GitHub Actions. Sample data files enable local testing without network calls.

**Tech Stack:** Python 3.11+, feedparser, requests, beautifulsoup4, jinja2, python-dotenv, pytest, GitHub Actions

---

## File Map

| File | Responsibility |
|---|---|
| `scripts/fetch_rss.py` | Fetch top headlines from RSS feeds; load sample data |
| `scripts/scrape_vnindex.py` | Scrape VnIndex value and top movers from CafeF; load sample data |
| `scripts/generate_brief.py` | Render Jinja2 template and save dated HTML file |
| `scripts/send_email.py` | Send HTML report via SMTP using env var credentials |
| `scripts/main.py` | Orchestrate all steps; support `USE_SAMPLE_DATA` flag |
| `templates/morning_brief.html` | Jinja2 HTML template, fully in Vietnamese |
| `sample_data/rss_sample.json` | Static RSS data for local testing |
| `sample_data/vnindex_sample.json` | Static VnIndex data for local testing |
| `tests/test_fetch_rss.py` | Tests for RSS fetcher |
| `tests/test_scrape_vnindex.py` | Tests for VnIndex scraper |
| `tests/test_generate_brief.py` | Tests for HTML generator |
| `tests/test_send_email.py` | Tests for email sender |
| `tests/test_main.py` | Tests for orchestrator |
| `.github/workflows/morning_brief.yml` | Scheduled GitHub Actions workflow |
| `requirements.txt` | Runtime dependencies |
| `requirements-dev.txt` | Dev/test dependencies |
| `.gitignore` | Ignore output HTML files and secrets |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `requirements.txt`
- Create: `requirements-dev.txt`
- Create: `.gitignore`
- Create: `output/.gitkeep`
- Create: `scripts/__init__.py`
- Create: `tests/__init__.py`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p scripts templates sample_data output tests .github/workflows
touch scripts/__init__.py tests/__init__.py output/.gitkeep
```

- [ ] **Step 2: Create requirements.txt**

Create `requirements.txt`:
```
feedparser==6.0.11
requests==2.31.0
beautifulsoup4==4.12.3
jinja2==3.1.4
python-dotenv==1.0.1
```

- [ ] **Step 3: Create requirements-dev.txt**

Create `requirements-dev.txt`:
```
-r requirements.txt
pytest==8.2.0
pytest-mock==3.14.0
```

- [ ] **Step 4: Create .gitignore**

Create `.gitignore`:
```
output/*.html
.env
__pycache__/
*.pyc
.pytest_cache/
```

- [ ] **Step 5: Install dependencies**

```bash
pip install -r requirements-dev.txt
```

Expected: All packages install without errors.

- [ ] **Step 6: Commit**

```bash
git add requirements.txt requirements-dev.txt .gitignore output/.gitkeep scripts/__init__.py tests/__init__.py
git commit -m "chore: scaffold project structure"
```

---

### Task 2: Sample Data

**Files:**
- Create: `sample_data/rss_sample.json`
- Create: `sample_data/vnindex_sample.json`

- [ ] **Step 1: Create rss_sample.json**

Create `sample_data/rss_sample.json`:
```json
[
  {
    "title": "Fed giữ nguyên lãi suất, tín hiệu cắt giảm vào cuối năm",
    "summary": "Cục Dự trữ Liên bang Mỹ giữ nguyên lãi suất cơ bản ở mức 5.25-5.5% trong cuộc họp tháng 5.",
    "link": "https://reuters.com/example-1",
    "published": "Mon, 12 May 2026 04:00:00 GMT"
  },
  {
    "title": "Giá dầu tăng do lo ngại nguồn cung từ Trung Đông",
    "summary": "Giá dầu thô Brent tăng 1.2% lên 84.50 USD/thùng trong phiên giao dịch châu Á.",
    "link": "https://reuters.com/example-2",
    "published": "Mon, 12 May 2026 03:30:00 GMT"
  },
  {
    "title": "IMF nâng dự báo tăng trưởng kinh tế toàn cầu 2026",
    "summary": "IMF điều chỉnh dự báo GDP toàn cầu lên 3.2%, nhờ phục hồi mạnh tại Mỹ và Đông Nam Á.",
    "link": "https://reuters.com/example-3",
    "published": "Mon, 12 May 2026 02:00:00 GMT"
  }
]
```

- [ ] **Step 2: Create vnindex_sample.json**

Create `sample_data/vnindex_sample.json`:
```json
{
  "index": 1287.45,
  "change": 8.32,
  "change_pct": 0.65,
  "gainers": [
    {"ticker": "VNM", "price": "80,500", "change_pct": 4.8},
    {"ticker": "FPT", "price": "125,000", "change_pct": 3.2},
    {"ticker": "MWG", "price": "45,200", "change_pct": 2.9}
  ],
  "losers": [
    {"ticker": "HPG", "price": "26,300", "change_pct": -2.1},
    {"ticker": "VIC", "price": "42,100", "change_pct": -1.8},
    {"ticker": "NVL", "price": "11,500", "change_pct": -1.5}
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add sample_data/
git commit -m "chore: add sample data for local testing"
```

---

### Task 3: RSS Fetcher

**Files:**
- Create: `scripts/fetch_rss.py`
- Create: `tests/test_fetch_rss.py`

- [ ] **Step 1: Write failing tests**

Create `tests/test_fetch_rss.py`:
```python
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
    with patch("scripts.fetch_rss.feedparser.parse", return_value=mock_feed):
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_fetch_rss.py -v
```

Expected: `ImportError` — `fetch_rss` does not exist yet.

- [ ] **Step 3: Implement fetch_rss.py**

Create `scripts/fetch_rss.py`:
```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pytest tests/test_fetch_rss.py -v
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch_rss.py tests/test_fetch_rss.py
git commit -m "feat: add RSS headline fetcher with tests"
```

---

### Task 4: VnIndex Scraper

**Files:**
- Create: `scripts/scrape_vnindex.py`
- Create: `tests/test_scrape_vnindex.py`

- [ ] **Step 1: Write failing tests**

Create `tests/test_scrape_vnindex.py`:
```python
import json
import pytest
from unittest.mock import patch, MagicMock
from scripts.scrape_vnindex import scrape_vnindex, load_sample_vnindex, EMPTY_VNINDEX


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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_scrape_vnindex.py -v
```

Expected: `ImportError` — `scrape_vnindex` does not exist yet.

- [ ] **Step 3: Implement scrape_vnindex.py**

Create `scripts/scrape_vnindex.py`:
```python
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
        return EMPTY_VNINDEX


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
                "change_pct": float(r.select_one(".pct").text.strip().replace("+", "").replace("%", "")),
            }
            for r in soup.select("tr.loser")[:3]
        ]
        return {"index": index, "change": change, "change_pct": change_pct, "gainers": gainers, "losers": losers}
    except Exception as e:
        logging.warning(f"VnIndex parse failed: {e}")
        return EMPTY_VNINDEX


def load_sample_vnindex() -> dict:
    data_dir = os.environ.get("SAMPLE_DATA_DIR", "sample_data")
    path = os.path.join(data_dir, "vnindex_sample.json")
    with open(path) as f:
        return json.load(f)
```

> **Note:** The CSS selectors (`.index-value`, `tr.gainer`, etc.) are written to match the mock HTML used in tests. Before the first live run, verify them against the actual CafeF page at `https://cafef.vn/thi-truong-chung-khoan.chn` and update `_parse()` selectors as needed. The graceful fallback to `EMPTY_VNINDEX` means a selector mismatch won't crash the workflow.

- [ ] **Step 4: Run tests to verify they pass**

```bash
pytest tests/test_scrape_vnindex.py -v
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/scrape_vnindex.py tests/test_scrape_vnindex.py
git commit -m "feat: add VnIndex scraper with tests"
```

---

### Task 5: HTML Template

**Files:**
- Create: `templates/morning_brief.html`

- [ ] **Step 1: Create the Jinja2 template**

Create `templates/morning_brief.html`:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bản Tin Sáng - Cafe Capital - {{ date }}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; padding: 20px; color: #222; }
    h1 { color: #1a4a2e; border-bottom: 2px solid #1a4a2e; padding-bottom: 8px; }
    h2 { color: #2d6a4f; margin-top: 32px; }
    .headline { margin-bottom: 16px; border-left: 3px solid #2d6a4f; padding-left: 12px; }
    .headline a { color: #1a4a2e; text-decoration: none; font-weight: bold; }
    .headline p { margin: 4px 0 0; color: #555; font-size: 0.9em; }
    .vn-summary { background: #f0f7f4; padding: 16px; border-radius: 6px; margin-bottom: 24px; }
    .change-up { color: #2d6a4f; font-weight: bold; }
    .change-down { color: #c0392b; font-weight: bold; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th { background: #2d6a4f; color: white; padding: 8px; text-align: left; font-size: 0.85em; }
    td { padding: 7px 8px; font-size: 0.9em; border-bottom: 1px solid #e0e0e0; }
    .no-data { color: #888; font-style: italic; }
    .footer { margin-top: 40px; font-size: 0.8em; color: #999; border-top: 1px solid #eee; padding-top: 12px; }
  </style>
</head>
<body>
  <h1>Ban Tin Sang &mdash; Cafe Capital</h1>
  <p>Xin chao! Day la ban tin buoi sang ngay <strong>{{ date }}</strong>.</p>

  <h2>Kinh Te The Gioi</h2>
  {% if headlines %}
    {% for item in headlines %}
      <div class="headline">
        <a href="{{ item.link }}" target="_blank">{{ item.title }}</a>
        {% if item.summary %}
          <p>{{ item.summary }}</p>
        {% endif %}
      </div>
    {% endfor %}
  {% else %}
    <p class="no-data">Khong co du lieu tin tuc hom nay.</p>
  {% endif %}

  <h2>Thi Truong Chung Khoan Viet Nam</h2>
  <div class="vn-summary">
    {% if vnindex.index is not none %}
      <p>
        <strong>VN-Index:</strong> {{ "%.2f"|format(vnindex.index) }}
        {% if vnindex.change is not none %}
          {% if vnindex.change >= 0 %}
            <span class="change-up">+{{ "%.2f"|format(vnindex.change) }} (+{{ "%.2f"|format(vnindex.change_pct) }}%)</span>
          {% else %}
            <span class="change-down">{{ "%.2f"|format(vnindex.change) }} ({{ "%.2f"|format(vnindex.change_pct) }}%)</span>
          {% endif %}
        {% endif %}
      </p>
    {% else %}
      <p class="no-data">Khong co du lieu VN-Index hom nay.</p>
    {% endif %}

    {% if vnindex.gainers %}
      <table>
        <tr><th colspan="3">Top tang manh</th></tr>
        <tr><th>Ma CP</th><th>Gia (VND)</th><th>% Thay doi</th></tr>
        {% for g in vnindex.gainers %}
          <tr>
            <td><strong>{{ g.ticker }}</strong></td>
            <td>{{ g.price }}</td>
            <td class="change-up">+{{ "%.2f"|format(g.change_pct) }}%</td>
          </tr>
        {% endfor %}
      </table>
    {% endif %}

    {% if vnindex.losers %}
      <table style="margin-top: 16px;">
        <tr><th colspan="3">Top giam manh</th></tr>
        <tr><th>Ma CP</th><th>Gia (VND)</th><th>% Thay doi</th></tr>
        {% for l in vnindex.losers %}
          <tr>
            <td><strong>{{ l.ticker }}</strong></td>
            <td>{{ l.price }}</td>
            <td class="change-down">{{ "%.2f"|format(l.change_pct) }}%</td>
          </tr>
        {% endfor %}
      </table>
    {% endif %}
  </div>

  <div class="footer">
    Ban tin duoc tao tu dong boi he thong Cafe Capital Morning Brief.<br>
    Thoi gian: {{ date }} 06:00 SA (GMT+7)
  </div>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add templates/morning_brief.html
git commit -m "feat: add Vietnamese morning brief Jinja2 template"
```

---

### Task 6: Brief Generator

**Files:**
- Create: `scripts/generate_brief.py`
- Create: `tests/test_generate_brief.py`

- [ ] **Step 1: Write failing tests**

Create `tests/test_generate_brief.py`:
```python
import pytest
from pathlib import Path
from scripts.generate_brief import generate_brief

SAMPLE_HEADLINES = [
    {"title": "Fed giu lai suat", "summary": "Fed khong thay doi lai suat.", "link": "http://x.com", "published": "Mon"},
]

SAMPLE_VNINDEX = {
    "index": 1287.45,
    "change": 8.32,
    "change_pct": 0.65,
    "gainers": [{"ticker": "VNM", "price": "80,500", "change_pct": 4.8}],
    "losers": [{"ticker": "HPG", "price": "26,300", "change_pct": -2.1}],
}

TEMPLATE_DIR = str(Path(__file__).parent.parent / "templates")


def test_generate_brief_returns_html(tmp_path):
    result = generate_brief(SAMPLE_HEADLINES, SAMPLE_VNINDEX, output_dir=str(tmp_path), template_dir=TEMPLATE_DIR)
    assert "<html" in result
    assert "VN-Index" in result


def test_generate_brief_contains_headlines(tmp_path):
    result = generate_brief(SAMPLE_HEADLINES, SAMPLE_VNINDEX, output_dir=str(tmp_path), template_dir=TEMPLATE_DIR)
    assert "Fed giu lai suat" in result


def test_generate_brief_saves_file(tmp_path):
    generate_brief(SAMPLE_HEADLINES, SAMPLE_VNINDEX, output_dir=str(tmp_path), template_dir=TEMPLATE_DIR)
    files = list(tmp_path.glob("*.html"))
    assert len(files) == 1


def test_generate_brief_empty_headlines(tmp_path):
    result = generate_brief([], SAMPLE_VNINDEX, output_dir=str(tmp_path), template_dir=TEMPLATE_DIR)
    assert "Khong co du lieu tin tuc" in result


def test_generate_brief_empty_vnindex(tmp_path):
    empty_vn = {"index": None, "change": None, "change_pct": None, "gainers": [], "losers": []}
    result = generate_brief(SAMPLE_HEADLINES, empty_vn, output_dir=str(tmp_path), template_dir=TEMPLATE_DIR)
    assert "Khong co du lieu VN-Index" in result
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_generate_brief.py -v
```

Expected: `ImportError` — `generate_brief` does not exist yet.

- [ ] **Step 3: Implement generate_brief.py**

Create `scripts/generate_brief.py`:
```python
import os
from datetime import date
from jinja2 import Environment, FileSystemLoader


def generate_brief(
    headlines: list[dict],
    vnindex: dict,
    output_dir: str = "output",
    template_dir: str = "templates",
) -> str:
    today = date.today().strftime("%d/%m/%Y")
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template("morning_brief.html")
    html = template.render(date=today, headlines=headlines, vnindex=vnindex)

    os.makedirs(output_dir, exist_ok=True)
    filename = os.path.join(output_dir, f"{date.today().isoformat()}.html")
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html)

    return html
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pytest tests/test_generate_brief.py -v
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate_brief.py tests/test_generate_brief.py
git commit -m "feat: add brief HTML generator with tests"
```

---

### Task 7: Email Sender

**Files:**
- Create: `scripts/send_email.py`
- Create: `tests/test_send_email.py`

- [ ] **Step 1: Write failing tests**

Create `tests/test_send_email.py`:
```python
import pytest
from unittest.mock import patch, MagicMock
from scripts.send_email import send_brief

SAMPLE_HTML = "<html><body><h1>Ban Tin Sang</h1></body></html>"


def test_send_brief_calls_smtp(monkeypatch):
    monkeypatch.setenv("SMTP_HOST", "smtp.gmail.com")
    monkeypatch.setenv("SMTP_PORT", "587")
    monkeypatch.setenv("SMTP_USER", "test@cafe.com")
    monkeypatch.setenv("SMTP_PASSWORD", "secret")
    monkeypatch.setenv("EMAIL_RECIPIENTS", "mgmt@cafe.com")
    with patch("scripts.send_email.smtplib.SMTP") as mock_smtp:
        instance = MagicMock()
        mock_smtp.return_value.__enter__ = MagicMock(return_value=instance)
        mock_smtp.return_value.__exit__ = MagicMock(return_value=False)
        send_brief(SAMPLE_HTML)
        mock_smtp.assert_called_once_with("smtp.gmail.com", 587)


def test_send_brief_raises_on_missing_env():
    with pytest.raises(EnvironmentError):
        send_brief(SAMPLE_HTML)


def test_send_brief_multiple_recipients(monkeypatch):
    monkeypatch.setenv("SMTP_HOST", "smtp.gmail.com")
    monkeypatch.setenv("SMTP_PORT", "587")
    monkeypatch.setenv("SMTP_USER", "test@cafe.com")
    monkeypatch.setenv("SMTP_PASSWORD", "secret")
    monkeypatch.setenv("EMAIL_RECIPIENTS", "a@cafe.com,b@cafe.com,c@cafe.com")
    with patch("scripts.send_email.smtplib.SMTP") as mock_smtp:
        instance = MagicMock()
        mock_smtp.return_value.__enter__ = MagicMock(return_value=instance)
        mock_smtp.return_value.__exit__ = MagicMock(return_value=False)
        send_brief(SAMPLE_HTML)
        call_args = instance.sendmail.call_args
        assert "a@cafe.com" in call_args[0][1]
        assert "b@cafe.com" in call_args[0][1]
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_send_email.py -v
```

Expected: `ImportError` — `send_email` does not exist yet.

- [ ] **Step 3: Implement send_email.py**

Create `scripts/send_email.py`:
```python
import os
import smtplib
import logging
from datetime import date
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_brief(html: str) -> None:
    host = os.environ.get("SMTP_HOST")
    port = os.environ.get("SMTP_PORT")
    user = os.environ.get("SMTP_USER")
    password = os.environ.get("SMTP_PASSWORD")
    recipients_raw = os.environ.get("EMAIL_RECIPIENTS")

    missing = [
        k for k, v in {
            "SMTP_HOST": host, "SMTP_PORT": port, "SMTP_USER": user,
            "SMTP_PASSWORD": password, "EMAIL_RECIPIENTS": recipients_raw,
        }.items() if not v
    ]
    if missing:
        raise EnvironmentError(f"Missing required environment variables: {', '.join(missing)}")

    recipients = [r.strip() for r in recipients_raw.split(",") if r.strip()]
    today = date.today().strftime("%d/%m/%Y")

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Ban Tin Sang Cafe Capital — {today}"
    msg["From"] = user
    msg["To"] = ", ".join(recipients)
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP(host, int(port)) as server:
        server.starttls()
        server.login(user, password)
        server.sendmail(user, recipients, msg.as_string())
        logging.info(f"Email sent to {recipients}")
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pytest tests/test_send_email.py -v
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/send_email.py tests/test_send_email.py
git commit -m "feat: add SMTP email sender with tests"
```

---

### Task 8: Orchestrator

**Files:**
- Create: `scripts/main.py`
- Create: `tests/test_main.py`

- [ ] **Step 1: Write failing tests**

Create `tests/test_main.py`:
```python
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pytest tests/test_main.py -v
```

Expected: `ImportError` — `main` does not exist yet.

- [ ] **Step 3: Implement main.py**

Create `scripts/main.py`:
```python
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
        logging.error(f"Fatal error: {e}")
        sys.exit(1)
```

- [ ] **Step 4: Run the full test suite**

```bash
pytest tests/ -v
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/main.py tests/test_main.py
git commit -m "feat: add main orchestrator with tests"
```

---

### Task 9: GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/morning_brief.yml`

- [ ] **Step 1: Create the workflow file**

Create `.github/workflows/morning_brief.yml`:
```yaml
name: Cafe Capital Morning Brief

on:
  schedule:
    - cron: '0 23 * * *'  # 06:00 AM Vietnam time (UTC+7)
  workflow_dispatch:

jobs:
  morning-brief:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run morning brief
        env:
          SMTP_HOST: ${{ secrets.SMTP_HOST }}
          SMTP_PORT: ${{ secrets.SMTP_PORT }}
          SMTP_USER: ${{ secrets.SMTP_USER }}
          SMTP_PASSWORD: ${{ secrets.SMTP_PASSWORD }}
          EMAIL_RECIPIENTS: ${{ secrets.EMAIL_RECIPIENTS }}
        run: python -m scripts.main

      - name: Upload brief as artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: morning-brief-${{ github.run_id }}
          path: output/*.html
          retention-days: 7
```

- [ ] **Step 2: Run full test suite one final time**

```bash
pytest tests/ -v
```

Expected: All tests PASS.

- [ ] **Step 3: Commit and push**

```bash
git add .github/workflows/morning_brief.yml
git commit -m "feat: add GitHub Actions workflow for daily morning brief"
git push -u origin claude/setup-cafe-capital-project-N5ZMs
```

- [ ] **Step 4: Configure GitHub Secrets**

In the GitHub repository → Settings → Secrets and variables → Actions, add these five secrets:

| Secret name | Example value |
|---|---|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `noreply@cafecapital.vn` |
| `SMTP_PASSWORD` | Gmail App Password (16-char, not your account password) |
| `EMAIL_RECIPIENTS` | `mgmt@cafecapital.vn,owner@cafecapital.vn` |

- [ ] **Step 5: Verify with a manual workflow run**

In GitHub → Actions → "Cafe Capital Morning Brief" → "Run workflow" → Run.

Check the workflow logs and confirm:
- RSS fetch step logs headlines (or graceful warning if feed unreachable)
- VnIndex step logs index value (or graceful warning if scrape fails — update `_parse()` selectors if needed)
- Email delivered to recipients
- Artifact `morning-brief-<run_id>` appears with a dated HTML file
