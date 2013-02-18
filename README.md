## What is BabelExtLight? ##

BabelExtLight is a lightweight crossbrowser extension boilerplate for the following browsers:

- Chrome
- Firefox
- Opera (not supported yet)
- Safari

BabelExtLight is inspired from the original project [BabelExt](https://github.com/honestbleeps/BabelExt)

### Who is BabelExtLight for? ###

BabelExtLight is suited for developers wanting to create "content enhancement" extensions that enhance websites.

### What does BabelExtLight do to help me? ###

BabelExtLight will help you to make cross domain http requests (CORS) avoiding crossbrowsers issues and will help you to add stylesheets to the page (some browsers need you to add !important to each lines to be considered).

### Great, now how do I get started? ###

First, download all of the source from Github and put it together within a folder.

Lauch the init.sh shell script. This will:

- copy the common folder content to Chrome/app folder.
- symlink the common folder with the Firefox/data folder.
- link some files into the Safari.safariextension folder.

That's all folks. You can now try the extension in all supported browsers. This will add a simple message ("This is BabelExtLight made by roparz") a the bottom left of all web pages.

### Instructions before making your own extension ###

XHR: get inspiration from the common/extension.user.js to see how you can use XHR.

Styles: go to Firefox/lib/main.js and the "contentStyleFiles" block to see how you can add stylesheet to Firefox extension. Just add the stylesheets you want in the "styles" array of the Safari/background.js file for Safari extension.

## Instructions for loading/testing an extension in each browser ##

### Chrome ###

- Click the wrench icon and choose Tools -> Extensions

- Check the "Developer Mode" checkbox

- Click "load unpacked extension" and choose the Chrome directory

- Go to any web page and see the magic!

- Further Chrome development information can be found at [http://code.google.com/chrome/extensions/index.html](http://code.google.com/chrome/extensions/index.html)

### Firefox ###

- Download the Firefox Addon SDK from [https://addons.mozilla.org/en-US/developers/builder](https://addons.mozilla.org/en-US/developers/builder)

- Follow the installation instructions there, and run the appropriate activation script

- Navigate to the Firefox directory under BabelExtLight, and type: cfx run

- Go to any web page and see the magic!

- Further Firefox development information can be found at [https://addons.mozilla.org/en-US/developers/docs/sdk/latest/](https://addons.mozilla.org/en-US/developers/docs/sdk/latest/)

### Opera (not supported yet) ###

- Click Tools -> Extensions -> Manage Extensions

- Find the config.xml file in the Opera directory of BabelExtLight, and drag it to the Extensions window

- Go to any web page and see the magic!

- Further Opera development information can be found at [http://dev.opera.com/addons/extensions/](http://dev.opera.com/addons/extensions/)


### Safari ###

- Click the gear icon, and choose Settings -> Preferences -> Advanced

- Check the box that reads "Show Develop menu in menu bar"

- Click the menu button (left of the gear icon), and choose Develop -> Show Extension Builder

- Click the + button at the bottom left, and choose "Add Extension"

- Choose the Safari.safariextension folder from BabelExtLight

- Go to any web page and see the magic!

- Further Safari development information can be found at [https://developer.apple.com/library/safari/#documentation/Tools/Conceptual/SafariExtensionGuide/Introduction/Introduction.html](https://developer.apple.com/library/safari/#documentation/Tools/Conceptual/SafariExtensionGuide/Introduction/Introduction.html)

## Instructions for automaticaly build your extension for each browsers ##

Read the build.sh content file. Install all tools you need (cfx for Firefox, crxmake for Chrome and xar for Safari).

You need to follow some instructions before building Safari extension [http://blog.streak.com/2013/01/how-to-build-safari-extension.html](http://blog.streak.com/2013/01/how-to-build-safari-extension.html).

Finally just lauch the build.sh shell script.
