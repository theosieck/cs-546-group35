// import bcrypt
const bcrypt = require('bcryptjs');
// import connection and data
const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const users = data.users;
const ratings = data.ratings;
const questions = data.questions;

/**
 * generate hashedPasswords for seed users
 * uses the synchronous method for simplicity and 10 salt rounds for efficiency
 * @param plainTextPW: the plaintext password to be hashed
 * @returns the hashed password
*/
const genHP = (plainTextPW) => {
	return bcrypt.hashSync(plainTextPW, 10);
}

const main = async () => {
	// start the db connection
	const db = await dbConnection();
	// drop the database
	await db.dropDatabase();
	
	/* create 5 student users */
	let user1;
	try {
		user1 = await users.createUser({
			firstName: "Jorie",
			lastName: "Sieck",
			email: "jsieck@stevens.edu",
			username: "jorie",
			hashedPassword: genHP("jorie111"),
			year: 2022,
			relevantSubjects: [],
			isTutor: false
		});
	} catch (e) {
		console.log(`Error in creation of user 1: ${e}`)
	}
	let user2;
	try {
		user2 = await users.createUser({
			firstName: "Brandon",
			lastName: "Cao",
			email: "bcao4@stevens.edu",
			username: "brandon",
			hashedPassword: genHP("brandon1"),
			year: 2022,
			relevantSubjects: [],
			isTutor: false
		});
	} catch (e) {
		console.log(`Error in creation of user 2: ${e}`)
	}
	let user3;
	try {
		user3 = await users.createUser({
			firstName: "Ferris",
			lastName: "Bueller",
			email: "fbueller@glenbrook.edu",
			username: "ferris",
			hashedPassword: genHP("ferris11"),
			year: 1986,
			relevantSubjects: [],
			isTutor: false
		});
	} catch (e) {
		console.log(`Error in creation of user 3: ${e}`)
	}
	let user4;
	try {
		user4 = await users.createUser({
			firstName: "Marty",
			lastName: "McFly",
			email: "mmcfly@hillvalley.edu",
			username: "marty",
			hashedPassword: genHP("marty111"),
			year: 1985,
			relevantSubjects: [],
			isTutor: false
		});
	} catch (e) {
		console.log(`Error in creation of user 4: ${e}`)
	}
	let user5;
	try {
		user5 = await users.createUser({
			firstName: "Scott",
			lastName: "Howard",
			email: "showard@beacontown.edu",
			username: "scott",
			hashedPassword: genHP("scott111"),
			year: 1985,
			relevantSubjects: [],
			isTutor: false
		});
	} catch (e) {
		console.log(`Error in creation of user 5: ${e}`)
	}

	/* create 5 tutor users */
	let user6;
	try {
		user6 = await users.createUser({
			firstName: "Corinne",
			lastName: "Wisniewski",
			email: "cwisnie1@stevens.edu",
			username: "corinne",
			hashedPassword: genHP("corinne1"),
			year: 2022,
			relevantSubjects: ['CS 146', 'CS 492'],
			isTutor: true
		});
	} catch (e) {
		console.log(`Error in creation of user 6: ${e}`);
	}
	let user7;
	try {
		user7 = await users.createUser({
			firstName: "Sebastian",
			lastName: "Muriel",
			email: "smuriel@stevens.edu",
			username: "sebastian",
			hashedPassword: genHP("sebastian1"),
			year: 2022,
			relevantSubjects: ['MA 232'],
			isTutor: true
		});
	} catch (e) {
		console.log(`Error in creation of user 7: ${e}`)
	}
	let user8;
	try {
		user8 = await users.createUser({
			firstName: "Patrick",
			lastName: "Hill",
			email: "phill@stevens.edu",
			username: "patrick",
			hashedPassword: genHP("patrick1"),
			year: 2022,
			relevantSubjects: ['CS 546', 'CS 554'],
			isTutor: true
		});
	} catch (e) {
		console.log(`Error in creation of user 8: ${e}`)
	}
	let user9;
	try {
		user9 = await users.createUser({
			firstName: "Allison",
			lastName: "Reynolds",
			email: "areynolds@shermer.edu",
			username: "allison",
			hashedPassword: genHP("allison1"),
			year: 1985,
			relevantSubjects: ['Detention'],
			isTutor: true
		});
	} catch (e) {
		console.log(`Error in creation of user 9: ${e}`)
	}
	let user10;
	try {
		user10 = await users.createUser({
			firstName: "Carrie",
			lastName: "White",
			email: "cwhite@bates.edu",
			username: "carrie",
			hashedPassword: genHP("carrie11"),
			year: 1976,
			relevantSubjects: ['Telekinesis'],
			isTutor: true
		});
	} catch (e) {
		console.log(`Error in creation of user 10: ${e}`)
	}

	/* add tutors to 3 users */
	try {
		user1 = await users.updateUser({id:user1._id, tutorList: [user6._id, user7._id]});
		user6 = await users.updateUser({id: user6._id, tutorList: [user1._id]});
		user7 = await users.updateUser({id: user7._id, tutorList: [user1._id]});
	} catch (e) {
		console.log(`Error updating user 1, 6, 7: ${e}`);
	}
	try {
		user2 = await users.updateUser({id:user2._id, tutorList: [user8._id, user9._id, user10._id]});
		user8 = await users.updateUser({id: user8._id, tutorList: [user2._id]});
		user9 = await users.updateUser({id: user9._id, tutorList: [user2._id]});
		user10 = await users.updateUser({id: user10._id, tutorList: [user2._id]});
	} catch (e) {
		console.log(`Error updating user 2, 8, 9, 10: ${e}`);
	}
	try {
		user3 = await users.updateUser({id:user3._id, tutorList: [user6._id, user7._id,user8._id, user9._id, user10._id]});
		user6 = await users.updateUser({id: user6._id, tutorList: [user3._id]});
		user7 = await users.updateUser({id: user7._id, tutorList: [user3._id]});
		user8 = await users.updateUser({id: user8._id, tutorList: [user3._id]});
		user9 = await users.updateUser({id: user9._id, tutorList: [user3._id]});
		user10 = await users.updateUser({id: user10._id, tutorList: [user3._id]});
	} catch (e) {
		console.log(`Error updating user 3, 6, 7, 8, 9, 10: ${e}`);
	}

	/* create 10 questions */
	let question1;
	try {
		question1 = await questions.createQuestion(user1._id, "Question1" ,"This is question 1" , ['CS 546', 'CS 554']);
	} catch (e) {
		console.log(`Error in creation of question 1: ${e}`)
	}
	let question2;
	try {
		question2 = await questions.createQuestion(user2._id, "Question 2" ,"This is question 2" , ['math', 'statistics']);
	} catch (e) {
		console.log(`Error in creation of question 2: ${e}`)
	}
	let question3;
	try {
		question3 = await questions.createQuestion(user3._id, "Question 3" ,"This is question 3" , ['computer science', 'web programming']);
	} catch (e) {
		console.log(`Error in creation of question 3: ${e}`)
	}
	let question4;
	try {
		question4 = await questions.createQuestion(user4._id, "Question 4" ,"This is question 4" , ['english']);
	} catch (e) {
		console.log(`Error in creation of question 4: ${e}`)
	}
	let question5;
	try {
		question5 = await questions.createQuestion(user5._id, "Question 5" ,"This is question 5" , ['CS492']);
	} catch (e) {
		console.log(`Error in creation of question 5: ${e}`)
	}
	let question6;
	try {
		question6 = await questions.createQuestion(user1._id, "Trivia" ,"What came first the chicken or the egg?" , ['Science', 'biology']);
	} catch (e) {
		console.log(`Error in creation of question 6: ${e}`)
	}
	let question7;
	try {
		question7 = await questions.createQuestion(user2._id, "Hindsight Bias" ,"What is hindsight bias?" , ['Psychology']);
	} catch (e) {
		console.log(`Error in creation of question 7: ${e}`)
	}
	let question8;
	try {
		question8 = await questions.createQuestion(user3._id, "Civil War" ,"What time period was the American Civil War?" , ['History']);
	} catch (e) {
		console.log(`Error in creation of question 8: ${e}`)
	}
	let question9;
	try {
		question9 = await questions.createQuestion(user4._id, "Web Dev" ,"What are the most popular languages used in Web Development?" , ['Web Dev']);
	} catch (e) {
		console.log(`Error in creation of question 9: ${e}`)
	}
	let question10;
	try {
		question10 = await questions.createQuestion(user5._id, "Operating Systems" ,"What languages are OS's written in?" , ['Computer Science', "OS", "CS492"]);
	} catch (e) {
		console.log(`Error in creation of question 10: ${e}`)
	}

	/* create 10 answers */
	let answer1;
	try {
		answer1 = await questions.createAnswer(user6._id, 'this is an answer', question1._id);
	} catch (e) {
		console.log(`Error in creation of answer 1: ${e}`);
	}
	let answer2;
	try {
		answer2 = await questions.createAnswer(user7._id, 'this is a better answer', question1._id);
	} catch (e) {
		console.log(`Error in creation of answer 2: ${e}`);
	}
	let answer3;
	try {
		answer3 = await questions.createAnswer(user10._id, 'i am just adding a follow up answer', question1._id);
	} catch (e) {
		console.log(`Error in creation of answer 3: ${e}`);
	}
	let answer4;
	try {
		answer4 = await questions.createAnswer(user6._id, 'this is a great answer', question5._id);
	} catch (e) {
		console.log(`Error in creation of answer 4: ${e}`);
	}
	let answer5;
	try {
		answer5 = await questions.createAnswer(user7._id, 'i have more to add here', question5._id);
	} catch (e) {
		console.log(`Error in creation of answer 5: ${e}`);
	}
	let answer6;
	try {
		answer6 = await questions.createAnswer(user7._id, 'it was definitely the chicken', question6._id);
	} catch (e) {
		console.log(`Error in creation of answer 6: ${e}`);
	}
	let answer7;
	try {
		answer7 = await questions.createAnswer(user10._id, 'no, it was the egg', question6._id);
	} catch (e) {
		console.log(`Error in creation of answer 7: ${e}`);
	}
	let answer8;
	try {
		answer8 = await questions.createAnswer(user8._id, 'JavaScript is definitely one of them', question9._id);
	} catch (e) {
		console.log(`Error in creation of answer 8: ${e}`);
	}
	let answer9;
	try {
		answer9 = await questions.createAnswer(user9._id, 'HTML is another', question9._id);
	} catch (e) {
		console.log(`Error in creation of answer 9: ${e}`);
	}
	let answer10;
	try {
		answer10 = await questions.createAnswer(user8._id, 'HTML is a markup language, not a programming one', question9._id);
	} catch (e) {
		console.log(`Error in creation of answer 10: ${e}`);
	}

	/* add 10 ratings to tutors */
	try {
		const rating1 = await ratings.createRating(user1._id, user6._id, 10, 'answerRatingByStudents', answer1._id);
	} catch (e) {
		console.log(`Error rating user 6: ${e}`);
	}
	try {
		const rating2 = await ratings.createRating(user6._id, user7._id, 9, 'answerRatingByTutors', answer2._id);
	} catch (e) {
		console.log(`Error rating user 7: ${e}`);
	}
	try {
		const rating3 = await ratings.createRating(user2._id, user9._id, 8, 'tutorRating');
	} catch (e) {
		console.log(`Error rating user 9: ${e}`);
	}
	try {
		const rating4 = await ratings.createRating(user3._id, user10._id, 1, 'answerRatingByStudents', answer3._id);
	} catch (e) {
		console.log(`Error rating user 10: ${e}`);
	}
	try {
		const rating5 = await ratings.createRating(user9._id, user7._id, 2, 'answerRatingByTutors', answer2._id);
	} catch (e) {
		console.log(`Error rating user 7: ${e}`);
	}
	try {
		const rating6 = await ratings.createRating(user3._id, user9._id, 5, 'tutorRating');
	} catch (e) {
		console.log(`Error rating user 9: ${e}`);
	}
	try {
		const rating7 = await ratings.createRating(user4._id, user6._id, 7, 'answerRatingByStudents', answer4._id);
	} catch (e) {
		console.log(`Error rating user 6: ${e}`);
	}
	try {
		const rating8 = await ratings.createRating(user6._id, user10._id, 4, 'answerRatingByTutors', answer3._id);
	} catch (e) {
		console.log(`Error rating user 10: ${e}`);
	}
	try {
		const rating9 = await ratings.createRating(user2._id, user8._id, 1, 'tutorRating');
	} catch (e) {
		console.log(`Error rating user 8 ${e}`);
	}
	try {
		const rating10 = await ratings.createRating(user3._id, user8._id, 10, 'tutorRating');
	} catch (e) {
		console.log(`Error rating user 10: ${e}`);
	}

	console.log('\nDone seeding database');
	await db.serverConfig.close();
}

main();