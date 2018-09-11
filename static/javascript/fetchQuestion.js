const docTitle = document.getElementsByTagName('title')[0];
const root = document.getElementById('root');
const dispName = document.getElementById('user-name');
const questionContainer = document.getElementsByClassName('question');
const questionExtra = document.getElementsByClassName('question-extra');
const deletePromptDisp = document.getElementById('overlay-delete');
const deletePromptInner = document.querySelector('#overlay-delete div');

const url = `http://localhost:3000/v1${location.pathname}`;


if (!username || username === 'null') {
	dispName.innerHTML = `<h4><a href="" class="inherit">Guest 
	</a><small>(you)</small></h4>`;
} else {
	dispName.innerHTML = `<h4><a href="${location.href.split('/')[0]}
		/users/${userid}" class="inherit">${username} 
		</a><small>(you)</small></h4>`;
}

// Handles the question page and answers API fetch
const fetchQuestion = () => {
	
	fetch (url)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			if (result.statusCode === 404){
				location.assign(`${location.href.split('/')[0]}/error-404`);
			} else {
				let question = result.result.question;
				let answers = result.result.question.answers;

				let deletePrompt = `
					<p>This question will be DELETED permanently (this CANNOT be reversed)</p>
					<button class="btn" id="delete-confirm" 
					value="${question.id}" onclick="deleteQuestion(this.value)"> OK, Delete Question</button>
					<button class="btn primary-o" id="delete-cancel" onclick="cancelDelete()">Cancel</button>
					`;

				deletePromptInner.innerHTML = deletePrompt;

				// Get an array containing the accepted answer
				let acceptedAnswer = answers.filter( answer => {
					if (answer.accepted) {
						return true;
					}
				});

				// Check whether the question has an answer that has been accepted.
				let hasAccepted = acceptedAnswer.length > 0? true: false;

				docTitle.innerHTML = `${question.title} - Stack Overflow-lite`;
				const questionItem = `
					<h1>${question.title}</h1>
					<p class="question-desc">${question.body}</p>
				`
				const authorized = username === question.username;
				const deleteButton = authorized?
					`<button class="btn margin-top-20" 
						onclick= "showDeleteOverlay()">Delete Question</button>`: '';

				const questionMore = `
						<ul class="list list-unstyled">
							<li>Time asked: 
								<b>${new Date(question.timesubmitted).toDateString()}</b></li>
							<li>Answers: <b>${answers.length}</b></li>
							<li>Asked by: <a href="${location.href.split('/')[0]}/users/${question.userid}" class="inherit">
								<b>${question.username}</b></a></li>
						</ul>
						${deleteButton}
				`
				questionContainer[0].innerHTML = questionItem;
				questionExtra[0].innerHTML = questionMore;

				// Arrange Questions to start with the the accepted answer
				// if the an answer has been accepted.
				if (hasAccepted) {
					answers = answers.slice(0).reverse();
				}
				// Loops through the answer array, adding answer elements to the DOM
				answers.map( (answer, i) => {
					let answerCard = document.createElement('div');
					answerCard.setAttribute('class', 'answer-card');
					let newClass = authorized && !hasAccepted? '': 'no-show';
					let addClass = authorized && hasAccepted && answer.accepted? 'show': '';
					let status = answer.accepted? 'default': '';
					let answerContent = `
						<div>
							<h4 class="person-answer left">
								<a href="profile-page.html" 
									class="inherit">${answer.username}</a>
								<br>
								<small>Answered: 
								<span>${new Date(answer.timesubmitted).toDateString()}
								</span></small>
							</h4>

							<div class="accepted right ${status}">Accepted</div>
								<button class="btn accept right ${newClass}" value="${i}" id="acc-${answer.id}"
									onclick="showAccepted(this.value, this.id)">Accept Answer</button>
								<button class="btn unaccept right ${addClass}" value="${i}" id="un-${answer.id}"
									onclick="showAcceptBtn(this.value, this.id)">Un-accept Answer</button>
							</div>
						<div class="clear-fix"></div>
						<p class="answer">
							${answer.body}
						</p>
						<div class="answer-options">
							<span class="upvote-display">3</span>
							<button class="btn primary-o">Upvote</button>
							<button class="link gray">Downvote</button>
							<button class="link" value="${i}" 
								onclick="showCommentForm(this.value)">Comment</button>

							<div class="comments">
								<p class="comment-display"></p>
							</div>
							<form class="comment-form">
								<textarea placeholder="Comment on this answer"></textarea>
								<button class="btn primary">Post Comment</button>
								<input type="reset" value="Cancel">
							</form>
						</div>
					`

					answerCard.innerHTML = answerContent;
					root.appendChild(answerCard);
				});
				//End of Answer.map function.
			}		
		})
		.catch(error => {
			console.log(error)
		});
}

const showDeleteOverlay = () => {
	deletePromptDisp.style.display = 'block';
}
const cancelDelete = () => {
	deletePromptDisp.style.display = 'none';
}

// Handles the delete question API fetch
const deleteQuestion = (questionId) => {
	const token = window.localStorage.getItem('x-access-token'); 
	fetch(url, {
		method: 'delete',
		headers: new Headers({
			'Content-Type': 'application/json',
			'x-access-token': token
		}),
	})
	.then( (response) => {
		console.log(response);
		return response.json();
	})
	.then( (result) => {
		console.log(result);
		let mssgDisp = document.createElement('p');
		if (result.statusCode === 201) {
			mssgDisp.innerHTML = result.message;

			deletePromptInner.innerHTML = "Done";
			deletePromptInner.appendChild(mssgDisp);
			setTimeout(location.reload(true), 5000); //Reload the page from server
		} else {
			mssgDisp.innerHTML = result.error;

			deletePromptInner.innerHTML = "Done";
			deletePromptInner.appendChild(mssgDisp);
		}
	})
	.catch(error =>{
		console.log(error);
	});

}
