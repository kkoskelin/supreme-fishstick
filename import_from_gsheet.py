# /// script
# dependencies = ["requests"]
# ///

import os
import sys
from pathlib import Path
from datetime import date
import requests


def load_env():
    env_file = Path(__file__).parent / ".env"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())


load_env()

export_url = os.environ.get("GSHEET_EXPORT_URL", "")
if not export_url:
    sys.exit("GSHEET_EXPORT_URL not set — check your .env file")

r = requests.get(export_url)
if r.status_code != 200:
    sys.exit(f"Fetch failed: HTTP {r.status_code}\n{r.text[:200]}")
if r.text.lstrip().startswith("<"):
    sys.exit(
        "Got HTML instead of CSV — the Apps Script deployment likely requires Google login.\n"
        "In Apps Script: Deploy → Manage deployments → edit → set 'Who has access' to 'Anyone'."
    )

lines = r.text.splitlines()
out_lines = [line for line in lines[1:] if line.strip()]  # skip header

year = date.today().year
dest = Path(__file__).parent / f"src/fixtures/{year}.csv"
dest.write_text("\n".join(out_lines) + "\n")
print(f"Saved {len(out_lines)} rows to {dest}")
