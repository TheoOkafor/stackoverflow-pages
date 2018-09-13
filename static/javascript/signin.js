const url = 'https://stackoverflow-by-theo1.herokuapp.com/v1/auth/signin';
let signinBtn = document.querySelector('button#sign-in');
let emailInput = document.querySelector('input[name="email"]');
let passwordInput = document.querySelector('input[name="password"]');
let errorDisp = document.getElementsByClassName('signup-error');

signinBtn.addEventListener('click', (event) => {
	event.preventDefault();
	if (!username || username === 'null') {
		fetch (url, {
			method: 'post',
	    headers: {
	      'Content-Type': 'application/json',
	      'Accept': 'application/json'
	    },
			body: JSON.stringify({
				"email": emailInput.value,
				"password": passwordInput.value
			})
		})
		.then( (response) => {
			console.log(emailInput.value);
			return response.json();
		})
		.then( (result) => {
			if (result.statusCode === 200) {
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

				window.history.back();
			} else {
				errorDisp[0].innerHTML = result.error;
			}
		})
		.catch((error) => console.log('Error:', error));
	} else {
		errorDisp[0].innerHTML = 'You need to logout from the current session'
	}
});
