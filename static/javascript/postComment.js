// POST COMMENT

const postComment = (id) => {
	let commentBody = document.getElementById(`comment-box-${id.split('-')[1]}`);
	let commentMssgDisp = document.getElementById(`server-message-${id.split('-')[1]}`);
	const link = `
		https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}/answers/${id.split('-')[1]}/comments`;
	const token = window.localStorage.getItem('x-access-token');

	fetch (link, {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/json',
			'x-access-token': token
		}),
		body: JSON.stringify({
			'body': commentBody.value 
		}),
	})
	.then( (response) => {
		console.log(response);
		return response.json();
	})
	.then( (result) => {
		if (result.statusCode === 201) {
			commentMssgDisp.setAttribute('class', 'text-success');
			commentMssgDisp.innerHTML = result.message;

			setTimeout(location.reload(true), 3000); //Reload the page from server
		} else if(result.statusCode === 401) {
			commentMssgDisp.setAttribute('class', 'text-danger');
			commentMssgDisp.innerHTML = 'You need to Sign in';
			logout();
		} else {
			commentMssgDisp.setAttribute('class', 'text-danger');
			commentMssgDisp.innerHTML = result.error;
		}
	})
	.catch(error =>{
		console.log(error);
	});
};
