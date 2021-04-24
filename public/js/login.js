(function ($) {
	// get login form
	var loginForm = $('#login');

	// set up submit handler
	loginForm.submit(function (event) {
		// prevent default behavior
		event.preventDefault();

		// get username and password
		var username = $('#username').val();
		var password = $('#password').val();

		var errorList = [];

		// make sure both username and password exist
		if (username===undefined || username===null) errorList.push('Please enter your username.');
		if (password===undefined || password===null) errorList.push('Please enter your password.');

		// make sure both username and password are strings
		if (typeof username !== 'string') errorList.push('Username must be a string.');
		if (typeof password !== 'string') errorList.push('Password must be a string.');

		// trim and check for all whitespace
		username = username.trim();
		if (username==='') errorList.push('Username must contain at least one nonwhitespace character.');
		password = password.trim();
		if (password==='') errorList.push('Password must contain at least one nonwhitespace character.');

		// make sure username does not contain any whitespace
		const usernameRE = /[ 	]/;
		if (usernameRE.test(username)) errorList.push('Username must not contain any whitespace characters.');

		// if there were any errors, render them to the page and don't continue
		if (errorList.length>0) {
			// create the unordered list to hold the errors
			var errors = $('<ul class="error">');
			// add each error as a list element to errors
			errorList.forEach((error) => {
				var errorEl = $('<li>');
				errorEl.text(error);
				errorEl.appendTo(errors);
			});
			// append the errors element to main after the form
			loginForm.after(errors);
		} else {
			// no errors, so submit ajax request to POST /login/do-login
			var requestConfig = {
				method: 'POST',
				url: '/login/do-login',
				contentType: 'application/json',
				data: JSON.stringify({
					username,
					password
				}),
				error: function (e) {
					// TODO - decide what to actually do here
					var errorMsg = $('<p class="error">');
					errorMsg.text(e.responseJSON.error);
					loginForm.after(errorMsg);
				}
			};
			$.ajax(requestConfig).then(function (res) {
				// if message = 'success', hide the form and display the success message
				if (res.message==='success') {
					loginForm.hide();
					var successMsg = $('<p>');
					successMsg.text(`You are now logged in.`);
					loginForm.before(successMsg);
				}
			})
		}

	})
})(window.jQuery);