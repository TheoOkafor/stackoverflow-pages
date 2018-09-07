const docTitle = document.getElementsByTagName('title')[0];
const root = document.getElementById('root');
const dispName = document.getElementById('user-name');
const questionContainer = document.getElementsByClassName('question');
const questionExtra = document.getElementsByClassName('question-extra');
const url = `http://localhost:3000/v1/questions${location.pathname}`;

if (!username || username === 'null') {
	dispName.innerHTML = `<h4><a href="" class="inherit">Guest 
	</a><small>(you)</small></h4>`;
} else {
	dispName.innerHTML = `<h4><a href="${location.href.split('/')[0]}
		/users/${userid}" class="inherit">${username} 
		</a><small>(you)</small></h4>`;
}

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
					`<button class="btn danger margin-top-20" 
						onclick= "confirm('This question will be DELETED permanently 
						(this CANNOT be reversed)')">Delete Question</button>`: '';

				const questionMore = `
						<ul class="list list-unstyled">
							<li>Time asked: 
								<b>${new Date(question.timesubmitted).toDateString()}</b></li>
							<li>Answers: <b>${answers.length}</b></li>
							<li>Asked by: <a href="profile-page.html" class="inherit">
								<b>${question.username}</b></a></li>
						</ul>
						${deleteButton}
				`
				questionContainer[0].innerHTML = questionItem;
				questionExtra[0].innerHTML = questionMore;

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
								<button class="btn accept right ${newClass}" value="${i}" 
									onclick="showAccepted(this.value)">Accept Answer</button>
								<button class="btn unaccept right ${addClass}" value="${i}" 
									onclick="showAcceptBtn(this.value)">Un-accept Answer</button>
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
			}		
		})
		.catch(error => {
			console.log(error)
		});
}