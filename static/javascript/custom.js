// PASSWORD STRENGTH
const result = document.getElementById('result');
const password = document.getElementById('password');
const passDisplay = document.getElementById('pass-strength');

const check = (input) => {
  let result;
  const arr1 = [/[A-Z]+?/, /[a-z]+?/, /[0-9]+?/, /[$@#&!]+?/];

  const doMatch = (arr, word) => {
    const result = [];
    let i;

    for (i in arr) {
      if (word.match(arr[i]) !== null) {
        result.push(word.match(arr[i]));
      }
    }
    return result;
  };

  if (input.length < 6) {
    result = 'Minimum password length is 6';
  } else if (input.length > 12) {
    result = 'Maximum password length is 12';
  } else {
    const matchLength = doMatch(arr1, input).length;
    switch (matchLength) {
      case 4:
        result = 'Password Strength: 100%';
        break;
      case 3:
        result = 'Password Strength: 75%';
        break;
      case 2:
        result = 'Password Strength: 50%';
        break;
      case 1:
        result = 'Password Strength: 25%';
        break;
      default:
        result = 'Invalid';
    }
  }
  return result;
};
const checkPassword = () => {
  passDisplay.style.display = 'inline-block';
  result.innerHTML = check(password.value);
};

// PASSWORD MATCH CHECK
const matchDisplay = document.getElementById('match-display');
const password2 = document.getElementById('password2');

const passwordMatch = () => {
  if (password.value !== password2.value) {
    matchDisplay.innerHTML = 'Passwords do not match!';
  } else {
    signupBtn.disabled = false;
    matchDisplay.innerHTML = null;
  }
};

// ACCEPT-ANSWER TOGGLE

const showAccepted = (input, id) => {
  const index = parseInt(input);
  const accepted = document.getElementsByClassName('accepted');
  const unacceptBtn = document.getElementsByClassName('unaccept');
  const acceptBtns = document.getElementsByClassName('accept');
  const link = `http://localhost:3000/v1/questions${location.pathname}/answers/${id.split('-')[1]}`;
  const token = window.localStorage.getItem('x-access-token');
  console.log(id);
  fetch (link, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify({
      'value': true 
    }),
  })
  .then( (response) => {
    return response.json();
  })
  .then( (result) => {
    console.log(result);
    if (result.statusCode === 201) {
      unacceptBtn[index].style.display = 'inline';
      accepted[index].style.display = 'inline';

      for (let i = 0; i <= acceptBtns.length - 1; i++) {
        acceptBtns[i].style.display = 'none';
      }
      setTimeout(location.reload(true), 3000); //Reload the page from server
    }
  })
  .catch(error =>{
    console.log(error);
  });

};

//UNACCEPT ANSWER
const showAcceptBtn = (input, id) => {
  const index = parseInt(input);
  const accepted = document.getElementsByClassName('accepted');
  const unacceptBtn = document.getElementsByClassName('unaccept');
  const acceptBtns = document.getElementsByClassName('accept');
  const link = `http://localhost:3000/v1/questions${location.pathname}/answers/${id.split('-')[1]}`;
  const token = window.localStorage.getItem('x-access-token');

  fetch (link, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    }),
    body: JSON.stringify({
      'value': false 
    }),
  })
  .then( (response) => {
    return response.json();
  })
  .then( (result) => {
    console.log(result);
    if (result.statusCode === 201) {
      unacceptBtn[index].style.display = 'none';
      accepted[index].style.display = 'none';

      for (let i = 0; i <= acceptBtns.length - 1; i++) {
        acceptBtns[i].style.display = 'inline';
      }
      setTimeout(location.reload(true), 3000); //Reload the page from server
    }
  })
  .catch(error =>{
    console.log(error);
  });
};

// SHOW MORE CONTENT BUTTON
const showMore = (input) => {
  const index = parseInt(input);
  const btnContainer = document.getElementsByClassName('btn-container');
  // let showMoreBtn = document.getElementsByClassName("show-more");
  const hiddenContent = document.getElementsByClassName('hidden-content');

  hiddenContent[index].style.display = 'inline';
  btnContainer[index].style.display = 'none';
};


//SHOW COMMENT SECTION
const showCommentForm = (input) => {
  //Input is the value of the button which corresponds with the position of the button
  //in the className DOM array
  const index = parseInt(input);
  const commentForm = document.getElementsByClassName('comment-form');
  commentForm[index].style.display = 'block';
};

//CLOSE HOME NOTIFICATION
const closeNotif = () => {
  document.getElementById('home-notif').style.display = 'none';
}


//Controls login and username menu display
const nav = document.querySelector('nav.top-link');
let username = window.localStorage.getItem('username');
let userid = window.localStorage.getItem('userid');

if (!username || username === 'null') {
  let navLinks = `
    <a href="${window.location.href.split('/')[0]}/signup" class="inherit">Sign up</a> |
    <a href="${window.location.href.split('/')[0]}/signin" class="inherit"> Sign in</a>`;
  nav.innerHTML = navLinks;
  
} else {
  let navLinks = `
    <a href="${window.location.href.split('/')[0]}/" class="inherit">Home</a>
    <a href="${window.location.href.split('/')[0]}/users/${userid}" 
      class="inherit"><b>${username}</b></a>
    <a href="" class="inherit" id="logout">logout</a>`;
  
  nav.innerHTML = navLinks;
}

//LOGOUT
let logout = document.getElementById('logout');
if (logout) {
  logout.addEventListener('click', (event) => {
    event.preventDefault();
    window.localStorage.setItem('username', null);
    window.localStorage.setItem('userid', null);
    window.localStorage
      .setItem('x-access-token', null);

    window.location.reload(true);
  });
}