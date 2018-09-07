let titleInput = document.getElementById('title');
let description = document.getElementById('description');
let mssgDisp = document.getElementById('serverMessage');
let askBtn = document.getElementById('send-btn');

askBtn.addEventListener('click', (event) => {
	event.preventDefault();
	const token = window.localStorage.getItem('x-access-token');
	fetch (url, {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/json',
			'x-access-token': token
		}),
		body: JSON.stringify({
			'title': titleInput.value,
			'body': description.value 
		}),
	})
	.then( (response) => {
		return response.json();
	})
	.then( (result) => {
		console.log(result);
		if (result.statusCode == 201) {
			mssgDisp.setAttribute('class', 'text-success');
			mssgDisp.innerHTML = result.message;

			//location.reload(true);
		} else {
			mssgDisp.setAttribute('class', 'text-danger');
			mssgDisp.innerHTML = result.error;
		}
	})
	.catch(error =>{
		console.log(error);
	});
});
