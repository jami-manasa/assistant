$projectRoot = Split-Path -Parent $PSScriptRoot
$nodeDir = Join-Path $projectRoot ".tools\node-v20.18.0-win-x64"
$pnpmDir = Join-Path $projectRoot ".tools\pnpm"
$envFile = Join-Path $projectRoot ".env"

if (!(Test-Path $nodeDir)) {
  Write-Error "Local Node runtime not found at $nodeDir"
  exit 1
}

if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') {
      return
    }

    $parts = $_ -split '=', 2
    if ($parts.Length -eq 2) {
      [System.Environment]::SetEnvironmentVariable($parts[0], $parts[1], 'Process')
    }
  }
}

$env:Path = "$nodeDir;$nodeDir\node_modules\npm\bin;$pnpmDir;$env:Path"

Write-Host "Using local Node from $nodeDir"
node -v
pnpm -v
pnpm dev
