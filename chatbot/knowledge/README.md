# Knowledge base for the chatbot

Everything in this folder is concatenated into the chatbot's system prompt
when you run `npm run build-context`.

## What lives here

The chatbot ships with three seed files:

- `00-about-warren.md` — bio, role, awards, research focus
- `01-books.md` — book summaries and when-to-recommend notes
- `02-site-map.md` — every page path on the site with a one-line description

## Adding your LinkedIn writings

Drop the two Word docs straight into this folder. Filenames don't matter —
anything `.docx` (except Word lock files like `~$foo.docx`) gets auto-converted
to `.md` via Pandoc the next time you run `npm run build-context`. The
generated `.md` files are kept alongside the originals.

Suggested:
- `linkedin-posts-part-1.docx`
- `linkedin-posts-part-2.docx`

## Editing the seed files

Open any `.md` file in VS Code and edit it directly. Re-run `npm run build-context`
to regenerate the system prompt. Restart the server (Ctrl+C, `npm start`)
to pick up the new prompt.

## What NOT to put here

- Files with private/personal info you wouldn't want the bot to repeat
- Files larger than ~50,000 words combined across the whole folder
  (Claude's context window is generous but not infinite)
- Sensitive documents — anything in this folder is sent to the Claude API
  on every chat request

## Trimming if it gets too big

`build-context` prints the approximate token count at the end. If it warns
about approaching the 200k limit, either trim less-useful files or we
upgrade to a retrieval-based approach (RAG).
