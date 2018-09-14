// Post Answer

const postAnswer = (event) => {
	let body = document.getElementById('body');
	let mssgDisp = document.getElementById('server-message');
	const link = `https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}/answers`;

	event.preventDefault();
	const token = window.localStorage.getItem('x-access-token');
	fetch (link, {
		method: 'post',
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
		console.log(result);
		if (result.statusCode === 201) {
			mssgDisp.setAttribute('class', 'text-success');
			mssgDisp.innerHTML = result.message;

			setTimeout('location.reload(true)', 3000); //Reload the page from server
		} else if(result.statusCode === 401) {
			mssgDisp.setAttribute('class', 'text-danger');
			mssgDisp.innerHTML = 'You need to Sign in';
			logout();
		} else {
			mssgDisp.setAttribute('class', 'text-danger');
			mssgDisp.innerHTML = result.error;
		}
	})
	.catch(error =>{
		console.log(error);
	});
};
