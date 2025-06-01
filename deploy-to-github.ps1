# Push Given Flowers site to GitHub
cd "C:\Users\tjdot\Given Flower\given-flowers-site"

# Initialize git if not already
if (!(Test-Path .git)) {
    git init
}

# Add the new remote
git remote add origin https://github.com/AggrMod/given-flowers-site.git

# Copy build files to root for GitHub Pages
Write-Host "Preparing files for GitHub Pages..." -ForegroundColor Green
Copy-Item -Path "build\*" -Destination "." -Recurse -Force

# Create .gitignore
@"
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production build source
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor
.vscode/
.idea/
"@ | Out-File -FilePath .gitignore -Encoding UTF8

# Add all files
git add .
git commit -m "Initial deployment of Given Flowers site"

# Push to GitHub
git branch -M main
git push -u origin main

Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "Repository: https://github.com/AggrMod/given-flowers-site" -ForegroundColor Cyan
