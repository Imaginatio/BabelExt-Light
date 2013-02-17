#!/bin/sh

# Clean up
rm -rf ./Chrome/app/
rm -f ./Firefox/data
rm -f ./Safari.safariextension/icon-48.png ./Safari.safariextension/jquery.min.js ./Safari.safariextension/BrowserWrapper.js
rm -f ./Safari.safariextension/extension.user.js ./Safari.safariextension/XHR.js
rm -rf ./Safari.safariextension/img ./Safari.safariextension/css

rm -f ./babel_chrome.crx
rm -f ./babel_firefox.xpi
rm -f ./babel_safari.safariextz

# Chrome
cp -r ./common ./Chrome/app
# Firefox
ln -s ../common ./Firefox/data
# Safari
ln ./common/libs/jquery.min.js ./Safari.safariextension/jquery.min.js
ln ./common/libs/BrowserWrapper.js ./Safari.safariextension/BrowserWrapper.js
ln ./common/libs/XHR.js ./Safari.safariextension/XHR.js
ln ./common/extension.user.js ./Safari.safariextension/extension.user.js
mkdir ./Safari.safariextension/css
ln ./common/css/style.css ./Safari.safariextension/css/style.css
mkdir ./Safari.safariextension/img
ln ./common/img/globe.png ./Safari.safariextension/img/globe.png
ln ./common/icons/icon48.png ./Safari.safariextension/icon-48.png


