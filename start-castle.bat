@echo off
REM ============================================================
REM  Sequential Decision Analytics - one-click local start
REM
REM  Double-click this file to start:
REM    - the website (http://localhost:4000/sda-website/)
REM    - the chatbot server (http://localhost:3000)
REM    - your browser, pointed at the site
REM
REM  Two PowerShell windows will open - one for each server.
REM  TO STOP EVERYTHING: just close those two PowerShell windows.
REM  This window will close itself after a few seconds.
REM ============================================================

setlocal
set ROOT=%~dp0

echo.
echo ============================================
echo  Starting SDA local site + chatbot
echo ============================================
echo.

REM --- Jekyll site (port 4000) ---------------------------------
echo Starting Jekyll site...
start "SDA Jekyll site" powershell -NoExit -Command ^
  "$env:PATH = 'C:\Ruby40-x64\bin;' + $env:PATH; ^
   cd '%ROOT%'; ^
   $env:RUBYOPT = '-r./ruby4_patch.rb'; ^
   Write-Host 'Starting Jekyll on http://localhost:4000/sda-website/ ...' -ForegroundColor Cyan; ^
   bundle exec jekyll serve --livereload --force_polling"

REM --- Chatbot server (port 3000) ------------------------------
echo Starting chatbot server...
start "SDA chatbot" powershell -NoExit -Command ^
  "$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH; ^
   cd '%ROOT%chatbot'; ^
   Write-Host 'Starting chatbot on http://localhost:3000 ...' -ForegroundColor Cyan; ^
   npm.cmd start"

REM --- Wait, then open the browser ----------------------------
echo.
echo Waiting for servers to warm up (about 10 seconds)...
timeout /t 10 /nobreak >nul

echo Opening browser...
start http://localhost:4000/sda-website/

echo.
echo ============================================
echo  Both servers are now running.
echo
echo   - Site:    http://localhost:4000/sda-website/
echo   - Chatbot: http://localhost:3000
echo
echo  To stop them: close the two PowerShell windows
echo  that just opened. You can close this one too.
echo ============================================
echo.
timeout /t 8 /nobreak >nul
