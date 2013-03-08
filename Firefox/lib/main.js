(function(require) {
	'use strict';

	var self = require("self"),
		Request = require("request").Request,
		contentScriptFiles = [
			self.data.url('libs/jquery.min.js'),
			self.data.url('libs/XHR.js'),
			self.data.url('libs/BrowserWrapper.js'),
			self.data.url('extension.user.js')
		],
		contentStyleFiles = [
			self.data.url('css/style.css')
		];

	function appendStylesheets(worker) {
		var i = 0, len = contentStyleFiles.length;
		for (; i < len; i++) {
			worker.postMessage({
				'name': 'appendStylesheet',
				'href': contentStyleFiles[i]
			});
		}
	}

	function callCallback(worker, obj) {
		obj.name = 'callCallback';
		if (obj.callbackID !== undefined) {
			worker.postMessage(obj);
		}
	}


	function xmlhttpRequest(worker, obj) {
		var req = new Request({
			'url': obj.url,
			onComplete: function(response) {
				callCallback(worker, {
					'callbackID': obj.callbackID,
					'data': response.text
				});
			},
			'headers': obj.headers,
			'content': obj.data
		});
		if (obj.method == 'POST') req.post();
		else req.get();
	}


	function onAttach(worker) {
		worker.on('message', function(event) {
			if (event.name === 'xmlhttpRequest') {
				xmlhttpRequest(worker, event);
			} else if (event.name === 'extensionReady') {
				appendStylesheets(worker);
				callCallback(worker, {
					'callbackID': event.callbackID
				});
			} else {
				worker.postMessage({ 'status': 'unrecognized request type' });
			}
		});

	}

	require("page-mod").PageMod({
		'include': "*",
		'contentScriptWhen': 'end',
		'contentScriptFile': contentScriptFiles,
		'onAttach': onAttach
	});


})(require);












