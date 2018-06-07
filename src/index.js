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

const nameForProduct = document.getElementById('product__form-name');
const descriptionForProduct = document.getElementById('product__form-description');
const priceForProduct = document.getElementById('product__form-price');
const uploadWidgetBtn = document.getElementById('upload_widget_opener');
const productFormBtn = document.getElementById('product__form-btn');

const addproductBtn = document.getElementById('container_header-product-btn');
const productFormCheckBox1 = document.getElementById('product__form-checkbox');
const productFormCheckBox2 = document.getElementById('product__form-checkbox-2');
const productFormOverlay = document.getElementById('product__form-overlay');

let itemPhotos;

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

/*cloudinary config below*/
document.getElementById("upload_widget_opener").addEventListener("click", function (e) {
  e.preventDefault()
  cloudinary.openUploadWidget({
      cloud_name: 'dxlhzerlq',
      upload_preset: 'acjlrvii'
    },
    function (error, result) {
      if (error) {
        return console.log(error);
      }
      const photos = result;
      const numOfPhotos = photos.length;
      itemPhotos = photos;

    });
}, false);

priceForProduct.addEventListener('click', function () {
  this.value = '₦';
})

addproductBtn.addEventListener('click', function (e) {
  e.preventDefault()
  productFormCheckBox1.checked = true;
})

productFormOverlay.addEventListener('click', function () {
  productFormCheckBox1.checked = false;
  productFormCheckBox2.checked = true;
})

productFormBtn.addEventListener('click', function (e) {
  e.preventDefault()
  if (nameForProduct.value.length < 1 || descriptionForProduct.value.length < 2 || priceForProduct.value.length < 2) {
    return console.log('nope')
  }

  const inputs = [];
  const valid = ['₦'];
  let counter = 0;

  for (let i of priceForProduct.value) {
    inputs.push(i)
  }

  if (inputs.length === priceForProduct.value.length) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    inputs.forEach(i => {
      counter += 1;
      numbers.forEach(n => {
        if (i.includes(n)) {
          valid.push(i);
        }
      })
    });
  }

  if (counter === priceForProduct.value.length && valid.length !== priceForProduct.value.length) {
    return console.log('done counting but something is wrong')
  }

  if (counter === priceForProduct.value.length && typeof itemPhotos !== 'object') {
    return console.log('done counting but photos have not been uploaded')
  }

  if (counter === priceForProduct.value.length && valid.length === priceForProduct.value.length) {
    return console.log(`done counting, and it's all good, ${inputs} ${itemPhotos}`)
  }
})