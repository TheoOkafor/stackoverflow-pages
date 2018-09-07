const docTitle = document.getElementsByTagName('title')[0];
const root = document.getElementById('root');
const allQuestionNum = document.getElementById('all-questions');
const profile = document.getElementById('profile-summary');
const table = document.getElementsByClassName('table')
const profileName = document.getElementsByClassName('profile-username');
const url = 'http://localhost:3000/v1/users/1';

const fetchUser = () => {
	
	fetch (url)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			console.log(result);
			userDetails = result.data[0][0];
			//userQuestionsArr is an array
			userQuestionsArr = result.data[1];
			//userAnswersArr is an array
			userAnswersArr = result.data[2];

			for(let i=0; i<profileName.length; i++){
				profileName[i].innerHTML = userDetails.username;
			}
			allQuestionNum.innerHTML = userQuestionsArr.length;

			const profileSummary = `
					<h4 class="margin-bottom-20"><span class="profile-username">
							${userDetails.username}</span>'s Summary</h4>

					<ul class="list list-unstyled">
						<li>Joined: <b>${userDetails.created}</b></li>
						<li><b>${userQuestionsArr.length}</b> Questions</li>
						<li><b>${userAnswersArr.length}</b> Answers</li>
					</ul>
			`
			profile.innerHTML = profileSummary; 

			userQuestionsArr.map( question => {
				const recentQuestion = `
						<td><p><a href="question.html" class="question">
							${question.title}</a></p></td>
						<td><p class="num-answer">${question.id}</p></td>
				`;

				for (let i=0; i<table.length; i++){
					let tr = document.createElement('tr');
					tr.innerHTML = recentQuestion;
					table[i].appendChild(tr);
				}
			});
			
		})

}
