var users = [];
checkLocalStorage();


var mainindex = 0;


var Emailvald = document.getElementById("emailInput")
var Passvald = document.getElementById("passInput")
var hello = document.getElementById("hellouser")


//===================== what page are you in ==================================


if (window.location.pathname === "/Login-verify-/index.html") {
    var button = document.querySelector("#submit");
    button.addEventListener("click", signIn)



} else if (window.location.pathname === "/Login-verify-/signUp.html") {
    var btnUp = document.querySelector("#signup")
    btnUp.addEventListener('click', addUser)


} else if (window.location.pathname === "/Login-verify-/home.html") {

    hello.innerHTML = `hello ${users[mainindex].name}`;


} else {


    console.log("You are on an unknown page");
}

//======================================sign in or add user=======================
function signIn() {

    if (sameUser()) {
        window.open("home.html", "_self");
    }
    else if (Emailvald.value == '' || Passvald.value == '') {
        var required = document.querySelector('#required');
        required.classList.replace('d-none', 'd-block');

    }
    else {
        alert("not found please sign in first")

    }
}

function addUser() {
    if (sameUser() == false) {
        if (validEmail() == true && validPassword() == true) {
            var user = {
                name: document.getElementById("nameInput").value,
                email: document.getElementById("emailInput").value,
                pass: document.getElementById("passInput").value,
            }
            users.push(user);
            UpdateData()
            clearForm()
            hiddenIncorrect()

        }
        else if (Emailvald.value == '' || Passvald.value == '') {
            var required = document.querySelector('#required');
            required.classList.replace('d-none', 'd-block');

        }
        else {
            showIncorrect()
        }
    }
    else if (Emailvald.value == '' || Passvald.value == '') {
        var required = document.querySelector('#required');
        required.classList.replace('d-none', 'd-block');

    }
    else {
        //the email use before or not
        var same = document.querySelector('#same');
        same.classList.replace('d-none', 'd-block');
    }

}

// ================================++++++++===================================
function validEmail() {
    var Emailvald = document.getElementById("emailInput").value
    var regxEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z_\-\.]+)\.([a-zA-Z]{2,5})$/g;

    return regxEmail.test(Emailvald)
}
function validPassword() {
    var Passvald = document.getElementById("passInput").value
    var regxPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

    return regxPass.test(Passvald)
}
function UpdateData() {
    localStorage.setItem("userfile", JSON.stringify(users))

}
function clearForm() {
    document.getElementById("emailInput").value = ""
    document.getElementById("passInput").value = ""
    document.getElementById("nameInput").value = ""

}
function checkLocalStorage() {
    if (localStorage.getItem("userfile") != null) {
        users = JSON.parse(localStorage.getItem("userfile"));
    }
}

function hiddenIncorrect() {
    var incorrect = document.querySelector('#incorrect');
    incorrect.classList.replace('d-block', 'd-none');
}
function showIncorrect() {
    var incorrect = document.querySelector('#incorrect');
    incorrect.classList.replace('d-none', 'd-block');
}

function sameUser() {
    var uservalid = document.getElementById("emailInput").value;
    for (var index = 0; index < users.length; index++) {
        if (users[index].email.toLowerCase().includes(uservalid.toLowerCase())) {
            mainindex = index;

            return true;
        }
    }
    return false;
}

