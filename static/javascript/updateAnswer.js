// Update Answer

const updateAnswer = (id) => {
	let body = document.getElementById('body');
	let oldAnswer = document.getElementById(`ans-${id.split('-')[1]}`);
	let mssgDisp = document.getElementById('server-message');
	let addAnswerBtn = document.getElementById('add-answer');
	const link = 
		`https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}/answers/${id.split('-')[1]}`;

	body.value = oldAnswer.innerHTML.trim();
	oldAnswer.style.backgroundColor = '#ffffcc';
	body.focus() // Brings the input element to focus.

	const updateAnswerExec = (event) => {
		event.preventDefault();
		const token = window.localStorage.getItem('x-access-token');
		fetch (link, {
			method: 'put',
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': token
			}),
			body: JSON.stringify({
				'body': body.value 
			}),
		})
		.then( (response) => {
			console.log(response);
			return response.json();
		})
		.then( (result) => {
			mssgDisp.nextElementSibling.style.display = 'none';
			if (result.statusCode === 201) {
				mssgDisp.setAttribute('class', 'text-success');
				mssgDisp.innerHTML = result.message;

			} else {
				mssgDisp.setAttribute('class', 'text-danger');
				mssgDisp.innerHTML = result.error;
			}
		})
		.catch(error =>{
			console.log(error);
		})
		.finally( done => {
			setTimeout(location.reload(true), 3000); //Reload the page from server
		});
	};

	addAnswerBtn.removeEventListener("click", postAnswer);
	addAnswerBtn.addEventListener('click', updateAnswerExec);
	addAnswerBtn.innerHTML = 'Update Answer';
};
