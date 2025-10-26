// Get elements from html

var inputname = document.getElementById("inputName");
var inputEmail = document.getElementById("inputEmail");
var inputPass = document.getElementById("inputPass");
var btn = document.getElementById("btn");
var pp = document.getElementById("pp");
var btnSignUp = document.getElementById("btnSignUp");
var signupLink = document.getElementById("signup");
var signIn = document.getElementById("signIn");

var errMsg = document.getElementById("errMsg");
var repMsg = document.getElementById("repMsg");
var exmsg = document.getElementById("exmsg");
var coreMsg = document.getElementById("coreMsg");

var passinvalid = document.getElementById("passinvalid");
// make array to save guest info
var accInfromation = [];
// sure if array has any info
if (localStorage.getItem("Information")) {
  accInfromation = JSON.parse(localStorage.getItem("Information"));
}
// function to hide and show inputs and errors
function signup() {
  passinvalid.classList.replace("d-none", "d-block");
  inputname.classList.replace("d-none", "d-block");
  btn.classList.add("d-none");
  pp.classList.add("d-none");
  btnSignUp.classList.replace("d-none", "d-block");
  signupLink.classList.add("d-none");
  repMsg.classList.replace("d-block", "d-none");
  coreMsg.classList.replace("d-block", "d-none");
  signIn.classList.replace("d-none", "d-block");
}

// function  to create account
function reg() {
  if (validName() == true && validEmail() == true && vaildPass() == true) {
    var ex = false;

    for (var i = 0; i < accInfromation.length; i++) {
      if (
        accInfromation[i].accEmail.toLowerCase() ===
        inputEmail.value.toLowerCase()
      ) {
        ex = true;
        break;
      }
    }

    if (ex) {
      exmsg.classList.replace("d-none", "d-block");
      return;
    }

    var acc = {
      accName: inputname.value,
      accEmail: inputEmail.value,
      accPass: inputPass.value,
    };

    // Add info in array
    accInfromation.push(acc);
    // Save info in local storage
    localStorage.setItem("Information", JSON.stringify(accInfromation));

    // control messeges
    inputname.classList.replace("d-block", "d-none");
    btn.classList.remove("d-none");
    pp.classList.remove("d-none");
    btnSignUp.classList.replace("d-block", "d-none");
    signupLink.classList.remove("d-none");
  } else {
    errMsg.classList.replace("d-none", "d-block");
  }
}

// function for valid name
function validName() {
  var text = inputname.value;
  var pattern = /^[a-zA-Z0-9_]{5,20}$/;

  if (pattern.test(text)) {
    inputname.classList.remove("is-invalid");
    inputname.classList.add("is-valid");
    return true;
  } else {
    inputname.classList.remove("is-valid");
    inputname.classList.add("is-invalid");
    return false;
  }
}
// function for valid email
function validEmail() {
  var text = inputEmail.value;
  var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (pattern.test(text)) {
    inputEmail.classList.remove("is-invalid");
    inputEmail.classList.add("is-valid");
    return true;
  } else {
    inputEmail.classList.remove("is-valid");
    inputEmail.classList.add("is-invalid");
    return false;
  }
}
//  function for valid pass
function vaildPass() {
  var text = inputPass.value;
  var pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

  if (pattern.test(text)) {
    inputPass.classList.remove("is-invalid");
    inputPass.classList.add("is-valid");
    passinvalid.classList.replace("d-block", "d-none");
    return true;
  } else {
    inputPass.classList.remove("is-valid");
    inputPass.classList.add("is-invalid");
    return false;
  }
}
// function log in check if email and pass vaild or not
function logIn() {
  if (validEmail() == true && vaildPass() == true) {
    for (i = 0; i < accInfromation.length; i++) {
      if (
        inputEmail.value == accInfromation[i].accEmail &&
        inputPass.value == accInfromation[i].accPass
      ) {
        window.location.href = "index2.html";
      } else {
        coreMsg.classList.replace("d-none", "d-block");
        errMsg.classList.replace("d-block", "d-none");
      }
    }
  } else {
    errMsg.classList.replace("d-none", "d-block");
  }

  if (
    !accInfromation.includes(inputEmail.value) &&
    !accInfromation.includes(inputPass.value)
  ) {
    coreMsg.classList.replace("d-none", "d-block");
    return;
  }
}




// show info about clients in another page html

var fileName = window.location.pathname.split("/").pop();

if (fileName === "index2.html") {
  var user = JSON.parse(localStorage.getItem("Information"));

  if (user) {
    for (var i = 0; i < accInfromation.length; i++) {
      var text = document.getElementById("welcome");

      text.innerHTML = `Hello ${accInfromation[i].accName}`;
    }
  }
}
