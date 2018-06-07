"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var cmsDuckApiUrl = "http://localhost:8080/api/v1";
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

var nameForProduct = document.getElementById('product__form-name');
var descriptionForProduct = document.getElementById('product__form-description');
var priceForProduct = document.getElementById('product__form-price');
var uploadWidgetBtn = document.getElementById('upload_widget_opener');
var productFormBtn = document.getElementById('product__form-btn');

var addproductBtn = document.getElementById('container_header-product-btn');
var productFormCheckBox1 = document.getElementById('product__form-checkbox');
var productFormCheckBox2 = document.getElementById('product__form-checkbox-2');
var productFormOverlay = document.getElementById('product__form-overlay');

var itemPhotos = void 0;

function apiSocialSignup(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(function (response) {
    var data = response.json().then(function (data) {
      return {
        data: data,
        status: response.status
      };
    }).then(function (res) {
      console.log(res.status, res.data);
      gateCheckbox.checked = false;
    });
  }).catch(function (error) {
    return console.log("Error: " + error);
  });
}

googleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  firebase.auth().signInWithPopup(GoogleAuthProvider).then(function (result) {
    var token = result.credential.accessToken;
    var user = result.user;
    var email = user.email,
        uid = user.uid;

    var userData = {
      email: email,
      uid: uid,
      token: token
    };
    apiSocialSignup(cmsDuckApiUrl + "/auth/social/signup", userData);
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
    var user = result.user;
    var email = user.email,
        uid = user.uid;

    var userData = {
      email: email,
      uid: uid,
      token: token
    };
    apiSocialSignup(cmsDuckApiUrl + "/auth/social/signup", userData);
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

/*cloudinary config below*/
document.getElementById("upload_widget_opener").addEventListener("click", function (e) {
  e.preventDefault();
  cloudinary.openUploadWidget({
    cloud_name: 'dxlhzerlq',
    upload_preset: 'acjlrvii'
  }, function (error, result) {
    if (error) {
      return console.log(error);
    }
    var photos = result;
    var numOfPhotos = photos.length;
    itemPhotos = photos;
  });
}, false);

priceForProduct.addEventListener('click', function () {
  this.value = '₦';
});

addproductBtn.addEventListener('click', function (e) {
  e.preventDefault();
  productFormCheckBox1.checked = true;
});

productFormOverlay.addEventListener('click', function () {
  productFormCheckBox1.checked = false;
  productFormCheckBox2.checked = true;
});

productFormBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (nameForProduct.value.length < 1 || descriptionForProduct.value.length < 2 || priceForProduct.value.length < 2) {
    return console.log('nope');
  }

  var inputs = [];
  var valid = ['₦'];
  var counter = 0;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = priceForProduct.value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      inputs.push(i);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (inputs.length === priceForProduct.value.length) {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    inputs.forEach(function (i) {
      counter += 1;
      numbers.forEach(function (n) {
        if (i.includes(n)) {
          valid.push(i);
        }
      });
    });
  }

  if (counter === priceForProduct.value.length && valid.length !== priceForProduct.value.length) {
    return console.log('done counting but something is wrong');
  }

  if (counter === priceForProduct.value.length && (typeof itemPhotos === "undefined" ? "undefined" : _typeof(itemPhotos)) !== 'object') {
    return console.log('done counting but photos have not been uploaded');
  }

  if (counter === priceForProduct.value.length && valid.length === priceForProduct.value.length) {
    return console.log("done counting, and it's all good, " + inputs + " " + itemPhotos);
  }
});