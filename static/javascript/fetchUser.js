const docTitle = document.getElementsByTagName('title')[0];
const root = document.getElementById('root');
const allQuestionNum = document.getElementById('all-questions');
const profile = document.getElementById('profile-summary');
const table = document.getElementsByClassName('user-table')
const profileName = document.getElementsByClassName('profile-username');
const url = `https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}`;

const fetchUser = () => {
	
	fetch (url)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			if (result.statusCode === 200) {
				console.log(result);
				let timeJoined = new Date(result.data.created).toUTCString();
				// userQuestionsArr is the questions array
				let userQuestionsArr = result.data.questions;
				let userAnswersArr = result.data.answers;

				//Loops through the profileName DOM object filling it with the username 
				for(let i=0; i<profileName.length; i++){
					profileName[i].innerHTML = result.data.username;
				}

				allQuestionNum.innerHTML = userQuestionsArr? userQuestionsArr.length:
					0 ;

				const profileSummary = `
						<h4 class="margin-bottom-20"><span class="profile-username">
								${result.data.username}</span>'s Summary</h4>

						<ul class="list list-unstyled">
							<li>Joined: <b>${timeJoined}</b></li>
							<li><b>${userQuestionsArr?userQuestionsArr.length: 0}</b> Questions</li>
							<li><b>${userAnswersArr? userAnswersArr.length: 0}</b> Answers</li>
						</ul>
				`
				profile.innerHTML = profileSummary; 
				if (userQuestionsArr) {
					userQuestionsArr.map( question => {

						let numAnswers = question.answers.length;
						// Get an array containing the accepted answer
						let acceptedAnswer = question.answers.filter( answer => {
							if (answer.accepted) {
								return true;
							}
						});

						// Check whether the question has an answer that has been accepted.
						let hasAccepted = acceptedAnswer.length > 0? true: false;

						let recentQuestion = ` <td><p>
							<a href="${location.href.split('/')[0]}/questions/${question.id}" 
								class="question">
								${question.title}</a></p></td>
							<td><p class="num-answer ${hasAccepted?'selected': ''}">${numAnswers}</p></td>
						`;
						// Fills up all the tables with questions
						for (let i=0; i<table.length; i++){
							let tr = document.createElement('tr');
							tr.innerHTML = recentQuestion;
							table[i].appendChild(tr);
						}
					});
				} else {
						let recentQuestion = "No questions yet";

						for (let i=0; i<table.length; i++){
							let tr = document.createElement('tr');
							tr.innerHTML = recentQuestion;
							table[i].appendChild(tr);
						}
				}
			} else {
				location.assign(`${location.href.split('/')[0]}/error-404`);
			}
		})
		.catch(error => {
			console.log(error);
		});

}
