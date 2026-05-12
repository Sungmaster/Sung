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
