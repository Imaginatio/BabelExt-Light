#!/bin/sh

./init.sh

FX_NAME=babel_firefox
FX_FOLDER=Firefox

CH_NAME=babel_chrome
CH_FOLDER=Chrome

SF_NAME=babel_safari
SF_FOLDER=Safari.safariextension

# you need cfx
# https://addons.mozilla.org/en-US/developers/docs/sdk/1.13/dev-guide/tutorials/installation.html
cd $FX_FOLDER
cfx xpi
mv $FX_NAME.xpi ../$FX_NAME.xpi
cd ..

# you need crxmake
# gem install crxmake => https://github.com/Constellation/crxmake
echo "Exporting extension to $CH_NAME.crx."
crxmake --pack-extension=$CH_FOLDER --extension-output=$CH_NAME.crx --pack-extension-key=Chrome.pem

CERTS=.safari.certificates
# you need xar
# http://blog.streak.com/2013/01/how-to-build-safari-extension.html
echo "Exporting extension to $SF_NAME.safariextz."
xar -czf $SF_NAME.safariextz --distribution $SF_FOLDER
xar --sign -f $SF_NAME.safariextz --digestinfo-to-sign digest.dat --sig-size `cat $CERTS/size.txt` --cert-loc $CERTS/cert.der --cert-loc $CERTS/cert01 --cert-loc $CERTS/cert02
openssl rsautl -sign -inkey $CERTS/key.pem -in digest.dat -out sig.dat
xar --inject-sig sig.dat -f $SF_NAME.safariextz
rm -f sig.dat digest.dat