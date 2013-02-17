(function(safari, XHR) {
	'use strict';

	var styles = ['css/style.css'];

	function appendStylesheets(page) {
		var i = 0, len = styles.length;
		for (; i < len; i++) {
			page.dispatchMessage('appendStylesheet', {
				'name': 'appendStylesheet',
				'href': safari.extension.baseURI + styles[i]
			});
		}
	}

	function callCallback(page, obj) {
		obj.name = 'callCallback';
		if (obj.callbackID !== undefined) {
			page.dispatchMessage(obj.name, obj);
		}
	}

	function xmlhttpRequest(page, request) {
		new XHR(request, function(response) {
			callCallback(page, { 'callbackID': request.callbackID, 'data': response });
		});
	}

	safari.application.addEventListener('message', function(event) {
		var page = event.target.page;
		if (event.name === 'xmlhttpRequest') {
			xmlhttpRequest(page, event.message);
		} else if (event.name === 'extensionReady') {
			appendStylesheets(page);
			callCallback(page, { 'callbackID': event.message.callbackID });
		} else {
			page.dispatchMessage(event.name, { status: 'unrecognized request type' });
		}
	}, false);

})(safari, XHR);