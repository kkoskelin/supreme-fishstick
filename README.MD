# Tri-County Swim Results

A React + TypeScript site for browsing Tri-County swim meet results by swimmer, event, and team.

**Stack:** React 18, TypeScript, Tailwind CSS, Parcel, Overmind (state), pnpm

## Development

```sh
pnpm install
pnpm start        # dev server with hot reload
pnpm run open     # same, opens browser automatically
```

## Building

```sh
pnpm run clean
pnpm run build          # production bundle
pnpm run build:gh       # production bundle for GitHub Pages
zip dist/index.zip dist/*   # optional: package for upload to static host
```

## Deploying

**GitHub Pages** — push to `main`; `.github/workflows/static.yml` builds and deploys automatically.
Live at: <https://kkoskelin.github.io/supreme-fishstick/>

**Static host (tiiny.host, etc.)** — build, zip, upload `dist/index.zip`.

## Testing

```sh
pnpm test                          # Jest with coverage
npx jest path/to/myFile.test.ts    # single file
```

## Linting

```sh
pnpm run lint          # TypeScript + ESLint
pnpm run lint:css      # Stylelint
pnpm run lint:fix      # auto-fix ESLint issues
```


---

## Importing Results from Google Sheets

Results can be imported directly from the shared Google Sheet via `import-latest.sh`. If the manual CSV export is not present in `~/Downloads`, the script falls back to fetching from the sheet automatically.

### One-time Apps Script setup (sheet owner only)

The sheet is not publicly accessible, so a Google Apps Script web app is used to serve the CSV without requiring API keys or a Google Cloud project.

1. Open the Google Sheet → **Extensions → Apps Script**
2. Add the following function to the existing script (do not replace existing functions):

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = sheet.getDataRange().getValues();
  const csv = data.map(row =>
    row.map(cell => {
      let s;
      if (cell instanceof Date) {
        s = `${cell.getMonth() + 1}/${cell.getDate()}/${cell.getFullYear()}`;
      } else {
        s = String(cell);
      }
      return s.includes(',') || s.includes('"') || s.includes('\n')
        ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(',')
  ).join('\n');
  return ContentService.createTextOutput(csv).setMimeType(ContentService.MimeType.CSV);
}
```

3. Click **Deploy → New deployment**
4. Set type to **Web app**
5. Set **Execute as** to **Me** and **Who has access** to **Anyone**
6. Click **Deploy** and copy the `/exec` URL

### Local setup (anyone running the project)

1. Copy `.env.example` to `.env`
2. Set `GSHEET_EXPORT_URL` to the `/exec` URL from the deployment above
3. Install `uv` if not already present: `brew install uv` or `curl -LsSf https://astral.sh/uv/install.sh | sh`

With that in place, `sh import-latest.sh` (or `/import-results` in Claude Code) will fetch the latest results, save them to `src/fixtures/`, and regenerate `swimData.json`.
