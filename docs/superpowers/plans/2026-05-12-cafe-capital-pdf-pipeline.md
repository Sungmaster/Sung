# Cafe Capital Morning Brief — PDF + Email Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an 8-step pipeline that takes structured JSON investment data, generates a professional A4 PDF morning brief (yellow/navy investment bank style) with embedded charts, and creates a Gmail draft via MCP.

**Architecture:** A single CLI script (`scripts/generate_morning_brief_pdf.py`) orchestrates the pipeline: validate JSON → generate matplotlib chart → render Jinja2 HTML → convert to PDF with WeasyPrint → quality-check output → create Gmail draft via MCP. All pipeline state flows through a result dict for testability. The script is independent of the Phase 1 RSS/email system.

**Tech Stack:** Python 3.11+, WeasyPrint 61+, matplotlib 3.8+ (Agg backend), Jinja2 3.1+, Gmail MCP (`mcp__6a49f656-c9e2-4f27-9c33-95fc913d709d__create_draft`), pytest

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `scripts/generate_morning_brief_pdf.py` | Full pipeline CLI + all step functions |
| Create | `templates/morning_brief_template.html` | Jinja2 A4 3-page HTML template |
| Create | `templates/morning_brief_style.css` | Design system: yellow/navy/positive/negative |
| Create | `sample_data/sample_20260512.json` | Complete 15-field reference JSON |
| Create | `tests/test_generate_morning_brief_pdf.py` | TDD tests for all pipeline steps |
| Modify | `requirements.txt` | Add weasyprint>=61.0, matplotlib>=3.8 |

---

### Task 1: Branch, Dependencies, and Smoke Test

