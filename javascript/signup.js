const url = 'http://localhost:3000/v1/auth/signup';
let inputs = document.getElementById("signup-form").elements;
let usernameInput = inputs['username'];
let emailInput = inputs['user-email'];
let passwordInput = inputs['create-password'];

const signup = () => {
	const request = (url, {
		method: 'POST',
		redirect: 'follow',
		headers: new Headers({
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}),
		referrer: 'no-referrer',
		body: JSON.stringify({
			username: usernameInput.value,
			email: emailInput.value,
			password: passwordInput.value
		}),
	});
	
	fetch (request)
		.then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.log('Error:', error));
};