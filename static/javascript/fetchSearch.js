const fetchSearch = (event) => {
	// event.preventDefault();

	let searchParams = document.querySelector('input[name="search"]').value.trim();
	searchParams =searchParams.split(' ').join('+');
	const mainContainer = document.getElementById('main-container');
	let link = `https://stackoverflow-by-theo1.herokuapp.com/v1/search?search=${searchParams}`;

	fetch (link)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			console.log(result);
			let container = document.createElement('div');
			let titleElem = document.createElement('h2');
			titleElem.innerHTML = 'Search Results';
			mainContainer.innerHTML = '';
			mainContainer.appendChild(titleElem);

			if(!result.data) {
				let searchResult = document.createElement('div');
				searchResult.setAttribute('class', 'search-result');
				let content = `No results to show`;
				searchResult.innerHTML = content;
				mainContainer.appendChild(searchResult);
			} else {

				result.data.map( question => {
					let searchResult = document.createElement('div');
					searchResult.setAttribute('class', 'search-result');
					let content = `
						<h4><a href="${window.location.href.split('/')[0]}/questions/${question.id}">
						${question.title}</a></h4>
							<p><small>${question.body}</small></p>
					`;
					searchResult.innerHTML = content;
					mainContainer.appendChild(searchResult);
					// mainContainer.innerHTML = container;
				})
			}
		})
		.catch(error =>{
			console.log(error);
		});
}