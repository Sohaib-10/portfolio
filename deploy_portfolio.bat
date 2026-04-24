@echo off
cd /d "e:\sohaib res"

echo ============================================
echo  Full Rebuild and Deploy
echo ============================================

echo.
echo [1/5] Building the project...
call npm run build

echo.
echo [2/5] Copying .gitattributes to dist...
copy .gitattributes dist\.gitattributes /Y

echo.
echo [3/5] Setting up git in dist...
rmdir /s /q dist\.git 2>nul
cd dist
git init
git branch -M gh-pages
git config user.email "Sohaib-10@users.noreply.github.com"
git config user.name "Sohaib-10"
git config core.autocrlf false

echo.
echo [4/5] Committing...
git add .gitattributes
git add -A
git commit -m "Deploy portfolio"

echo.
echo [5/5] Pushing...
git remote add origin https://github.com/Sohaib-10/portfolio.git
git push -u origin gh-pages --force

echo.
echo ============================================
echo  DONE! Wait 1 min then visit:
echo  https://sohaib-10.github.io/portfolio/
echo ============================================
pause
