const root = document.getElementById('root');
const questionContainer = document.getElementsByClassName('question')[0];
const questionExtra = document.getElementsByClassName('question-extra')[0];
const url = 'http://localhost:3000/v1/questions/23';


const fetchQuestion = () => {
	
	fetch (url)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			let question = result.data[0][0];
			let answers = result.data[1];
			console.log(result);

			const questionItem = `
				<h1>${question.title}</h1>
				<p class="question-desc">${question.body}</p>
			`
			const authorized = false;
			const deleteButton = authorized?
				`<button class="btn danger margin-top-20" 
					onclick= "confirm('This question will be DELETED permanently 
					(this CANNOT be reversed)')">Delete Question</button>`: '';

			const questionMore = `
					<ul class="list list-unstyled">
						<li>Time asked: <b>${question.timesubmitted}</b></li>
						<li>Answers: <b>${answers.length}</b></li>
						<li>Asked by: <a href="profile-page.html" class="inherit">
							<b>${question.username}</b></a></li>
					</ul>
					${deleteButton}
			`
			questionContainer.innerHTML = questionItem;
			questionExtra.innerHTML = questionMore;

			answers.map( (answer, i) => {
				let answerCard = document.createElement('div');
				answerCard.setAttribute('class', 'answer-card');
				let newClass = authorized? '': 'no-show';
				let status = answer.accepted? 'default': '';
				let answerContent = `
					<div>
						<h4 class="person-answer left">
							<a href="profile-page.html" 
								class="inherit">${answer.username}</a>
							<br>
							<small>Answered <span>${answer.timesubmitted}</span></small>
						</h4>
						<div class="accepted right ${status}">Accepted</div>
						<button class="btn accept right ${newClass}" value="${i}" 
							onclick="showAccepted(this.value)">Accept Answer</button>
						<button class="btn unaccept right ${newClass}" value="${i}" 
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
				
		})
		.catch(error => {
			console.log(error.status);
		});
}