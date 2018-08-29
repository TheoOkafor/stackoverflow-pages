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
const signupBtn = document.getElementById('sign-up');

const passwordMatch = () => {
  if (password.value !== password2.value) {
    matchDisplay.innerHTML = 'Passwords do not match!';
  } else {
    signupBtn.disabled = false;
  }
};

// ACCEPT-ANSWER TOGGLE

const showAccepted = (input) => {
  const index = parseInt(input);
  const accepted = document.getElementsByClassName('accepted');
  const unacceptBtn = document.getElementsByClassName('unaccept');
  const acceptBtns = document.getElementsByClassName('accept');

  unacceptBtn[index].style.display = 'inline';
  accepted[index].style.display = 'inline';

  for (let i = 0; i <= acceptBtns.length - 1; i++) {
    acceptBtns[i].style.display = 'none';
  }
};


const showAcceptBtn = (input) => {
  const index = parseInt(input);
  const accepted = document.getElementsByClassName('accepted');
  const unacceptBtn = document.getElementsByClassName('unaccept');
  const acceptBtns = document.getElementsByClassName('accept');

  unacceptBtn[index].style.display = 'none';
  accepted[index].style.display = 'none';

  for (let i = 0; i <= acceptBtns.length - 1; i++) {
    acceptBtns[i].style.display = 'inline';
  }
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