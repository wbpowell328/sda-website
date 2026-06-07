# CASTLE chatbot — local prototype

A small Node.js server that lets the website talk to Claude. The Anthropic API
key lives only on your laptop; the browser never sees it.

This is a **local-only prototype**. Hosting it on the live site is a separate
decision we'll make once we like how it works.

## One-time setup

### 1. Install Node.js (5 minutes)

Download the **LTS installer** from https://nodejs.org and run it.
Accept all the defaults. When it finishes, **close and reopen PowerShell**
so the new `node` and `npm` commands are on your PATH.

Verify it worked:

```powershell
node --version
npm --version
```

You should see version numbers (Node 20+, npm 10+).

### 2. Get an Anthropic API key (2 minutes)

Sign in at https://console.anthropic.com. Add a payment method (Claude charges
per use; this prototype will cost pennies — likely under $1/month while you
test). Then go to **Settings → API Keys → Create Key**. Copy the key
(starts with `sk-ant-...`).

### 3. Install the chatbot dependencies

In PowerShell, from this folder (`chatbot/`):

```powershell
npm install
```

### 4. Configure your key

Copy `.env.example` to `.env` and paste your key into the new file:

```powershell
copy .env.example .env
notepad .env
```

Replace `sk-ant-your-key-here` with your real key. Save and close.

`.env` is in `.gitignore` — it will never be committed.

### 5. Build the knowledge context

```powershell
npm run build-context
```

This reads everything in `knowledge/` and writes `system-prompt.txt`. You'll
see a character + token count at the end.

To add your LinkedIn writings: drop the two Word docs straight into `knowledge/`
and re-run `npm run build-context`. It auto-converts `.docx` → `.md` via Pandoc
(which you already have installed).

## Running it

```powershell
npm start
```

You should see:

```
CASTLE chatbot running:  http://localhost:3000
Model:                   claude-haiku-4-5-20251001
```

Open http://localhost:3000 in your browser — there's a demo page with the
chat bubble. Click the bubble in the bottom-right, ask it something like
"What books has Warren written?"

Press **Ctrl+C** in PowerShell to stop the server.

## Folder layout

```
chatbot/
  server.js            ← Express server, talks to Claude
  build-context.js     ← bundles knowledge/ → system-prompt.txt
  widget.js            ← the floating chat bubble (vanilla JS)
  demo.html            ← demo page that hosts the widget
  package.json         ← Node dependencies
  .env.example         ← template — copy to .env and add your key
  knowledge/           ← drop .md, .txt, or .docx files here
    00-about-warren.md
    01-books.md
    02-site-map.md
    README.md
```

## Troubleshooting

**"npm is not recognized"** — you didn't restart PowerShell after installing
Node. Close all PowerShell windows and open a fresh one.

**"Missing ANTHROPIC_API_KEY"** — your `.env` file is missing or your key
isn't in it. Recheck step 4.

**"Missing system-prompt.txt"** — run `npm run build-context` first.

**Chat bubble appears but messages error out** — check the PowerShell window
where the server is running. Common causes: invalid API key, no internet,
the Anthropic API is having issues.

**"Pandoc failed"** — `build-context` couldn't convert a `.docx` file. Make
sure Pandoc is installed and on your PATH. Verify with `pandoc --version`
in PowerShell.

## What changing the model costs

The default is **Claude Haiku 4.5** — fastest and cheapest, plenty capable for
this kind of chat. You can switch by editing `.env`:

| Model | Speed | Cost relative | Best for |
|---|---|---|---|
| `claude-haiku-4-5-20251001` | Fastest | 1× | This chatbot (default) |
| `claude-sonnet-4-6` | Fast | ~3× | If you want noticeably smarter responses |
| `claude-opus-4-7` | Slower | ~15× | Overkill for chat; reserve for harder reasoning |

Restart the server (Ctrl+C, `npm start`) after changing `.env`.
