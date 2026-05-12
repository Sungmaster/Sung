# Cafe Capital Morning Brief — Design Spec

**Date:** 2026-05-12  
**Status:** Approved

---

## Overview

A daily automated morning briefing system for Cafe Capital management. Each morning at 6:00 AM Vietnam time, the system fetches global economics news (via RSS) and Vietnamese VnIndex stock market data (via web scraping), renders a Vietnamese-language HTML report, emails it to recipients, and saves a dated copy to the `output/` directory.

---

## Architecture

**Execution environment:** GitHub Actions (scheduled workflow)  
**Language:** Python 3.11+  
**Scheduling:** `cron: '0 23 * * *'` (23:00 UTC = 06:00 AM UTC+7)  
**Manual trigger:** `workflow_dispatch` for on-demand testing

```
GitHub Actions (06:00 AM VN)
        │
        ├── fetch_rss.py        → global economics headlines (RSS)
        ├── scrape_vnindex.py   → VnIndex price + top movers (web scraping)
        │
        └── generate_brief.py  → renders Jinja2 HTML template (Vietnamese)
                │
                ├── send_email.py   → HTML email via SMTP
                └── output/YYYY-MM-DD.html  → uploaded as Actions artifact
```

---

## Components

### `scripts/fetch_rss.py`
- Reads from 2-3 global economics RSS feeds (Reuters Business, Bloomberg Economics)
- Returns top 5–7 headlines with title, summary, link, and published date
- Uses `feedparser` library

### `scripts/scrape_vnindex.py`
- Scrapes VnIndex data from CafeF or VnExpress Kinh tế
- Returns: closing index value, % change vs. previous day, top 3 gainers, top 3 losers
- Uses `requests` + `beautifulsoup4`

### `scripts/generate_brief.py`
- Receives RSS data + VnIndex data
- Renders `templates/morning_brief.html` using Jinja2
- Saves rendered HTML to `output/YYYY-MM-DD.html`

### `scripts/send_email.py`
- Sends rendered HTML as email body via SMTP
- Recipients, credentials loaded from environment variables (GitHub Secrets)

### `scripts/main.py`
- Orchestrates all steps in order: fetch → scrape → generate → email
- Exits with non-zero code on failure so GitHub Actions marks the run as failed

### `templates/morning_brief.html`
- Jinja2 template, fully in Vietnamese
- Sections:
  1. **Tiêu đề** — date, greeting
  2. **Kinh tế thế giới** — global economics headlines list
  3. **Thị trường chứng khoán Việt Nam** — VnIndex value, change, gainers/losers table

### `sample_data/`
- `rss_sample.json` — static RSS payload for local testing without network calls
- `vnindex_sample.json` — static VnIndex payload for local testing

### `output/`
- Git-ignored directory; generated HTML files saved here during workflow runs
- Files uploaded as GitHub Actions artifacts (retained 7 days)

---

## GitHub Actions Workflow

**File:** `.github/workflows/morning_brief.yml`

- Trigger: `schedule` (daily 23:00 UTC) + `workflow_dispatch`
- Steps: checkout → install deps → run `main.py` → upload artifact
- Required secrets:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASSWORD`
  - `EMAIL_RECIPIENTS` (comma-separated)

---

## Dependencies (`requirements.txt`)

| Library | Purpose |
|---|---|
| `feedparser` | RSS feed parsing |
| `requests` | HTTP requests for scraping |
| `beautifulsoup4` | HTML parsing for VnIndex scraping |
| `jinja2` | HTML template rendering |
| `python-dotenv` | Local `.env` support for dev testing |

---

## Error Handling

- If RSS fetch fails: log warning, continue with empty headlines section
- If VnIndex scrape fails: log warning, continue with "không có dữ liệu" placeholder
- If email send fails: log error, exit non-zero (workflow marked as failed)
- All errors logged to stdout (visible in GitHub Actions logs)

---

## Testing

- `sample_data/` files allow running `main.py` locally with `USE_SAMPLE_DATA=true` env flag
- `workflow_dispatch` trigger allows manual test runs without waiting for schedule

---

## Out of Scope

- AI-generated summaries or translations of news content
- Historical data storage or trend analysis
- Web dashboard or frontend UI
- Paid API integrations
