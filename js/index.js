//sign up
var userName = document.querySelector("#userName");
var userEmail = document.querySelector("#userEmail");
var userPassword = document.querySelector("#userPassword");

// ----------------------------------------------------------------
//Btn
var signInBtn = document.querySelector("#signInBtn");
var loginBtn = document.querySelector("#loginBtn");
var logoutBtn = document.querySelector("#logout");
// ----------------------------------------------------------------
//Form
var createAccountForm = document.querySelector("#createAccount");
var loginForm = document.querySelector("#loginForm");
// ----------------------------------------------------------------
//sign in

var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var userData;
console.log(userName, userEmail, logoutBtn);

if (localStorage.getItem("userData") == null) {
    var userData = [];
} else {
    userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);

}

// if (localStorage.getItem("userData") != null) {
//     var backemail = JSON.parse(localStorage.getItem("userEmail"));
//     console.log(backemail);
//     signinEmail.value = ` ${backemail}`;
//     loginForm.classList.remove("form--hidden");
//     createAccountForm.classList.add("form--hidden");

// } else {
//     signinEmail.value = "";
// }

document.querySelector("#linkCreateAccount").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    createAccountForm.classList.remove("form--hidden");
    removeData();
    document.getElementById("exist").innerHTML =
        '<span class="text-success "></span>';

});

document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
    removeLoginData();
    document.getElementById("incorrect").innerHTML =
        '<span class="text-danger"></span>';
});




function addData() {
    if (checkEmpty() === false) {
        document.getElementById("exist").innerHTML =
            '<span class="text-danger m-3">All inputs is required</span>';
        console.log("input invalid");

        return false;
    }
    if (checkEmailExist() == false) {
        document.getElementById("exist").innerHTML =
            '<span class="text-danger m-3">email already exists</span>';
        return false;

    }

    if (ValidName() && ValidationEmail() && ValidationPass()) {
        console.log("tmam");

        var user = {
            name: userName.value,
            email: userEmail.value,
            password: userPassword.value,
        };
        if (userData.length == 0) {
            userData.push(user);
            localStorage.setItem("userData", JSON.stringify(userData));
            document.getElementById("exist").innerHTML =
                '<span class="text-success m-3">Success</span>';
            loginForm.classList.remove("form--hidden");
            createAccountForm.classList.add("form--hidden");

            return true;
        } else {
            userData.push(user);
            localStorage.setItem("userData", JSON.stringify(userData));
            document.getElementById("exist").innerHTML =
                '<span class="text-success m-3">Success</span>';
            removeData();
            loginForm.classList.remove("form--hidden");
            createAccountForm.classList.add("form--hidden");

        }
    } else {
        document.getElementById("exist").innerHTML =
            '<span class="text-danger m-3">Invalid Information</span>';
    }
}


function removeData() {
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
}

function removeLoginData() {
    signinEmail.value = "";
    signinPassword.value = "";

}

signInBtn.addEventListener("click", function() {
    addData();


});

function checkEmpty() {
    if (userName.value === "" || userEmail.value == "" || userPassword.value == "") {
        return false;
    } else {
        return true;
    }
}

function isLoginEmpty() {
    if (signinPassword.value == "" || signinEmail.value == "") {
        return false;
    } else {
        return true;
    }
}

function login() {

    if (isLoginEmpty() == false) {
        document.getElementById("incorrect").innerHTML =
            '<span class="text-danger m-3">All inputs is required</span>';
        return false;
    } else {
        var password = signinPassword.value;
        var email = signinEmail.value;
        for (var i = 0; i < userData.length; i++) {
            if (userData[i].email == email && userData[i].password == password) {
                console.log(userData[i].name);

                localStorage.setItem(
                    "userLogin",
                    JSON.stringify(userData[i].name)
                );
                location.href = "./home.html";
            } else {
                document.getElementById("incorrect").innerHTML =
                    '<span class="text-danger m-3">incorrect email or password</span>';
            }


        }
    }
}
loginBtn.addEventListener("click", function() {
    login();
    console.log("hello");
});


function ValidName() {
    var regex = /^[A-Z][a-z]{3,7}$/;
    if (regex.test(userName.value)) {
        console.log("name valid");

        return true
    } else {


        alert("Invalid name");
        return false
    }
}

function ValidationEmail() {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(userEmail.value)) {
        console.log("valid email");

        return true
    } else {
        alert("Invalid email");
        return false
    }
}


function ValidationPass() {
    var regex = /[A-Z][a-z]{3,7}/;
    if (regex.test(userPassword.value)) {
        console.log("valid pass");
        return true
    } else {
        alert("Invalid password");
        return false;
    }
}

function checkEmailExist() {
    for (var i = 0; i < userData.length; i++) {

        if (userData[i].email == userEmail.value) {
            // localStorage.setItem("userEmail", JSON.stringify(userData[i].email));
            // console.log(localStorage.getItem("userEmail"));

            return false;
        }
    }
}

function logout() {
    localStorage.clear;
    location.href = "index.html";
};