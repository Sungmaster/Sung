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
