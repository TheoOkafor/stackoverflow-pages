// UPVOTE ANSWER
const upvoteAnswer = (id) => {
  // const voteDisp = document.getElementsByClassName('vote-display');
  const voteMssgDisp = document.getElementById(`vote-mssg-${id.split('-')[1]}`);
  const link = 
    `https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}/answers/${id.split('-')[1]}`;
  const token = window.localStorage.getItem('x-access-token');
  // Activate the extra small loader
  activateLoaderXs(id);

  fetch (link, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify({
      'vote': 'upvote' 
    }),
  })
  .then( (response) => {
    return response.json();
  })
  .then( (result) => {
    voteMssgDisp.nextElementSibling.style.display = 'none';
    if (result.statusCode === 201) {
      voteMssgDisp.setAttribute('class', 'text-success');
      voteMssgDisp.innerHTML = result.message;
      setTimeout(location.reload(true), 3000); //Reload the page from server
    } else {
      voteMssgDisp.setAttribute('class', 'text-danger');
      voteMssgDisp.innerHTML = result.error;
      if(result.statusCode === 401) {
        voteMssgDisp.setAttribute('class', 'text-danger');
        voteMssgDisp.innerHTML = 'You need to sign in first';
      }
    }
  })
  .catch(error =>{
    console.log(error);
  });

};

// DOWNVOTE ANSWER
const downvoteAnswer = (id) => {
  const voteMssgDisp = document.getElementById(`vote-mssg-${id.split('-')[1]}`);
  const link = 
  `https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}/answers/${id.split('-')[1]}`;
  const token = window.localStorage.getItem('x-access-token');
  // Activate the extra small loader
  activateLoaderXs(id);

  fetch (link, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify({
      'vote': 'downvote' 
    }),
  })
  .then( (response) => {
    return response.json();
  })
  .then( (result) => {
    voteMssgDisp.nextElementSibling.style.display = 'none';
    if (result.statusCode === 201) {
      voteMssgDisp.setAttribute('class', 'text-success');
      voteMssgDisp.innerHTML = result.message;
      setTimeout(location.reload(true), 3000); //Reload the page from server
    } else {
      voteMssgDisp.setAttribute('class', 'text-danger');
      voteMssgDisp.innerHTML = result.error;
      if(result.statusCode === 401) {
        voteMssgDisp.setAttribute('class', 'text-danger');
        voteMssgDisp.innerHTML = 'You need to sign in first';
      }
    }
  })
  .catch(error =>{
    console.log(error);
  });

};
