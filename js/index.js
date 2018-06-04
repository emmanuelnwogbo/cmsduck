"use strict";

var config = {
  apiKey: "AIzaSyCszmw75vPpcRPR8acGvzyaXMYkMHs9Mr4",
  authDomain: "cms-duck.firebaseapp.com",
  databaseURL: "https://cms-duck.firebaseio.com",
  projectId: "cms-duck",
  storageBucket: "cms-duck.appspot.com",
  messagingSenderId: "99247098410"
};
firebase.initializeApp(config);

var GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
var FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
GoogleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
FacebookAuthProvider.addScope('email');

var googleBtn = document.getElementById('googlebtn');
var facebookBtn = document.getElementById('facebookbtn');
var gateCheckbox = document.getElementById('gate-checkbox');

var navigationTrayButton = document.getElementById('naviTray-button');
var navigationCheckbox = document.getElementById('navi-toggle');
var navigationTrayCheckbox = document.getElementById('naviTray-toggle');
var naviOverlay = document.getElementById('nav_overlay');
var navigationTrayItems = document.getElementsByClassName('navigationTray__item');

googleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  firebase.auth().signInWithPopup(GoogleAuthProvider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;
    var email = user.email,
        uid = user.uid;

    var newduckUser = {
      email: email,
      uid: uid,
      token: token
    };
    console.log(newduckUser);
    gateCheckbox.checked = false;
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    var email = error.email;
    var credential = error.credential;
  });
});

facebookBtn.addEventListener('click', function (e) {
  e.preventDefault();
  firebase.auth().signInWithPopup(FacebookAuthProvider).then(function (result) {
    var token = result.credential.accessToken;
    console.log(token);
    var user = result.user;
    console.log(user);
    gateCheckbox.checked = false;
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
});

var navTrayRemove = function navTrayRemove() {
  navigationCheckbox.checked = false;
  navigationTrayCheckbox.checked = false;
};

navigationTrayButton.addEventListener('click', function () {
  if (navigationCheckbox.checked === true) {
    setTimeout(navTrayRemove, 950);
  }
});

naviOverlay.addEventListener('click', function () {
  navigationTrayCheckbox.checked = true;
  if (navigationCheckbox.checked === true) {
    setTimeout(navTrayRemove, 950);
  }
});

Array.from(navigationTrayItems, function (i) {
  i.addEventListener('click', function (e) {
    e.preventDefault();
    navigationTrayCheckbox.checked = true;
    if (navigationCheckbox.checked === true) {
      setTimeout(navTrayRemove, 950);
    }
  });
});