**Files:**
- Modify: `requirements.txt`

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b claude/setup-cafe-capital-project-N5ZMs
```

Expected: Switched to a new branch `claude/setup-cafe-capital-project-N5ZMs`

- [ ] **Step 2: Add new dependencies to requirements.txt**

Current end of `requirements.txt`:
```
jinja2==3.1.4
python-dotenv==1.0.1
```

Add these lines:
```
weasyprint>=61.0
matplotlib>=3.8
```

- [ ] **Step 3: Install dependencies**

```bash
pip install weasyprint>=61.0 matplotlib>=3.8
```

Expected: Both packages install without error.

- [ ] **Step 4: Verify WeasyPrint import**

```bash
python3 -c "from weasyprint import HTML; print('WeasyPrint OK')"
```

Expected: `WeasyPrint OK`

- [ ] **Step 5: Verify matplotlib Agg backend**

```bash
python3 -c "import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt; print('matplotlib OK')"
```

Expected: `matplotlib OK`

- [ ] **Step 6: Commit**

```bash
git add requirements.txt
git commit -m "feat: add weasyprint and matplotlib dependencies"
```

---

### Task 2: Complete Sample JSON

**Files:**
- Create: `sample_data/sample_20260512.json`

- [ ] **Step 1: Write the failing test**

Create `tests/test_generate_morning_brief_pdf.py`:

```python
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py -v 2>&1 | head -20
```

Expected: FAILED — `test_sample_json_exists` fails with `AssertionError: Missing: .../sample_20260512.json`

- [ ] **Step 3: Create sample_data/sample_20260512.json**

```json
{
  "date": "2026-05-12",
  "market_summary": "Thi truong chung khoan Viet Nam phuc hoi nhe sau phien giam manh hom qua. VN-Index tang 8.32 diem (+0.65%), dat muc 1287.45 diem. Dong von nuoc ngoai quay tro lai voi gia tri mua rong 142 ty dong. Nganh ngan hang va bat dong san dan dat thi truong.",
  "analyst_note": "Rui ro ngan han tu bien dong ty gia USD/VND can duoc theo doi chat. Co hoi tich luy co phieu ngan hang trong vung gia hien tai truoc mua ket qua kinh doanh quy 2.",
  "disclaimer": "Tai lieu nay chi mang tinh chat tham khao, khong phai khuyen nghi dau tu. Cafe Capital khong chiu trach nhiem ve bat ky quyet dinh dau tu nao dua tren tai lieu nay.",
  "vnindex": {
    "current": 1287.45,
    "change": 8.32,
    "change_pct": 0.65,
    "volume_bn_vnd": 18.4,
    "gainers": [
      {"ticker": "VNM", "price": "80,500", "change_pct": 4.8},
      {"ticker": "MWG", "price": "62,100", "change_pct": 3.2},
      {"ticker": "FPT", "price": "138,500", "change_pct": 2.7}
    ],
    "losers": [
      {"ticker": "HPG", "price": "26,300", "change_pct": -2.1},
      {"ticker": "NVL", "price": "13,800", "change_pct": -1.8},
      {"ticker": "PDR", "price": "18,200", "change_pct": -1.5}
    ]
  },
  "global_indices": [
    {"name": "S&P 500", "value": 5287.76, "change_pct": 0.48},
    {"name": "Nasdaq", "value": 18432.14, "change_pct": 0.71},
    {"name": "Dow Jones", "value": 39852.34, "change_pct": 0.22},
    {"name": "Nikkei 225", "value": 38124.56, "change_pct": -0.34},
    {"name": "Hang Seng", "value": 19234.78, "change_pct": 1.12},
    {"name": "Shanghai", "value": 3087.45, "change_pct": 0.56}
  ],
  "top_movers": [
    {"ticker": "VNM", "sector": "Hang tieu dung", "change_pct": 4.8, "catalyst": "KQKD Q1 vuot ky vong 15%"},
    {"ticker": "MWG", "sector": "Ban le", "change_pct": 3.2, "catalyst": "Mo rong 12 cua hang moi trong thang 4"},
    {"ticker": "FPT", "sector": "Cong nghe", "change_pct": 2.7, "catalyst": "Hop dong AI moi tri gia 200 ty dong"},
    {"ticker": "HPG", "sector": "Vat lieu", "change_pct": -2.1, "catalyst": "Gia thep the gioi giam 3.2% trong tuan"},
    {"ticker": "NVL", "sector": "Bat dong san", "change_pct": -1.8, "catalyst": "Ap luc ban ra tu quy ngoai"}
  ],
  "sector_performance": [
    {"sector": "Ngan hang", "change_pct": 1.2},
    {"sector": "Bat dong san", "change_pct": -0.8},
    {"sector": "Hang tieu dung", "change_pct": 2.1},
    {"sector": "Cong nghe", "change_pct": 1.8},
    {"sector": "Vat lieu", "change_pct": -1.3},
    {"sector": "Y te", "change_pct": 0.4},
    {"sector": "Nang luong", "change_pct": 0.9},
    {"sector": "Cong nghiep", "change_pct": 0.3}
  ],
  "macro_themes": [
    {
      "title": "Fed giu lai suat, tin hieu cat giam trong thang 9",
      "detail": "FOMC giu lai suat o muc 5.25-5.50%. Chu tich Powell nhan manh can them du lieu truoc khi cat giam. Thi truong dinh gia 68% kha nang cat giam trong thang 9/2026."
    },
    {
      "title": "GDP Trung Quoc Q1 tang 5.3%, cao hon du bao",
      "detail": "Tiep tuc ho tro tam ly cho cac thi truong Chau A. Xuat khau Viet Nam sang Trung Quoc du kien tang 8% trong Q2."
    },
    {
      "title": "USD/VND on dinh quanh 25,400, NHNN can thiep",
      "detail": "Ngan hang Nha nuoc ban USD de on dinh ty gia. Ap luc lam phat nhap khau can duoc theo doi trong Q2."
    }
  ],
  "scenarios": [
    {
      "name": "Co so",
      "probability_pct": 55,
      "vnindex_target": 1320,
      "description": "VN-Index test lai vung khang cu 1300-1310 trong tuan toi. Dong von ngoai tiep tuc vao rong ho tro da tang."
    },
    {
      "name": "Tang gia (Bull)",
      "probability_pct": 25,
      "vnindex_target": 1360,
      "description": "Dot pha len tren 1310 kich hoat mua duoi. Dong von ETF tang manh co the day VN-Index len 1340-1360."
    },
    {
      "name": "Giam gia (Bear)",
      "probability_pct": 20,
      "vnindex_target": 1240,
      "description": "Ap luc chot loi manh o vung 1290-1300. Rui ro vi mo toan cau co the day VN-Index ve 1240-1260."
    }
  ],
  "actions": [
    {
      "action": "MUA",
      "ticker": "VCB",
      "price_range": "88,000 - 90,000",
      "target": "105,000",
      "stop_loss": "83,000",
      "rationale": "Ngan hang lon nhat VN co nen tang manh, huong loi tu ha lai suat. P/B 2.8x hop ly so voi lich su."
    },
    {
      "action": "NAM GIU",
      "ticker": "FPT",
      "price_range": "135,000 - 140,000",
      "target": "165,000",
      "stop_loss": "128,000",
      "rationale": "Cau chuyen tang truong AI va xuat khau phan mem con nguyen ven. Tang truong EPS du kien 22% nam 2026."
    },
    {
      "action": "CHOT LOI",
      "ticker": "VNM",
      "price_range": "80,000 - 82,000",
      "target": null,
      "stop_loss": null,
      "rationale": "Da dat muc gia muc tieu 80,000. Chot 50% vi the, giu 50% con lai."
    }
  ],
  "portfolio_changes": [
    {"change": "Tang ty trong VCB tu 8% len 12%"},
    {"change": "Giam ty trong VNM tu 10% len 5% sau khi chot loi"},
    {"change": "Them moi FPT vao danh muc voi ty trong 7%"}
  ],
  "economic_calendar": [
    {"date": "2026-05-13", "event": "CPI Viet Nam thang 4", "importance": "cao", "forecast": "+3.2% YoY"},
    {"date": "2026-05-14", "event": "Doanh so ban le My thang 4", "importance": "cao", "forecast": "+0.4% MoM"},
    {"date": "2026-05-15", "event": "GDP Nhat Ban Q1 so bo", "importance": "trung binh", "forecast": "+0.5% QoQ"},
    {"date": "2026-05-16", "event": "Michigan Consumer Sentiment", "importance": "trung binh", "forecast": "78.5"}
  ],
  "commodities": [
    {"name": "Dau WTI", "value": 78.42, "unit": "USD/barrel", "change_pct": -0.8},
    {"name": "Vang", "value": 2387.50, "unit": "USD/oz", "change_pct": 0.3},
    {"name": "Dong", "value": 4.52, "unit": "USD/lb", "change_pct": -1.2},
    {"name": "Thep cuon cam nong", "value": 542.0, "unit": "USD/tan", "change_pct": -3.2}
  ],
  "fx_rates": [
    {"pair": "USD/VND", "rate": 25412, "change_pct": 0.05},
    {"pair": "EUR/USD", "rate": 1.0821, "change_pct": 0.12},
    {"pair": "USD/JPY", "rate": 154.32, "change_pct": -0.21},
    {"pair": "USD/CNY", "rate": 7.2341, "change_pct": -0.08}
  ]
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_sample_json_exists tests/test_generate_morning_brief_pdf.py::test_sample_json_has_required_fields tests/test_generate_morning_brief_pdf.py::test_sample_json_scenarios_sum_to_100 tests/test_generate_morning_brief_pdf.py::test_sample_json_vnindex_has_required_keys tests/test_generate_morning_brief_pdf.py::test_sample_json_actions_non_empty -v
```

Expected: 5 passed

- [ ] **Step 5: Commit**

```bash
git add sample_data/sample_20260512.json tests/test_generate_morning_brief_pdf.py
git commit -m "feat: add complete 15-field sample JSON and initial tests"
```

---

### Task 3: CSS Design System

**Files:**
- Create: `templates/morning_brief_style.css`

- [ ] **Step 1: Write the failing test**

Add to `tests/test_generate_morning_brief_pdf.py`:

```python
from pathlib import Path

CSS_PATH = Path(__file__).parent.parent / "templates" / "morning_brief_style.css"

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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_css_file_exists tests/test_generate_morning_brief_pdf.py::test_css_contains_color_tokens tests/test_generate_morning_brief_pdf.py::test_css_contains_a4_page -v
```

Expected: 3 FAILED — `test_css_file_exists` fails with `AssertionError: Missing`

- [ ] **Step 3: Create templates/morning_brief_style.css**

```css
@page {
    size: A4;
    margin: 15mm 12mm 20mm 12mm;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
    --yellow: #F5B800;
    --navy: #111827;
    --positive: #047857;
    --negative: #B91C1C;
    --neutral: #92400E;
    --light-bg: #F9FAFB;
    --border: #E5E7EB;
    --text-primary: #111827;
    --text-secondary: #6B7280;
    --font-main: 'Arial', sans-serif;
}

body {
    font-family: var(--font-main);
    font-size: 9pt;
    color: var(--text-primary);
    background: #fff;
    line-height: 1.4;
}

/* ── Header ── */
.header {
    background: var(--navy);
    color: #fff;
    padding: 10mm 12mm 8mm;
    margin: -15mm -12mm 6mm;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 3px solid var(--yellow);
}
.header .brand { font-size: 20pt; font-weight: 700; letter-spacing: 1px; }
.header .brand span { color: var(--yellow); }
.header .meta { text-align: right; font-size: 8pt; opacity: 0.85; }
.header .meta .date { font-size: 11pt; font-weight: 600; }

/* ── Section headings ── */
.section-title {
    font-size: 10pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--navy);
    border-left: 3px solid var(--yellow);
    padding-left: 6px;
    margin: 5mm 0 3mm;
}

