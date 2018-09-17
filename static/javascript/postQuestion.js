let titleInput = document.getElementById('title');
let description = document.getElementById('description');
let mssgDisp = document.getElementById('server-message');
let askBtn = document.getElementById('send-btn');
let lengthDisp = document.getElementById('server-message');

askBtn.addEventListener('click', (event) => {
	event.preventDefault();
	const token = window.localStorage.getItem('x-access-token');
	// Activate the extra small loader
	activateLoaderXs();

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
		console.log(response);
		return response.json();
	})
	.then( (result) => {
		mssgDisp.nextElementSibling.style.display = 'none';
		if (result.statusCode === 201) {
			mssgDisp.setAttribute('class', 'text-success');
			mssgDisp.innerHTML = result.message;

			setTimeout(location.reload(true), 3000); //Reload the page from server
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
});

// Check post character length
// Title
const titleCharLength = () => {
	lengthDisp.innerHTML = `${titleInput.value.length} Characters (title)`;
	if (titleInput.value.trim().length <= 50) {
		lengthDisp.setAttribute('class', 'text-success');
	} else {
		lengthDisp.setAttribute('class', 'text-danger');
	}
}

// Description
const bodyCharLength = () => {
	lengthDisp.innerHTML = `${description.value.length} Characters (description)`;
	if (description.value.trim().length <= 250) {
		lengthDisp.setAttribute('class', 'text-success');
	} else {
		lengthDisp.setAttribute('class', 'text-danger');
	}
}
