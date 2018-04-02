var config = {
  apiKey: "AIzaSyC_jGGRvWSg_g2OjYiN-nt48caXdRHiS-M",
  authDomain: "scribere-1dc4b.firebaseapp.com",
  databaseURL: "https://scribere-1dc4b.firebaseio.com/",
  projectId: "scribere-1dc4b",
  storageBucket: "",
  messagingSenderId: "336969414618"
};

firebase.initializeApp(config);

// instancia de la base de datos de firebase
var database = firebase.database();

// función central para la vista de login
function loadLoginPage(){
  $('#login-google').click(authenticationGoogle);
}

// función para autentificar a un usuario, usando su cuenta Google
function authenticationGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  authentication(provider);
}

// función que valida la información del usuario logeado
function authentication(provider){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user);
    window.location.href = 'views/tarjetas.html';
    saveDataUser(user);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
}

// función para almacenar al usuario en la base de datos
function saveDataUser(user) {
  var scribereUser = {
    uid: user.uid,
    name : user.displayName,
    email : user.email,
    photo: user.photoURL
  }
  firebase.database().ref('scribere-user/' + user.uid)
  .set(scribereUser);
}

// función central para la vista de newsfeed
function loadNewsfeedPage() {
  // paintDataUser();
  $('.nav-link').click(logOut);
  $('.new-text').keyup(validateHistory);
  //$('.button-publish').click(paintHistoryInHtml);
  $('.button-publish').click(writeNewPost);
}

// function paintDataUser() {
//   var userName = localStorage.getItem('userName');
//   var userPhoto = localStorage.getItem('userPhoto');
//   $('.timeline .user-name').text(userName);
//   $('.timeline .user-photo').attr('src',userPhoto);
// }

// función que valida que el contenido del post no esté vacío
function validateHistory(){
  if($('.new-text').val().trim().length > 0) {
    $('.button-publish').removeAttr("disabled");
  } else {
    $('.button-publish').attr("disabled" , true);
  }
}

function writeNewPost(user) {
  // A post entry.
  var postData = {
    author: user.displayName, //
    uid: user.uid, //
    body: $('#new-history .new-text').val(),
    title: $('#new-history .tittle-text').val(),
    starCount: 0,
    historyPic: $('#file-history')[0].files[0]
  };

  // Get a key for a new Post.
  firebase.database().ref('posts-stories').set(postData);

  // Write the new post's data simultaneously in the posts list and the user's post list.
  // var updates = {};
  // updates['/posts/' + newPostKey] = postData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  //return firebase.database().ref().update(updates);
}



// función que pinta el nuevo post en el newsfeed
function paintHistoryInHtml(e) {
  e.preventDefault();

  var $historyInput = $('.new-text').val();

  var $cardHistory = $('<div />', {'class' : 'card new-post'});
  var $cardImagen = $('<img />', {'class' : 'card-img-top img-fluid photo-history', 'alt' : 'Card image'});
  var $cardBody = $('<div />', {'class' : 'card-body'});
  var $cardAuthor = $('<h5 />', {'class' : 'card-author'});
  var $cardTittle = $('<h3 />', {'class' : 'card-title'});
  var $cardText = $('<p />', {'class' : 'card-text'});
  var $savePin = $('<a />', {'class' : 'btn btn-primary'});

  $cardAuthor.text('usuario');
  $cardTittle.text($('.tittle-text').val());
  $cardText.text($historyInput);
  $savePin.text('Save as favorite');

  $cardBody.append($cardAuthor);
  $cardBody.append($cardTittle);
  $cardBody.append($cardText);
  $cardBody.append($savePin);

  $cardHistory.append($cardImagen);
  $cardHistory.append($cardBody);

  var $imagenUpload = $('#file-history')[0].files[0];
  console.log($imagenUpload);
  var reader  = new FileReader();

  reader.onloadend = function () {
    $cardImagen.attr('src',reader.result);
  }

  if($imagenUpload) {
    reader.readAsDataURL($imagenUpload);
  } else {
    $cardImagen.attr('src'," ");
  }

  $('#timeline-history').prepend($cardHistory);
  $('#wall-history').prepend($cardHistory);
  $('.tittle-text').val(" ");
  $('.new-text').val(" ");
  $('.file-history').next().val(" ");
}

function logOut() {
  firebase.auth().signOut()

  .then(function() {
    // return true;
    console.log('cerrado');
    //window.location.href = "index.html";
  }, function(error) {
    console.log(error);
    // return false
  });
}

$(document).ready(function () {
  loadLoginPage();
  loadNewsfeedPage();
});
