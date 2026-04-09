@echo off
setlocal

set "PROJECT_ROOT=%~dp0.."
set "NODE_DIR=%PROJECT_ROOT%\.tools\node-v20.18.0-win-x64"
set "PNPM_CLI=%PROJECT_ROOT%\.tools\pnpm\node_modules\pnpm\bin\pnpm.cjs"

if not exist "%NODE_DIR%\node.exe" (
  echo Local Node runtime not found at "%NODE_DIR%"
  exit /b 1
)

if not exist "%PNPM_CLI%" (
  echo Local pnpm CLI not found at "%PNPM_CLI%"
  exit /b 1
)

set "PATH=%NODE_DIR%;%NODE_DIR%\node_modules\npm\bin;%PATH%"
cd /d "%PROJECT_ROOT%\apps\web"

"%NODE_DIR%\node.exe" "%PNPM_CLI%" dev
