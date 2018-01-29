var config = {
    apiKey: "AIzaSyC_jGGRvWSg_g2OjYiN-nt48caXdRHiS-M",
    authDomain: "scribere-1dc4b.firebaseapp.com",
    databaseURL: "https://scribere-1dc4b.firebaseio.com",
    projectId: "scribere-1dc4b",
    storageBucket: "",
    messagingSenderId: "336969414618"
  };
  firebase.initializeApp(config);

  $('#login-google').click(authenticationGoogle);

  function authenticationGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    authentication(provider);
  }

  function authentication(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(result);
      window.location = '../views/tarjetas.html';
    }).catch(function(error) {
      var errorCode = error.code;
      console.log(errorCode);
      var errorMessage = error.message;
      console.log(errorMessage);
      var email = error.email;
      console.log(email);
      var credential = error.credential;
      console.log(credential);
    });
  }