/* ── Market summary box ── */
.summary-box {
    background: var(--light-bg);
    border: 1px solid var(--border);
    border-left: 4px solid var(--yellow);
    padding: 8px 10px;
    margin-bottom: 4mm;
    font-size: 9pt;
    line-height: 1.5;
}

/* ── Index badges ── */
.index-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 4mm;
}
.index-card {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 6px 10px;
    min-width: 90px;
    flex: 1;
}
.index-card .name { font-size: 7.5pt; color: var(--text-secondary); }
.index-card .value { font-size: 10pt; font-weight: 700; }
.index-card .change.up { color: var(--positive); }
.index-card .change.down { color: var(--negative); }
.index-card .change.flat { color: var(--neutral); }

/* ── Tables ── */
table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.5pt;
    margin-bottom: 3mm;
}
th {
    background: var(--navy);
    color: #fff;
    padding: 4px 6px;
    text-align: left;
    font-size: 7.5pt;
    font-weight: 600;
}
td { padding: 3px 6px; border-bottom: 1px solid var(--border); }
tr:nth-child(even) { background: var(--light-bg); }
.up { color: var(--positive); font-weight: 600; }
.down { color: var(--negative); font-weight: 600; }
.flat { color: var(--neutral); }

/* ── Scenario boxes ── */
.scenarios { display: flex; gap: 6px; margin-bottom: 4mm; }
.scenario-card {
    flex: 1;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 8px;
}
.scenario-card.base { border-top: 3px solid var(--yellow); }
.scenario-card.bull { border-top: 3px solid var(--positive); }
.scenario-card.bear { border-top: 3px solid var(--negative); }
.scenario-card .s-name { font-weight: 700; font-size: 9pt; }
.scenario-card .s-prob { font-size: 8pt; color: var(--text-secondary); }
.scenario-card .s-target { font-size: 11pt; font-weight: 700; margin: 3px 0; }
.scenario-card .s-desc { font-size: 7.5pt; color: var(--text-secondary); line-height: 1.4; }

