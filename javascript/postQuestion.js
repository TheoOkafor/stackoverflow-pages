let root = document.getElementById('root');
let url = 'http://localhost:3000/v1/questions';
let titleInput = document.getElementById('title');
let description = document.getElementById('description');
let btn = document.getElementById('send-btn');

const postQuestion = () => {
	const request = (url, {
		method: 'POST', 
		mode: 'cors', 
		redirect: 'follow',
		headers: new Headers({
			'Content-Type': 'application/json',
			'x-access-token': 'x-access-token'
		}),
		referrer: 'no-referrer',
		body: JSON.stringify({
			title: titleInput.value,
			body: description.value 
		}),
	});
	
	fetch (request)
		