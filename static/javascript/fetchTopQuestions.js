const fetchTopQuestions = () => {

	const topQuestions = document.getElementById('top-questions');
	let url = `https://stackoverflow-by-theo1.herokuapp.com/v1/questions`
	fetch (url)
		.then( response => {
			return response.json();
		})
		.then ( result => {
			console.log(result);
			let questionSummary = [];
			let hasAccepted;
			let data =result.data.slice(0).reverse();

			//creates an div element called card and maps the questions to it.
			data.map( question => {
				let i = 0;
				let answer = '';
				let time = '';
				let username = '';
				let currAnswers = question.answers;
				let numAnswers = question.numAnswers || 0;

				//Makes an array of only accepted answer
				let acceptedAns = currAnswers.filter(answer => {
					if(answer.accepted){
						return true;
					}
				})
				if (acceptedAns.length > 0){
						hasAccepted = true;
				} else {
						hasAccepted = false;
				}

				questionSummary.push({
					id: question.id,
					numAnswers: question.numAnswers,
					title: question.title,
					hasAccepted: hasAccepted,
				});		
			});

			
			questionSummary.sort((a, b) => { 
				return b.numAnswers - a.numAnswers});
			
			for (let i=0; i < 6; i++) {
				let tableItem = document.createElement('tr');
				tableItem.innerHTML = `
					<td><p class="num-answer ${questionSummary[i].hasAccepted?'selected': ''}">
						${questionSummary[i].numAnswers}</p></td>
					<td><p><a href="${location.href.split('/')[0]}/questions/${questionSummary[i].id}">
						${questionSummary[i].title}</a></p></td>
`;
				topQuestions.appendChild(tableItem);
			}
		})
		.catch(error => {
			console.log(error);
		});

};
