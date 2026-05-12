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
