const url = 'https://stackoverflow-by-theo1.herokuapp.com/v1/auth/signup';

let usernameInput = document.querySelector('input[name="username"]');
let emailInput = document.querySelector('input[name="user-email"]');
let passwordInput = document.querySelector('input[name="create-password"]');
let errorDisp = document.getElementsByClassName('signup-error');

signupBtn.addEventListener('click', (event) => {
	event.preventDefault();
	if (!username || username === 'null') {
		fetch (url, {
			method: 'post',
	    headers: {
	      'Content-Type': 'application/json',
	      'Accept': 'application/json'
	    },
			body: JSON.stringify({
				"username": usernameInput.value,
				"email": emailInput.value,
				"password": passwordInput.value
			})
		})
		.then( (response) => {
			console.log(emailInput.value);
			return response.json();
		})
		.then( (result) => {
			if (result.statusCode === 201) {
				window.localStorage.setItem('username', result.data.username);
				window.localStorage.setItem('userid', result.data.id);
				window.localStorage
					.setItem('x-access-token', result.data['x-access-token']);

				let navLinks = `
					<a href="${window.location.href}" class="inherit">Home</a>
					<a href="${window.location.href}users/${result.data.id}"
						class="inherit"><b>
						${result.data.username}</b></a>
					<a href="" class="inherit" id="logout">logout</a>`;
				nav.innerHTML = navLinks;

				window.location.replace('/');
			} else {
				errorDisp[0].innerHTML = result.error;
			}
		})
		.catch((error) => console.log('Error:', error));
	} else {
		errorDisp[0].innerHTML = 'You already have an account.'
	}
});
