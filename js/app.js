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
  $('.new-text').keyup(validateHistory);
  $('.button-publish').click(paintHistoryInHtml)
}

function paintDataUser() {
  var userName = localStorage.getItem('userName');
  var userPhoto = localStorage.getItem('userPhoto');
  $('.timeline .user-name').text(userName);
  $('.timeline .user-photo').attr('src',userPhoto);
}

function validateHistory(){
  if($(this).val().trim().length > 0) {
    $('.button-publish').removeAttr("disabled");
  } else {
    $('.button-publish').attr("disabled" , true);
  }
}

function paintHistoryInHtml(e) {
  e.preventDefault();
  //
  //   if($imagenUpload.files && $imagenUpload.files[0]) {
  //     console.log($imagenUpload);
  //
  //     var variableX = new FileReader();
  //
  //     console.log(variableX);
  //   }

  var $historyInput = $('.new-text').val();

  var $cardHistory = $('<div />', {'class' : 'card'});
  var $cardImagen = $('<img />', {'class' : 'card-img-top photo-history','src': ' ', 'alt' : 'Card image'});
  var $cardBody = $('<div />', {'class' : 'card-body'});
  var $cardTittle = $('<h5 />', {'class' : 'card-title'});
  var $cardText = $('<p />', {'class' : 'card-text'});
  var $savePin = $('<a />', {'class' : 'btn btn-primary'});

  $cardTittle.text(localStorage.getItem('userName'));
  $cardText.text($historyInput);
  $savePin.text('Save as favorite');

  $cardBody.append($cardTittle);
  $cardBody.append($cardText);
  $cardBody.append($savePin);

  $cardHistory.append($cardImagen);
  $cardHistory.append($cardBody);

  var $imagenUpload = $('#file-history')[0].files[0];
  console.log($imagenUpload);
  var reader  = new FileReader();

  reader.onloadend = function () {
    $cardImagen.src = reader.result;
  }

  if($imagenUpload) {
    reader.readAsDataURL($imagenUpload);
  } else {
    $cardImagen.src = "";
  }

  $('#timeline-history').append($cardHistory);

  $('.new-text').val(" ");
  $('.file-history').next().val(" ");
}

//
// $(document).on('change','.file-history',function(){
//   // e.preventDefault();
//   if(this.files && this.files[0]){
//     /* Creamos la Imagen*/
// 		var imagenHistory = $('.photo-history');
//     /* Asignamos el atributo source , haciendo uso del método createObjectURL*/
// 		imagenHistory.attr('src', URL.createObjectURL(this.files[0]));
//     /  * Añadimos al Div*/
// 	  console.log(imagenHistory);
// 	}
// });

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
