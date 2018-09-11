const root = document.getElementById('root');
const dispName = document.getElementById('username');
const topQuestions = document.getElementById('top-questions');
const url = 'http://localhost:3000/v1/questions';

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
			let questionSummary = [];
			//Reverse the array before mapping {Credit: AdamCooper86 - StackOverflow}
			let data =result.data.slice(0).reverse();
			let hasAccepted;

			//creates an div element called card and maps the questions to it.
			data.map( question => {
				let i = 0;
				let answer = '';
				let time = '';
				let username = '';
				let currAnswers = question.answers;
				let numAnswers = question.numAnswers || 0;

				for (i in currAnswers){
					if (currAnswers[i].accepted ){
						hasAccepted = true;
						answer = currAnswers[i].body;
						time = currAnswers[i].timesubmitted;
						username = currAnswers[i].username;
					} else if (numAnswers > 0) {
						hasAccepted = false;
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

				questionSummary.push({
					id: question.id,
					numAnswers: question.numAnswers,
					title: question.title,
					hasAccepted: hasAccepted,
				});

				let card = document.createElement('div');
				card.setAttribute('class', 'card');
				const demo = `
					<h3 class="qs-title">
						<a href="${window.location.href.split('/')[0]}/questions/${question.id}" 
						class="question">${question.title}</a></h3>
					<div>
						<h5 class="person-answer"><a class="inherit"
						href="${location.href.split('/')[0]}/users/${question.userid}">
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

			
			questionSummary.sort((a, b) => { 
				return b.numAnswers - a.numAnswers});

			console.log(questionSummary);
			for (let i=0; i < 6; i++) {
				let tableItem = document.createElement('tr');
				tableItem.innerHTML = `
					<td><p class="num-answer ${questionSummary[i].hasAccepted?'selected': ''}">
						${questionSummary[i].numAnswers}</p></td>
					<td><p><a href="${location.href.split('/')[0]}/questions/${questionSummary[i].id}">
						${questionSummary[i].title}</a></p></td>
`;
				topQuestions.appendChild(tableItem);
			}
		})
		.catch(error => {
			console.log(error);
		});

};
