@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0apps\web"
echo Starting ECH-ST Website Development Server...
echo.
echo Please wait, the server will start at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
node node_modules\next\dist\bin\next dev
pause