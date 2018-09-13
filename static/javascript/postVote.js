// UPVOTE ANSWER
const upvoteAnswer = (id) => {
  // const voteDisp = document.getElementsByClassName('vote-display');
  const voteMssgDisp = document.getElementById(`vote-mssg-${id}`);
  const link = 
    `https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}/answers/${id}`;
  const token = window.localStorage.getItem('x-access-token');

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
    if (result.statusCode === 201) {
      voteMssgDisp.setAttribute('class', 'text-success');
      voteMssgDisp.innerHTML = result.message;
      setTimeout(location.reload(true), 3000); //Reload the page from server
    } else {
      voteMssgDisp.setAttribute('class', 'text-danger');
      voteMssgDisp.innerHTML = result.error;
    }
  })
  .catch(error =>{
    console.log(error);
  });

};

// DOWNVOTE ANSWER
const downvoteAnswer = (id) => {
  const voteMssgDisp = document.getElementById(`vote-mssg-${id}`);
  const link = 
  `https://stackoverflow-by-theo1.herokuapp.com/v1${location.pathname}/answers/${id}`;
  const token = window.localStorage.getItem('x-access-token');

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
    if (result.statusCode === 201) {
      voteMssgDisp.setAttribute('class', 'text-success');
      voteMssgDisp.innerHTML = result.message;
      setTimeout(location.reload(true), 3000); //Reload the page from server
    } else {
      voteMssgDisp.setAttribute('class', 'text-danger');
      voteMssgDisp.innerHTML = result.error;
      // if(result.error == 'could not authenticate the token') {
      //   location.assign(`${location.host}/signin`);
      // }
    }
  })
  .catch(error =>{
    console.log(error);
  });

};
