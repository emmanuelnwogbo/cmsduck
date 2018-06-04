const cmsDuckApiUrl = `http://localhost:8080/api/v1`;
const config = {
  apiKey: "AIzaSyCszmw75vPpcRPR8acGvzyaXMYkMHs9Mr4",
  authDomain: "cms-duck.firebaseapp.com",
  databaseURL: "https://cms-duck.firebaseio.com",
  projectId: "cms-duck",
  storageBucket: "cms-duck.appspot.com",
  messagingSenderId: "99247098410"
};
firebase.initializeApp(config);

const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
GoogleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
FacebookAuthProvider.addScope('email');

const googleBtn = document.getElementById('googlebtn');
const facebookBtn = document.getElementById('facebookbtn');
const gateCheckbox = document.getElementById('gate-checkbox');

const navigationTrayButton = document.getElementById('naviTray-button');
const navigationCheckbox = document.getElementById('navi-toggle');
const navigationTrayCheckbox = document.getElementById('naviTray-toggle');
const naviOverlay = document.getElementById('nav_overlay');
const navigationTrayItems = document.getElementsByClassName('navigationTray__item');

function apiSocialSignup(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(response => {
    const data = response.json().then(data => ({
      data,
      status: response.status
    })).then(res => {
      console.log(res.status, res.data);
      gateCheckbox.checked = false;
    })
  }).catch(error => console.log(`Error: ${error}`));
}

googleBtn.addEventListener('click', e => {
  e.preventDefault();
  firebase.auth().signInWithPopup(GoogleAuthProvider).then(function (result) {
    const token = result.credential.accessToken;
    const user = result.user;
    const {
      email,
      uid
    } = user
    const userData = {
      email,
      uid,
      token
    }
    apiSocialSignup(`${cmsDuckApiUrl}/auth/social/signup`, userData);
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
});

facebookBtn.addEventListener('click', e => {
  e.preventDefault();
  firebase.auth().signInWithPopup(FacebookAuthProvider).then(function (result) {
    const token = result.credential.accessToken;
    var user = result.user;
    const {
      email,
      uid
    } = user
    const userData = {
      email,
      uid,
      token
    }
    apiSocialSignup(`${cmsDuckApiUrl}/auth/social/signup`, userData);
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
})

const navTrayRemove = () => {
  navigationCheckbox.checked = false;
  navigationTrayCheckbox.checked = false;
};

navigationTrayButton.addEventListener('click', () => {
  if (navigationCheckbox.checked === true) {
    setTimeout(navTrayRemove, 950);
  }
});

naviOverlay.addEventListener('click', () => {
  navigationTrayCheckbox.checked = true;
  if (navigationCheckbox.checked === true) {
    setTimeout(navTrayRemove, 950);
  }
});

Array.from(navigationTrayItems, i => {
  i.addEventListener('click', e => {
    e.preventDefault();
    navigationTrayCheckbox.checked = true;
    if (navigationCheckbox.checked === true) {
      setTimeout(navTrayRemove, 950);
    }
  });
});