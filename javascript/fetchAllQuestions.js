const root = document.getElementById('root');
const url = 'http://localhost:3000/v1/questions';


const fetchAllQuestions = () => {
	
	fetch (url)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			let questions = result.data[0];
			let answers = result.data[1];
			console.log(result);
			//Reverse the array before mapping {Credit: AdamCooper86 - StackOverflow}
			questions.slice(0).reverse().map( question => {
				let i = 0;
				let answer = '';
				let time = '';
				let username = '';
				let currAnswers = answers.filter( answer => {
					return answer.questionid == question.id;
				});

				let numAnswers = currAnswers.length || 0;
				for (i in currAnswers){
					if (currAnswers[i].accepted ){
						answer = currAnswers[i].body;
						time = currAnswers[i].timesubmitted;
						username = currAnswers[i].username;
					} else if (numAnswers > 0) {
						let randomIndex = Math.floor(Math.random() * currAnswers.length);
						answer = currAnswers[randomIndex].body;
						time = currAnswers[randomIndex].timesubmitted;
						username = currAnswers[randomIndex].username;
					}
					else {
						answer = null;
						time = null;
						username = null;
					}
				}
				let card = document.createElement('div');
				card.setAttribute('class', 'card');
				const demo = `

						<h3 class="qs-title"><a href="${window.location.href}/${question.id}" class="question">${question.title}</a></h3>
						<div>
							<h5 class="person-answer">${username}
								<br>
								<small>Answered <span>${time}</span></small>
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
