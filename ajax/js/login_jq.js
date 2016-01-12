//TODO:FORMS VALIDATION!

//listeners
$(document).ready(function () {
    $("#login-button").bind("click", signIn);
    $("#new-user-button").bind("click", newUserFormShow);
    $("#registration-button").bind("click", register);
});

//document objects
var objects = {
    serverLogin: "http://ft.oweather.net/api/auth/login",
    serverSignUp: "http://ft.oweather.net/api/auth/signup",
    formSignIn: $("#form-signin"),
    formSignUp: $("#form-signup"),
    mail: $("#inputEmail"),
    pass: $("#inputPassword"),
    loginButton: $("#login-button"),
    newUserButton: $("#new-user-button"),
    newMail: $("#newUserMail"),
    newPassword: $("#newUserPassword"),
    newPasswordEq: $("#newUserPasswordEq"),
    mainNavBar: $("#main_navbar")
};

objects.mail.val("juff@ukr.net");
objects.pass.val("Lammer48");


function register() {
    var pass1 = objects.newPassword.val();
    var pass2 = objects.newPasswordEq.val();

    if (pass1 != null && pass2 != null && objects.newMail != null && pass1.localeCompare(pass2) == 0 && mailValidation(objects.newMail.val())) {
        //json object
        var newLogin_data = {
            "email": objects.newMail.val(),
            "password": objects.newPassword.val()
        };

        //ajax request
        $.ajax({
            url: objects.serverSignUp,
            type: "POST",
            data: JSON.stringify(newLogin_data),
            crossDomain: true,
            contentType: "application/json",
            success: functionOnSuccess
        });


        //on success
        function functionOnSuccess(data) {
            if (data.error == null) {
                alert("Confirmation send to your mail!");
                loginFormShow();
            }
            else {
                parseObj(data)
            }
            //TODO:error handler, confirmation of seccess
        }

    } else {
        //TODO:password alert
    }
}


//sing in function
function signIn() {

    //json object request
    var login_data = {
        "email": objects.mail.val(),
        "password": objects.pass.val()
    };

    //ajax request
    $.ajax({
        url: objects.serverLogin,
        type: "POST",
        data: JSON.stringify(login_data),
        crossDomain: true,
        contentType: "application/json",
        success: functionOnSuccess
    });

    //on success
    function functionOnSuccess(data) {
        var response = data;
        if (response.error == null) {
            var token = response.token;
            localStorage.setItem("token", token);
        } else {
            parseObj(response[error]);
            //TODO: error handler
        }

    }

}


//////////////////////////////UTILS/////////////////////////////////

function loginFormShow() {
    //change form
    objects.formSignUp.hide();
    objects.formSignIn.show("fast");

}

//new user function
function newUserFormShow() {
    //change form
    objects.formSignIn.hide();
    objects.formSignUp.show("fast");
    //visibility correction =)
    objects.newPasswordEq.css("margin-top", "-11px");
}
//Simple parsing

function parseObj(object) {

    for (var key in object) {

        if (typeof object[key] == "object") {
            console.log(key);
            parseObj(object[key])
        } else {
            console.log((typeof object[key]) + " " + key + ": " + object[key]);
        }
    }
}

function mailValidation(mail) {
    //return true when valid, false when invalid
    //TODO: make validator
    return true;
}