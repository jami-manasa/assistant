$projectRoot = Split-Path -Parent $PSScriptRoot
$nodeDir = Join-Path $projectRoot ".tools\node-v20.18.0-win-x64"
$pnpmDir = Join-Path $projectRoot ".tools\pnpm"

if (!(Test-Path $nodeDir)) {
  Write-Error "Local Node runtime not found at $nodeDir"
  exit 1
}

$env:Path = "$nodeDir;$nodeDir\node_modules\npm\bin;$pnpmDir;$env:Path"

Write-Host "Using local Node from $nodeDir"
node -v
pnpm -v
pnpm install
