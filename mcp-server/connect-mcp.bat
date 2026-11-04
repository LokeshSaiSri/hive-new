@echo off
echo =======================================================
echo     HiveSchool MCP Server - 1-Click Setup
echo =======================================================
echo.

:: Get the absolute path of the current directory (mcp-server)
set MCP_DIR=%~dp0
set MCP_DIR=%MCP_DIR:~0,-1%

:: Escape backslashes for JSON compatibility
set JSON_MCP_DIR=%MCP_DIR:\=\\%

echo [1/3] Installing necessary dependencies...
cd "%MCP_DIR%"
call npm install --silent
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to install dependencies. Please ensure Node.js is installed.
    pause
    exit /b
)

set CLAUDE_CONFIG_DIR=%APPDATA%\Claude
set CLAUDE_CONFIG_FILE=%CLAUDE_CONFIG_DIR%\claude_desktop_config.json

echo.
echo [2/3] Linking to Claude Desktop...

:: Create Claude config directory if it doesn't exist
if not exist "%CLAUDE_CONFIG_DIR%" (
    mkdir "%CLAUDE_CONFIG_DIR%"
)

:: Generate and write the JSON config directly to the correct Claude folder
(
echo {
echo   "mcpServers": {
echo     "hiveschool": {
echo       "command": "node",
echo       "args": ["%JSON_MCP_DIR%\\index.mjs"],
echo       "env": {
echo         "HIVESCHOOL_WEBHOOK_URL": "http://localhost:3000/api/blogs/webhook",
echo         "HIVESCHOOL_WEBHOOK_SECRET": "hive-claude-secure-secret-2026!",
echo         "HIVESCHOOL_SITE_URL": "http://localhost:3000",
echo         "UNSPLASH_ACCESS_KEY": ""
echo       }
echo     }
echo   }
echo }
) > "%CLAUDE_CONFIG_FILE%"

echo.
echo [3/3] Finalizing setup...
echo.
echo =======================================================
echo [SUCCESS] HiveSchool is now securely connected to Claude!
echo =======================================================
echo.
echo WHAT TO DO NEXT:
echo 1. Right-click the Claude Desktop icon in your taskbar and click "Quit".
echo 2. Reopen Claude Desktop.
echo 3. You will now see the hammer icon (tools) in the text box.
echo.
pause
