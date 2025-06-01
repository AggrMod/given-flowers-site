# PowerShell script to prepare Given Flowers site for deployment
Write-Host "Preparing Given Flowers site for deployment..." -ForegroundColor Green

# Check if build folder exists
$buildPath = "C:\Users\tjdot\Given Flower\given-flowers-site\build"
if (!(Test-Path $buildPath)) {
    Write-Host "Error: Build folder not found at $buildPath" -ForegroundColor Red
    exit 1
}

# Create a zip file of the build folder
$zipPath = "C:\Users\tjdot\Given Flower\given-flowers-site\given-flowers-deploy.zip"
Write-Host "Creating deployment package..." -ForegroundColor Yellow

# Remove existing zip if it exists
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Create the zip file
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($buildPath, $zipPath)

Write-Host "Deployment package created successfully at:" -ForegroundColor Green
Write-Host $zipPath -ForegroundColor Cyan
Write-Host "`nYou can now upload this file to Netlify!" -ForegroundColor Green
