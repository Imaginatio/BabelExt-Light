var XHR = (function() {

	'use strict';

	function _default(obj) {
		obj.method = obj.method || 'GET';
		obj.data = obj.data || null;
		obj.headers = obj.headers || {};
		obj.async = obj.async || true;
		return obj;
	}

	/*
		obj = {
			method: optional - default: GET
			url: required
			data: optional - default: null
			headers: optional
			async: optional - default: true
		}
		onload: function
		onerror: function
	*/
	return function(obj, onload, onerror) {
		obj = _default(obj);

		var xhr = new XMLHttpRequest();
		xhr.open(obj.method, obj.url, obj.async);
		if (obj.async) {
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					onload(xhr.responseText);
				}
			};
		}
		xhr.onerror = function() {
			if (onerror) onerror(xhr);
		};
		if (obj.method === 'POST') {
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}
		for (var name in obj.headers) {
			xhr.setRequestHeader(name, obj.headers[name]);
		}
		xhr.send(obj.data);

		if (!obj.async) {
			return xhr.responseText;
		}
		return;
	};

})();