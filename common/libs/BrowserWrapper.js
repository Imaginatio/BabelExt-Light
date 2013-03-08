/*
 * BrowserWrapper.js
 * inspired from BabelExt (http://babelext.com/)
 *
 */
var win = (typeof window !== 'undefined') ? window : this;

var BrowserWrapper = (function(win, XHR) {
	'use strict';

	var extensionContext = true,
		_bgMessage = function() {},
		callbackQueue = { count: 0, onloads: [] };


	function _queueCallback(thisJSON, callback) {
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

	function _onMessage(event) {
		if (event.name === 'callCallback') {
			callbackQueue.onloads[event.callbackID](event.data);
			callbackQueue.onloads[event.callbackID] = null;
		} else if (event.name === 'appendStylesheet') {
			appendStylesheet(event.href);
		}
	}

	function _xhr(obj) {
		var crossDomain = (obj.url.indexOf(win.location.hostname) === -1);
		// If we are in an extension context
		if (extensionContext && crossDomain) {
			obj.name = 'xmlhttpRequest';
			// Then we make the xmlHttpRequest by the extension background
			// This method prevent from crossdomains restrictions
			_bgMessage(obj, obj.onload);
		} else {
			return new XHR(obj, obj.onload, obj.onerror);
		}
	}


	function _get(url, callback) {
		_xhr({ 'url': url, 'method': 'GET', onload: function(response) {
			callback(JSON.parse(response));
		}});
	}

	function _post(url, data, callback) {
		_xhr({ 'url': url, 'data': data, 'method': 'POST', onload: function(response) {
			callback(JSON.parse(response));
		}});
	}


	return {
		init: function(ctx, callback) {

			if (!ctx) {
				extensionContext = ctx;
				callback();
				return;
			}

			var browser;

			// Firefox
			if (typeof(win.self.on) !== 'undefined') {
				browser = 'firefox';
				_bgMessage = function(thisJSON, callback) {
					win.self.postMessage(_queueCallback(thisJSON, callback));
				};
				win.self.on('message', _onMessage);

			// Chrome
			} else if (typeof(win.chrome) !== 'undefined') {
				browser = 'chrome';
				_bgMessage = function(thisJSON, callback) {
					win.chrome.extension.sendRequest(thisJSON, callback);
				};
			// Opera
			/*  WE DON'T SUPPORT OPERA YET
			} else if (typeof(win.opera) !== 'undefined') {
				browser = 'opera';
				_bgMessage = function(thisJSON, callback) {
					win.opera.extension.postMessage(JSON.stringify(_queueCallback(thisJSON, callback)));
				};
				win.opera.extension.addEventListener('message', function(event) {
					_onMessage(event.data);
				}, false);
			*/
			// Safari
			} else if (typeof(win.safari) !== 'undefined') {
				browser = 'safari';
				_bgMessage = function(thisJSON, callback) {
					win.safari.self.tab.dispatchMessage(thisJSON.name, _queueCallback(thisJSON, callback));
				};
				win.safari.self.addEventListener('message', function(event) {
					_onMessage(event.message);
				}, false);

			}

			_bgMessage({ 'name': 'extensionReady' }, function() {
				callback(browser);
			});
		},
		'xhr': _xhr,
		'get': _get,
		'post': _post
	};

})(win, XHR);