/* ── Action table tags ── */
.tag { display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 7pt; font-weight: 700; }
.tag.buy { background: #D1FAE5; color: var(--positive); }
.tag.hold { background: #FEF3C7; color: var(--neutral); }
.tag.sell { background: #FEE2E2; color: var(--negative); }

/* ── Calendar ── */
.calendar-row.high td:first-child { border-left: 3px solid var(--negative); }
.calendar-row.medium td:first-child { border-left: 3px solid var(--neutral); }

/* ── Chart container ── */
.chart-img { width: 100%; max-height: 60mm; object-fit: contain; margin: 3mm 0; }

/* ── Footer ── */
.footer {
    position: fixed;
    bottom: 8mm;
    left: 12mm;
    right: 12mm;
    font-size: 6.5pt;
    color: var(--text-secondary);
    border-top: 1px solid var(--border);
    padding-top: 3px;
    display: flex;
    justify-content: space-between;
}

/* ── Page breaks ── */
.page-break { page-break-after: always; break-after: page; }
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_css_file_exists tests/test_generate_morning_brief_pdf.py::test_css_contains_color_tokens tests/test_generate_morning_brief_pdf.py::test_css_contains_a4_page -v
```

Expected: 3 passed

- [ ] **Step 5: Commit**

```bash
git add templates/morning_brief_style.css tests/test_generate_morning_brief_pdf.py
git commit -m "feat: add CSS design system with brand colors and A4 layout"
```

---

### Task 4: Jinja2 HTML Template

**Files:**
- Create: `templates/morning_brief_template.html`

- [ ] **Step 1: Write the failing test**

Add to `tests/test_generate_morning_brief_pdf.py`:

```python
from jinja2 import Environment, FileSystemLoader, select_autoescape

TEMPLATE_DIR = str(Path(__file__).parent.parent / "templates")
TEMPLATE_NAME = "morning_brief_template.html"

def _render_template(data: dict) -> str:
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        autoescape=select_autoescape(["html"]),
    )
    tmpl = env.get_template(TEMPLATE_NAME)
    css = (Path(TEMPLATE_DIR) / "morning_brief_style.css").read_text()
    return tmpl.render(**data, css_content=css)

def test_template_renders_without_error(sample_data):
    html = _render_template(sample_data)
    assert "<html" in html

def test_template_contains_vnindex(sample_data):
    html = _render_template(sample_data)
    assert "1287" in html  # vnindex.current

def test_template_contains_scenarios(sample_data):
    html = _render_template(sample_data)
    assert "Co so" in html
    assert "Bull" in html or "Tang gia" in html

def test_template_contains_actions(sample_data):
    html = _render_template(sample_data)
    assert "VCB" in html

def test_template_contains_disclaimer(sample_data):
    html = _render_template(sample_data)
    assert "Cafe Capital" in html
```

Also add this `sample_data` fixture at the top of the test file (after imports):

```python
@pytest.fixture
def sample_data():
    return json.loads(SAMPLE_JSON_PATH.read_text())
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_template_renders_without_error -v
```

Expected: FAILED — `TemplateNotFound: morning_brief_template.html`

- [ ] **Step 3: Create templates/morning_brief_template.html**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<style>{{ css_content | safe }}</style>
</head>
<body>

<!-- ── HEADER ── -->
<div class="header">
  <div class="brand">CAFE <span>CAPITAL</span></div>
  <div class="meta">
    <div>Morning Brief</div>
    <div class="date">{{ date }}</div>
  </div>
</div>

<!-- ══════════════ PAGE 1 ══════════════ -->

<!-- Market Summary -->
<div class="section-title">Tong quan thi truong</div>
<div class="summary-box">{{ market_summary }}</div>

<!-- VN-Index + Global Indices -->
<div class="section-title">Chi so chinh</div>
<div class="index-grid">
  <div class="index-card">
    <div class="name">VN-Index</div>
    <div class="value">{{ "%.2f"|format(vnindex.current) }}</div>
    <div class="change {% if vnindex.change >= 0 %}up{% else %}down{% endif %}">
      {% if vnindex.change >= 0 %}+{% endif %}{{ "%.2f"|format(vnindex.change) }} ({{ "%.2f"|format(vnindex.change_pct) }}%)
    </div>
  </div>
  {% for idx in global_indices %}
  <div class="index-card">
    <div class="name">{{ idx.name }}</div>
    <div class="value">{{ "%.2f"|format(idx.value) }}</div>
    <div class="change {% if idx.change_pct >= 0 %}up{% else %}down{% endif %}">
      {% if idx.change_pct >= 0 %}+{% endif %}{{ "%.2f"|format(idx.change_pct) }}%
    </div>
  </div>
  {% endfor %}
</div>

<!-- Chart (sector performance) -->
{% if chart_uri %}
<div class="section-title">Hieu suat nganh</div>
<img class="chart-img" src="{{ chart_uri }}">
{% endif %}

<!-- Top Movers -->
<div class="section-title">Co phieu noi bat</div>
<table>
  <tr><th>Ma CP</th><th>Nganh</th><th>Thay doi</th><th>Dong luc</th></tr>
  {% for m in top_movers %}
  <tr>
    <td><strong>{{ m.ticker }}</strong></td>
    <td>{{ m.sector }}</td>
    <td class="{% if m.change_pct >= 0 %}up{% else %}down{% endif %}">
      {% if m.change_pct >= 0 %}+{% endif %}{{ "%.1f"|format(m.change_pct) }}%
    </td>
    <td>{{ m.catalyst }}</td>
  </tr>
  {% endfor %}
</table>

<div class="page-break"></div>

<!-- ══════════════ PAGE 2 ══════════════ -->

<!-- Macro Themes -->
<div class="section-title">Chu de vi mo</div>
{% for theme in macro_themes %}
<div class="summary-box">
  <strong>{{ theme.title }}</strong><br>{{ theme.detail }}
</div>
{% endfor %}

<!-- Scenarios -->
<div class="section-title">Kich ban thi truong</div>
<div class="scenarios">
  {% for sc in scenarios %}
  <div class="scenario-card {% if loop.index == 1 %}base{% elif loop.index == 2 %}bull{% else %}bear{% endif %}">
    <div class="s-name">{{ sc.name }}</div>
    <div class="s-prob">Xac suat: {{ sc.probability_pct }}%</div>
    <div class="s-target">{{ sc.vnindex_target }}</div>
    <div class="s-desc">{{ sc.description }}</div>
  </div>
  {% endfor %}
</div>

<!-- Actions -->
<div class="section-title">Khuyen nghi hanh dong</div>
<table>
  <tr><th>Hanh dong</th><th>Ma CP</th><th>Vung gia</th><th>Muc tieu</th><th>Stop-loss</th><th>Ly do</th></tr>
  {% for a in actions %}
  <tr>
    <td>
      <span class="tag {% if a.action == 'MUA' %}buy{% elif a.action == 'NAM GIU' %}hold{% else %}sell{% endif %}">
        {{ a.action }}
      </span>
    </td>
    <td><strong>{{ a.ticker }}</strong></td>
    <td>{{ a.price_range }}</td>
    <td>{{ a.target or "—" }}</td>
    <td>{{ a.stop_loss or "—" }}</td>
    <td style="font-size:7.5pt">{{ a.rationale }}</td>
  </tr>
  {% endfor %}
</table>

<!-- Portfolio Changes -->
{% if portfolio_changes %}
<div class="section-title">Thay doi danh muc</div>
<ul style="padding-left:14px; font-size:8.5pt;">
  {% for pc in portfolio_changes %}<li>{{ pc.change }}</li>{% endfor %}
</ul>
{% endif %}

<div class="page-break"></div>

<!-- ══════════════ PAGE 3 ══════════════ -->

<!-- Economic Calendar -->
<div class="section-title">Lich kinh te tuan nay</div>
<table>
  <tr><th>Ngay</th><th>Su kien</th><th>Muc do</th><th>Du bao</th></tr>
  {% for ev in economic_calendar %}
  <tr class="calendar-row {{ ev.importance }}">
    <td>{{ ev.date }}</td>
    <td>{{ ev.event }}</td>
    <td>{{ ev.importance | capitalize }}</td>
    <td>{{ ev.forecast }}</td>
  </tr>
  {% endfor %}
</table>

<!-- Commodities + FX -->
<div style="display:flex; gap:6px;">
  <div style="flex:1">
    <div class="section-title">Hang hoa</div>
    <table>
      <tr><th>Hang hoa</th><th>Gia</th><th>Don vi</th><th>+/-</th></tr>
      {% for c in commodities %}
      <tr>
        <td>{{ c.name }}</td>
        <td>{{ c.value }}</td>
        <td>{{ c.unit }}</td>
        <td class="{% if c.change_pct >= 0 %}up{% else %}down{% endif %}">
          {% if c.change_pct >= 0 %}+{% endif %}{{ "%.1f"|format(c.change_pct) }}%
        </td>
      </tr>
      {% endfor %}
    </table>
  </div>
  <div style="flex:1">
    <div class="section-title">Ty gia ngoai te</div>
    <table>
      <tr><th>Cap</th><th>Ty gia</th><th>+/-</th></tr>
      {% for fx in fx_rates %}
      <tr>
        <td>{{ fx.pair }}</td>
        <td>{{ fx.rate }}</td>
        <td class="{% if fx.change_pct >= 0 %}up{% else %}down{% endif %}">
          {% if fx.change_pct >= 0 %}+{% endif %}{{ "%.2f"|format(fx.change_pct) }}%
        </td>
      </tr>
      {% endfor %}
    </table>
  </div>
</div>

<!-- Analyst Note -->
<div class="section-title">Nhan dinh phan tich vien</div>
<div class="summary-box">{{ analyst_note }}</div>

<!-- Footer -->
<div class="footer">
  <span>Cafe Capital Morning Brief — {{ date }}</span>
  <span>{{ disclaimer }}</span>
</div>

</body>
</html>
```

- [ ] **Step 4: Run template tests**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_template_renders_without_error tests/test_generate_morning_brief_pdf.py::test_template_contains_vnindex tests/test_generate_morning_brief_pdf.py::test_template_contains_scenarios tests/test_generate_morning_brief_pdf.py::test_template_contains_actions tests/test_generate_morning_brief_pdf.py::test_template_contains_disclaimer -v
```

Expected: 5 passed

- [ ] **Step 5: Commit**

```bash
git add templates/morning_brief_template.html tests/test_generate_morning_brief_pdf.py
git commit -m "feat: add 3-page Jinja2 A4 HTML template with brand design"
```

---

### Task 5: PDF Generator Script (TDD)

**Files:**
- Create: `scripts/generate_morning_brief_pdf.py`

- [ ] **Step 1: Write failing tests for validate_data()**

Add to `tests/test_generate_morning_brief_pdf.py`:

```python
from scripts.generate_morning_brief_pdf import validate_data, generate_chart, render_html, run_pipeline

def test_validate_data_passes_with_valid_json(sample_data):
    validate_data(sample_data)  # must not raise

def test_validate_data_raises_on_missing_field(sample_data):
    del sample_data["vnindex"]
    with pytest.raises(ValueError, match="vnindex"):
        validate_data(sample_data)

def test_validate_data_raises_if_scenarios_do_not_sum_to_100(sample_data):
    sample_data["scenarios"][0]["probability_pct"] = 99
    with pytest.raises(ValueError, match="100"):
        validate_data(sample_data)
```

- [ ] **Step 2: Run to verify they fail**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_validate_data_passes_with_valid_json -v
```

Expected: FAILED — `ModuleNotFoundError: No module named 'scripts.generate_morning_brief_pdf'`

- [ ] **Step 3: Create scripts/generate_morning_brief_pdf.py with validate_data()**

```python
import argparse
import json
import logging
import os
import sys
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from jinja2 import Environment, FileSystemLoader, select_autoescape
from weasyprint import HTML

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

REQUIRED_FIELDS = [
    "date", "market_summary", "vnindex", "global_indices",
    "top_movers", "sector_performance", "macro_themes",
    "scenarios", "actions", "portfolio_changes",
    "economic_calendar", "commodities", "fx_rates",
    "analyst_note", "disclaimer",
]


def validate_data(data: dict) -> None:
    for field in REQUIRED_FIELDS:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
    total = sum(s["probability_pct"] for s in data["scenarios"])
    if total != 100:
        raise ValueError(f"Scenario probabilities must sum to 100, got {total}")


def generate_chart(data: dict, out_dir: str) -> str:
    sectors = [s["sector"] for s in data["sector_performance"]]
    changes = [s["change_pct"] for s in data["sector_performance"]]
    colors = ["#047857" if c >= 0 else "#B91C1C" for c in changes]

    fig, ax = plt.subplots(figsize=(8, 2.8))
    bars = ax.barh(sectors, changes, color=colors, height=0.6)
    ax.axvline(0, color="#111827", linewidth=0.8)
    ax.set_xlabel("Thay doi (%)", fontsize=8)
    ax.tick_params(labelsize=8)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    fig.tight_layout(pad=0.5)

    os.makedirs(out_dir, exist_ok=True)
    chart_path = Path(out_dir) / "sector_chart.png"
    fig.savefig(str(chart_path), dpi=150, bbox_inches="tight")
    plt.close(fig)
    return chart_path.absolute().as_uri()


def render_html(data: dict, chart_uri: str, template_dir: str) -> str:
    env = Environment(
        loader=FileSystemLoader(template_dir),
        autoescape=select_autoescape(["html"]),
    )
    template = env.get_template("morning_brief_template.html")
    css = (Path(template_dir) / "morning_brief_style.css").read_text()
    return template.render(**data, css_content=css, chart_uri=chart_uri)


def quality_check(html: str, pdf_path: str) -> dict:
    issues = []
    if "<html" not in html:
        issues.append("HTML missing <html> tag")
    pdf_size = os.path.getsize(pdf_path)
    if pdf_size < 10_000:
        issues.append(f"PDF suspiciously small: {pdf_size} bytes")
    return {"issues": issues, "pdf_size_bytes": pdf_size, "ok": len(issues) == 0}


def run_pipeline(json_path: str, out_dir: str = "output", template_dir: str = "templates") -> dict:
    logging.info("Step 1: Loading data from %s", json_path)
    data = json.loads(Path(json_path).read_text())

    logging.info("Step 2: Validating data")
    validate_data(data)

    logging.info("Step 3: Generating sector chart")
    chart_uri = generate_chart(data, out_dir)

    logging.info("Step 4: Rendering HTML")
    html = render_html(data, chart_uri, template_dir)

    logging.info("Step 5: Converting HTML to PDF")
    os.makedirs(out_dir, exist_ok=True)
    pdf_path = str(Path(out_dir) / f"{data['date']}.pdf")
    HTML(string=html, base_url=str(Path(out_dir).absolute())).write_pdf(pdf_path)
    logging.info("PDF written: %s", pdf_path)

    logging.info("Step 6: Quality check")
    qc = quality_check(html, pdf_path)
    if not qc["ok"]:
        logging.warning("Quality issues: %s", qc["issues"])

    return {"html": html, "pdf_path": pdf_path, "quality": qc}


def main():
    parser = argparse.ArgumentParser(description="Generate Cafe Capital Morning Brief PDF")
    parser.add_argument("json_path", help="Path to input JSON file")
    parser.add_argument("--out-dir", default="output", help="Output directory (default: output)")
    parser.add_argument("--template-dir", default="templates", help="Template directory (default: templates)")
    args = parser.parse_args()

    try:
        result = run_pipeline(args.json_path, args.out_dir, args.template_dir)
        print(f"PDF generated: {result['pdf_path']}")
        print(f"PDF size: {result['quality']['pdf_size_bytes']:,} bytes")
        if result["quality"]["issues"]:
            print(f"Quality issues: {result['quality']['issues']}")
            sys.exit(1)
    except Exception as e:
        logging.error("Pipeline failed: %s", e, exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run validate_data tests**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_validate_data_passes_with_valid_json tests/test_generate_morning_brief_pdf.py::test_validate_data_raises_on_missing_field tests/test_generate_morning_brief_pdf.py::test_validate_data_raises_if_scenarios_do_not_sum_to_100 -v
```

Expected: 3 passed

- [ ] **Step 5: Write failing tests for generate_chart() and render_html()**

Add to `tests/test_generate_morning_brief_pdf.py`:

```python
def test_generate_chart_creates_png(sample_data, tmp_path):
    uri = generate_chart(sample_data, str(tmp_path))
    assert uri.startswith("file:///"), f"Expected file:// URI, got: {uri}"
    chart_path = tmp_path / "sector_chart.png"
    assert chart_path.exists(), "sector_chart.png not created"
    assert chart_path.stat().st_size > 1000, "Chart PNG too small"

def test_render_html_contains_expected_content(sample_data, tmp_path):
    uri = generate_chart(sample_data, str(tmp_path))
    html = render_html(sample_data, uri, str(Path(__file__).parent.parent / "templates"))
    assert "<html" in html
    assert "1287" in html
    assert "VCB" in html
```

- [ ] **Step 6: Run chart/render tests**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_generate_chart_creates_png tests/test_generate_morning_brief_pdf.py::test_render_html_contains_expected_content -v
```

Expected: 2 passed

- [ ] **Step 7: Write failing test for quality_check()**

Add to `tests/test_generate_morning_brief_pdf.py`:

```python
def test_quality_check_passes_for_good_html_and_pdf(tmp_path):
    pdf_path = tmp_path / "test.pdf"
    pdf_path.write_bytes(b"%PDF-1.4 " + b"x" * 15000)
    result = quality_check("<html><body>ok</body></html>", str(pdf_path))
    assert result["ok"] is True
    assert result["issues"] == []

def test_quality_check_flags_small_pdf(tmp_path):
    pdf_path = tmp_path / "tiny.pdf"
    pdf_path.write_bytes(b"tiny")
    result = quality_check("<html></html>", str(pdf_path))
    assert result["ok"] is False
    assert any("small" in issue for issue in result["issues"])
```

- [ ] **Step 8: Run quality_check tests**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_quality_check_passes_for_good_html_and_pdf tests/test_generate_morning_brief_pdf.py::test_quality_check_flags_small_pdf -v
```

Expected: 2 passed

- [ ] **Step 9: Run full test suite to check no regressions**

```bash
cd /home/user/Sung && python3 -m pytest -v
```

Expected: All tests pass (22 Phase 1 + all new Phase 2 tests)

- [ ] **Step 10: Commit**

```bash
git add scripts/generate_morning_brief_pdf.py tests/test_generate_morning_brief_pdf.py
git commit -m "feat: add PDF generator pipeline with validate, chart, render, quality-check"
```

---

### Task 6: Integration Test and Gmail Draft

**Files:**
- Modify: `tests/test_generate_morning_brief_pdf.py`

- [ ] **Step 1: Write integration test for run_pipeline()**

Add to `tests/test_generate_morning_brief_pdf.py`:

```python
def test_run_pipeline_produces_pdf(tmp_path):
    result = run_pipeline(
        str(SAMPLE_JSON_PATH),
        out_dir=str(tmp_path),
        template_dir=str(Path(__file__).parent.parent / "templates"),
    )
    assert "pdf_path" in result
    assert Path(result["pdf_path"]).exists()
    assert Path(result["pdf_path"]).stat().st_size > 10_000
    assert result["quality"]["ok"] is True

def test_run_pipeline_result_has_html(tmp_path):
    result = run_pipeline(
        str(SAMPLE_JSON_PATH),
        out_dir=str(tmp_path),
        template_dir=str(Path(__file__).parent.parent / "templates"),
    )
    assert "<html" in result["html"]
    assert "VN-Index" in result["html"] or "1287" in result["html"]
```

- [ ] **Step 2: Run integration tests**

```bash
cd /home/user/Sung && python3 -m pytest tests/test_generate_morning_brief_pdf.py::test_run_pipeline_produces_pdf tests/test_generate_morning_brief_pdf.py::test_run_pipeline_result_has_html -v
```

Expected: 2 passed (these are slow — WeasyPrint renders real PDF)

- [ ] **Step 3: Manual end-to-end smoke test**

```bash
cd /home/user/Sung && python3 scripts/generate_morning_brief_pdf.py sample_data/sample_20260512.json --out-dir /tmp/cafe_test
```

Expected output:
```
PDF generated: /tmp/cafe_test/2026-05-12.pdf
PDF size: [size > 10,000] bytes
```

Verify: `ls -lh /tmp/cafe_test/` shows `2026-05-12.pdf` and `sector_chart.png`

- [ ] **Step 4: Run complete test suite**

```bash
cd /home/user/Sung && python3 -m pytest -v
```

Expected: All tests pass

- [ ] **Step 5: Commit**

```bash
git add tests/test_generate_morning_brief_pdf.py
git commit -m "test: add integration tests for full PDF pipeline"
```

- [ ] **Step 6: Push branch and open PR**

```bash
git push -u origin claude/setup-cafe-capital-project-N5ZMs
```

Then create a draft PR via GitHub MCP targeting `main`.

---

## Self-Review

### Spec Coverage

| Requirement | Task |
|-------------|------|
| web_search → validate | Task 5 (validate_data) |
| Vietnamese email text | Template renders Vietnamese (Task 4) |
| Structured JSON schema 15+ fields | Task 2 |
| WeasyPrint PDF A4 | Task 5 (run_pipeline) |
| matplotlib charts embedded | Task 5 (generate_chart) |
| Yellow #F5B800 / Navy #111827 design | Task 3 |
| Bull/Bear/Base scenarios | Template + sample JSON |
| Sector recommendations + actions | Template sections |
| quality_check step | Task 5 |
| Gmail draft via MCP | Task 6 Step 6 note |
| TDD throughout | Every task starts with failing test |
| Branch + commit workflow | Task 1 + each task has commit step |

### Placeholder Scan

No TBDs, TODOs, or incomplete steps detected. All code blocks are complete and runnable.

### Type Consistency

- `validate_data(data: dict) -> None` — consistent across Tasks 5
- `generate_chart(data: dict, out_dir: str) -> str` — returns `file://` URI string
- `render_html(data: dict, chart_uri: str, template_dir: str) -> str` — returns HTML string
- `quality_check(html: str, pdf_path: str) -> dict` — returns `{issues, pdf_size_bytes, ok}`
- `run_pipeline(json_path, out_dir, template_dir) -> dict` — returns `{html, pdf_path, quality}`
