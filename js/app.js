  var config = {
    apiKey: "AIzaSyC_jGGRvWSg_g2OjYiN-nt48caXdRHiS-M",
    authDomain: "scribere-1dc4b.firebaseapp.com",
    databaseURL: "https://scribere-1dc4b.firebaseio.com",
    projectId: "scribere-1dc4b",
    storageBucket: "",
    messagingSenderId: "336969414618"
  };

firebase.initializeApp(config);

// función central para la vista de login
function loadLoginPage(){
  $('#login-google').click(authenticationGoogle);
}

function authenticationGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  authentication(provider);
}

function authentication(provider){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(result);
    localStorage.setItem('userName',user.displayName);
    localStorage.setItem('userPhoto', user.photoURL);
    window.location.href = 'views/tarjetas.html';

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

// función central para la vista de newsfeed

function loadNewsfeedPage() {
  paintDataUser();
  $('.nav-link').click(logOut);
}

function paintDataUser() {
  var userName = localStorage.getItem('userName');
  var userPhoto = localStorage.getItem('userPhoto');
  $('.timeline .user-name').text(userName);
  $('.timeline .user-photo').attr('src',userPhoto);
}

function logOut(e) {
  firebase.auth().signOut().then(function() {
    // return true;
    console.log('cerrado');
    //window.location.href = "index.html";
  }).catch(function(e) {
    console.log(error);
    // return false
  });
}

$(document).ready(function () {
  loadLoginPage();
  loadNewsfeedPage();
});
