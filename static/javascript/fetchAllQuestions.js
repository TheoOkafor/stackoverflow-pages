const root = document.getElementById('root');
const dispName = document.getElementById('username');
const url = 'https://stackoverflow-by-theo1.herokuapp.com/v1/questions';
let pageContent;

if (!username || username === 'null') {
	dispName.innerHTML = 'Guest';
} else {
	dispName.innerHTML = username;
}

const fetchAllQuestions = () => {
	
	fetch (url)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			//Reverse the array before mapping {Credit: AdamCooper86 - StackOverflow}
			let data =result.data.slice(0).reverse();

			//creates an div element called card and maps the questions to it.
			data.map( question => {
				let i = 0;
				let answer = '';
				let time = '';
				let username = '';
				let answersUserid = '';
				let currAnswers = question.answers;
				let numAnswers = question.numAnswers || 0;

				// To display accepted answer or any random answer.
				let acceptedAnswer = currAnswers.filter( answer => {
					return answer.accepted;
				});
				if (acceptedAnswer.length > 0){
					answer = acceptedAnswer[0].body;
					time =  new Date(acceptedAnswer[0].timesubmitted).toDateString();
					username = acceptedAnswer[0].username;
					answersUserid = acceptedAnswer[0].userid;
				} else if (numAnswers > 0) {
					let randomIndex = Math.floor(Math.random() * currAnswers.length);
					answer = currAnswers[randomIndex].body;
					time = new Date(currAnswers[randomIndex].timesubmitted)
						.toDateString();
					username = currAnswers[randomIndex].username;
					answersUserid = currAnswers[randomIndex].userid;
				} else {
						answer = 'No answers yet';
						time = '';
						username = '';
				}

				let card = document.createElement('div');
				card.setAttribute('class', 'card');
				const demo = `
					<h3 class="qs-title">
						<a href="${window.location.href.split('/')[0]}/questions/${question.id}" 
						class="question">${question.title}</a></h3>
					<div>
						<h5 class="person-answer"><a class="inherit"
						href="${location.href.split('/')[0]}/users/${answersUserid}">
						${username}</a><br>
							<small>Answered: 	<span>${time}</span></small>
						</h5>
					</div>
					<p class="answer">
						${answer}
					</p>
					<h6>Answers: <span>${numAnswers}</span></h6>
				`

				card.innerHTML = demo;
				root.appendChild(card);
			});
		})
		.catch(error => {
			console.log(error);
		})
		.finally(done => {
			document.getElementsByClassName('loader')[0].style.display = 'none';
		});

};

// SCROLL LOADING (INFINITE LOAD) IMPLEMENTATION


// CLOSE HOME NOTIFICATION
const notifCard = document.getElementById('home-notif');
const closeNotif = () => {
  notifCard.style.display = 'none';
  window.localStorage.setItem('closed', true);
};

const closedNotif = window.localStorage.getItem('closed')? true: false;
if (closedNotif) {
  closeNotif();
}
