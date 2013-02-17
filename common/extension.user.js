(function($, BrowserWrapper) {
	'use strict';

	if (window !== window.top) {
		return false;
	}

	function babelextlight() {
		var div = $('<div/>').text('This is BabelExtLight').addClass('babelextlight');


		BrowserWrapper.xhr({
			'url': 'https://api.github.com/users/roparz',
			onload: function(response) {
				var login = JSON.parse(response).login;
				div.text(div.text() + ' made by ' + login);
				div.appendTo(document.body);
			}
		});
	}

	$(function() {
		BrowserWrapper.init(true, babelextlight);
	});

})(jQuery, BrowserWrapper);






