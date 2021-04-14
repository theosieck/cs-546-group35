/**
 * DONT FORGET TO ADD DB STUFF!!
 * 1) check if email already in db
 * 2) check if username already in db
 * 3) store user
 */

//ADD NAMES TO ALL INPUTS ON FRONT END

/**
 * to test these - change input types to plaintext not required
 */

(function() {
	console.log("hello new user page!");

	// get the form DOM element
	const newUserForm = document.getElementById('new-user-form');

	// add an event listener for submit
	newUserForm.addEventListener('submit', (e) => {
		// stop page refresh
		e.preventDefault();

		// get each input in the form
		let firstName = document.getElementById('first-name').value;
		let lastName = document.getElementById('last-name').value;
		let email = document.getElementById('email').value.toLowerCase();
		let username = document.getElementById('username').value.toLowerCase();
		let password = document.getElementById('password').value;
		let confirmPassword = document.getElementById('confirm-password').value;
		let gradYear = parseInt(document.getElementById('grad-year').value);
		let subjects = document.getElementById('subjects').value;

		const isTutor = document.getElementById('is-tutor').value;

		// store all the error strings in an array
		let errorList = [];

		console.log({firstName,lastName,email,username,password,confirmPassword,gradYear,subjects});

		// check first and last name - must exist, must be strings, must not be only spaces
		try {
			if (firstName===undefined) throw 'First Name is required.';
			if (typeof firstName !== 'string') throw 'First Name must be a string.';
			firstName = firstName.trim();
			if (firstName==='') throw 'First Name must contain at least one non-whitespace character.';
		} catch (e) {
			errorList.push(e);
		}
		try {
			if (lastName===undefined) throw 'Last Name is required.';
			if (typeof lastName !== 'string') throw 'Last Name must be a string.';
			lastName = lastName.trim();
			if (lastName==='') throw 'Last Name must contain at least one non-whitespace character.';
		} catch (e) {
			errorList.push(e);
		}

		// check email
		try {
			// must exist
			if (email===undefined) throw 'Email is required.';
			// must be a string
			if (typeof email !== 'string') throw 'Email must be a string.';
			// must not be only spaces
			email = email.trim();
			if (email==='') throw 'Email must contain at least one non-whitespace character.';
			// must be in correct email format
			const emailRE = /^[\S+\b+]*@[\S+\b+]*.[\S+\b+]*$/;
			if (!emailRE.test(email)) throw 'Email must be of the format example@domain.suffix';
			// must not already be in database
			/****ADD DB FUNC TO CHECK IF EMAIL ALREADY EXISTS HERE*****/
			const inDB = false;
			if (inDB) throw 'This email address is already associated with an account. Please log in instead.';
		} catch (e) {
			errorList.push(e);
		}

		// check username
		try {
			// must exist
			if (username===undefined) throw 'Username is required.';
			// must be a string
			if (typeof username !== 'string') throw 'Username must be a string.';
			// must not be only spaces
			username = username.trim()
			if (username==='') throw 'Username must contain at least one non-whitespace character.';
			// must not contain whitespace characters
			const usernameRE = / 	\n\r\\/;
			if (usernameRE.test(username)) throw 'Username must not contain any whitespace characters.';
			// must not already be in databaase
			/****ADD DB FUNC TO CHECK IF USERNAME ALREADY EXISTS HERE*****/
			const inDB = false;
			if (inDB) throw 'This username is already associated with an account. Please log in instead.';
		} catch (e) {
			errorList.push(e);
		}

		// check password/confirm password - must exist, must be strings
		try {
			if (password===undefined) throw 'Password is required.';
			if (typeof password !== 'string') throw 'Password must be a string.';
		} catch (e) {
			errorList.push(e);
		}
		try {
			if (confirmPassword===undefined) throw 'Confirm Password is required.';
			if (typeof confirmPassword !== 'string') throw 'Confirm Password must be a string.';
		} catch (e) {
			errorList.push(e);
		}

		// check that password and confirm password match
		try {
			if (password!==confirmPassword) throw 'Passwords must match.';
		} catch (e) {
			errorList.push(e);
		}

		// check graduation year
		try {
			// must exist
			if (gradYear===undefined) throw 'Graduation Year is required.';
			// must be a number
			if (isNaN(gradYear)) throw 'Graduation Year must be a number.';
			// must be of the form YYYY
			const gradYearRE = /^\d\d\d\d$/;
			if (!gradYearRE.test(gradYear)) throw 'Graduation Year must be of the form YYYY.';
			// must be >= 0
			if (gradYear < 0) throw 'Graduation Year must be greater than 0.';
		} catch (e) {
			errorList.push(e);
		}

		// check subjects
		if (isTutor) {
			// required field
			try {
				// must exist
				if (subjects===undefined) throw 'Subjects is required.';
				// convert subjects to an array delimited by ','
				subjects = subjects.split(',');
				// must contain at least one element
				if (subjects.length<0) throw 'Subjects must contain at least one subject.';
				// must contain only strings
				if (!subjects.every((subj) => typeof subj === 'string')) throw 'Subjects can only contain strings.';
				// must contain at least one non-whitespace string
				subjects = subjects.forEach((subj) => subj.trim());	// trim strings
				if (subjects.every((subj) => subj==='')) throw 'Subjects must contain at least one non-whitespace character.';
			} catch (e) {
				errorList.push(e);
			}
		} else if (subjects!==undefined) {
			console.log(subjects);
			// not required field, but exists, so must contain valid input
			try {
				// convert subjects to an array delimited by ','
				subjects = subjects.split(',');
				// must contain only strings
				if (!subjects.every((subj) => typeof subj === 'string')) throw 'Subjects can only contain strings.';
				// must contain at least one non-whitespace string
				subjects = subjects.forEach((subj) => subj.trim());	// trim strings
				if (subjects===undefined || subjects.every((subj) => subj==='')) throw 'Subjects must contain at least one non-whitespace character.';
			} catch (e) {
				errorList.push(e);
			}
		}

		// if there were errors, don't submit and instead print each error as an li
		if (errorList.length>0) {
			// get the error list element
			const errors = document.getElementById('new-user-input-errors');
			console.log(errorList);
			// add each error as an li to errors
			errorList.forEach((errorStr) => {
				// create an li element
				const errorEl = document.createElement('li');
				// add the text
				errorEl.innerText = errorStr;
				// append the child to errors
				errors.appendChild(errorEl);
			});
		}
		
	})
	
})();