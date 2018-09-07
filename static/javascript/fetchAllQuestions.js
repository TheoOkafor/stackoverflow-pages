const root = document.getElementById('root');
const dispName = document.getElementById('username');
const url = 'http://stackoverflow-by-theo1.herokuapp.com/v1/questions';

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
			result.data.slice(0).reverse().map( question => {
				let i = 0;
				let answer = '';
				let time = '';
				let username = '';
				let currAnswers = question.answers;
				let numAnswers = currAnswers.length || 0;
				for (i in currAnswers){
					if (currAnswers[i].accepted ){
						answer = currAnswers[i].body;
						time = currAnswers[i].timesubmitted;
						username = currAnswers[i].username;
					} else if (numAnswers > 0) {
						let randomIndex = Math.floor(Math.random() * currAnswers.length);
						answer = currAnswers[randomIndex].body;
						time = new Date(currAnswers[randomIndex].timesubmitted)
							.toDateString();
						username = currAnswers[randomIndex].username;
					}
					else {
						answer = 'No answers yet';
						time = null;
						username = null;
					}
				}
				let card = document.createElement('div');
				card.setAttribute('class', 'card');
				const demo = `
					<h3 class="qs-title">
						<a href="${window.location.href.split('/')[0]}/questions/${question.id}" 
						class="question">${question.title}</a></h3>
					<div>
						<h5 class="person-answer">${username}
							<br>
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
		});

};
