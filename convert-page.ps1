# Convert a Jekyll _pages/<slug>.md file from raw WordPress HTML to clean Markdown.
# Saves the original as <slug>.md.original for safety.
#
# Usage: .\convert-page.ps1 slug1 slug2 slug3 ...
param([Parameter(ValueFromRemainingArguments)][string[]]$Slugs)

$ErrorActionPreference = 'Stop'
$pagesDir = "C:\Users\Warren Powell\Dropbox\Warrens documents\Claude CASTLE website\_pages"

foreach ($slug in $Slugs) {
  $file = Join-Path $pagesDir "$slug.md"
  if (-not (Test-Path $file)) {
    Write-Warning "Missing: $file"
    continue
  }

  $raw = Get-Content $file -Raw

  # Split out the YAML front matter
  if ($raw -match "(?s)^(---\r?\n.*?\r?\n---\r?\n)(.*)$") {
    $frontMatter = $matches[1]
    $body = $matches[2]
  } else {
    Write-Warning "$slug.md has no front matter; skipping"
    continue
  }

  # Strip the {% raw %} / {% endraw %} wrappers if present
  $body = $body -replace '\{%\s*raw\s*%\}', '' -replace '\{%\s*endraw\s*%\}', ''
  $body = $body.Trim()

  if (-not $body) {
    Write-Warning "$slug.md has empty body; skipping"
    continue
  }

  # Save backup of original
  $backup = "$file.original"
  if (-not (Test-Path $backup)) { Copy-Item $file $backup }

  # Pandoc convert HTML -> Markdown via temp files
  $tmpHtml = [IO.Path]::GetTempFileName() + ".html"
  $tmpMd   = [IO.Path]::GetTempFileName() + ".md"
  Set-Content $tmpHtml -Value $body -Encoding UTF8

  # --markdown-headings=atx forces # / ## style headings (more readable)
  # --wrap=none keeps paragraphs on single lines (cleaner diffs)
  pandoc -f html -t "markdown-raw_html-native_divs-native_spans-bracketed_spans-fenced_divs-link_attributes-shortcut_reference_links" `
    --wrap=none --markdown-headings=atx `
    -o $tmpMd $tmpHtml

  $newBody = Get-Content $tmpMd -Raw

  # Light cleanup: collapse 3+ blank lines, trim trailing spaces, normalize endings
  $newBody = $newBody -replace "(\r?\n){3,}", "`n`n"
  $newBody = $newBody -replace "[ \t]+\r?\n", "`n"
  $newBody = $newBody.Trim()

  # Reassemble: front matter + a blank line + clean markdown
  $out = "$frontMatter`n$newBody`n"
  Set-Content $file -Value $out -Encoding UTF8 -NoNewline

  $oldSize = (Get-Item $backup).Length
  $newSize = (Get-Item $file).Length
  Write-Output ("  {0,-30}  {1,7:N0} -> {2,7:N0} bytes  ({3:+0;-0;0}%)" -f $slug, $oldSize, $newSize, (100 * ($newSize - $oldSize) / $oldSize))

  Remove-Item $tmpHtml, $tmpMd -ErrorAction SilentlyContinue
}
