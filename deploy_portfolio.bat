@echo off
cd /d "e:\sohaib res"

echo ============================================
echo  Deploying Portfolio via GitHub Actions
echo ============================================
echo.

:: Stage all changes
echo [1/3] Staging all changes...
git add -A

:: Prompt for commit message or use default
set /p commit_msg="Enter commit message (press Enter for default 'update: portfolio content'): "
if "%commit_msg%"=="" set commit_msg=update: portfolio content

echo.
echo [2/3] Committing changes...
git commit -m "%commit_msg%"

echo.
echo [3/3] Pushing to main branch on GitHub...
git push origin main

echo.
echo ============================================
echo  SUCCESS! Pushed to main branch.
echo  GitHub Actions will now automatically build and deploy the changes.
echo.
echo  Track deployment progress here:
echo  https://github.com/Sohaib-10/portfolio/actions
echo.
echo  Once complete (approx. 1-2 mins), visit:
echo  https://sohaib-10.github.io/portfolio/
echo ============================================

