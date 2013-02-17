(function(extension, XHR) {
	'use strict';

	extension.onRequest.addListener(function(event, sender, sendResponse) {
		if (event.name === 'xmlhttpRequest') {
			new XHR(event, sendResponse);
		} else {
			sendResponse({status: "unrecognized request type"});
		}
	});

})(chrome.extension, XHR);