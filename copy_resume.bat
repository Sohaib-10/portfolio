@echo off
echo Copying real resume to project...

del "c:\Users\Sohaib\Desktop\sohaib-bin-tausif-_-cybersecurity-portfolio (1)\public\Sohaib_Resume.pdf"
copy "C:\Users\Sohaib\Desktop\Sohaib-Resume.pdf" "c:\Users\Sohaib\Desktop\sohaib-bin-tausif-_-cybersecurity-portfolio (1)\public\Sohaib-Resume.pdf"

echo Done! Verifying...
dir "c:\Users\Sohaib\Desktop\sohaib-bin-tausif-_-cybersecurity-portfolio (1)\public\*.pdf"
pause
