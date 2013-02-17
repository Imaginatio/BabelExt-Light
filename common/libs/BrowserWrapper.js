/*
 * BrowserWrapper.js
 * inspired from BabelExt (http://babelext.com/)
 *
 */
var win = (typeof window !== 'undefined') ? window : this;

var BrowserWrapper = (function(win, XHR) {
	'use strict';

	var extensionContext = true,
		bgMessage = function() {},
		callbackQueue = { count: 0, onloads: [] };


	function queueCallback(thisJSON, callback) {
		if (typeof callback === 'function') {
			thisJSON.callbackID = callbackQueue.count;
			callbackQueue.onloads[callbackQueue.count] = callback;
			callbackQueue.count++;
		}
		return thisJSON;
	}

	function appendStylesheet(href) {
		var link = win.document.createElement('link');
		link.href = href;
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.media = 'screen';
		(win.document.getElementsByTagName('head')[0] || win.document.body).appendChild(link);
	}

	function onMessage(event) {
		if (event.name === 'callCallback') {
			callbackQueue.onloads[event.callbackID](event.data);
		} else if (event.name === 'appendStylesheet') {
			appendStylesheet(event.href);
		}
	}


	return {
		init: function(ctx, callback) {

			if (!ctx) {
				extensionContext = ctx;
				callback();
				return;
			}

			// Firefox
			if (typeof(win.self.on) !== 'undefined') {
				bgMessage = function(thisJSON, callback) {
					win.self.postMessage(queueCallback(thisJSON, callback));
				};
				win.self.on('message', onMessage);

			// Chrome
			} else if (typeof(win.chrome) !== 'undefined') {
				bgMessage = function(thisJSON, callback) {
					win.chrome.extension.sendRequest(thisJSON, callback);
				};
			// Opera
			/*	OPERA IS NOT SUPPORTED YET
			} else if (typeof(win.opera) !== 'undefined') {
				bgMessage = function(thisJSON, callback) {
					win.opera.extension.postMessage(JSON.stringify(queueCallback(thisJSON, callback)));
				};
				win.opera.extension.addEventListener('message', function(event) {
					onMessage(event.data);
				}, false);
			*/
			// Safari
			} else if (typeof(win.safari) !== 'undefined') {
				bgMessage = function(thisJSON, callback) {
					win.safari.self.tab.dispatchMessage(thisJSON.name, queueCallback(thisJSON, callback));
				};
				win.safari.self.addEventListener('message', function(event) {
					onMessage(event.message);
				}, false);

			}

			bgMessage({ 'name': 'extensionReady' }, callback);
		},
		xhr: function(obj) {
			var crossDomain = (obj.url.indexOf(win.location.hostname) === -1);
			// If we are in an extension context
			if (extensionContext && crossDomain) {
				obj.name = 'xmlhttpRequest';
				// Then we make the xmlHttpRequest by the extension background
				// This method prevent from crossdomains restrictions
				bgMessage(obj, obj.onload);
			} else {
				return new XHR(obj, obj.onload, obj.onerror);
			}
		}
	};

})(win, XHR);


















