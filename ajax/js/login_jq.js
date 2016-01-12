//TODO:FORMS VALIDATION!

//listeners
$(document).ready(function () {
    $("#login-button").bind("click", signIn);
    $("#new-user-button").bind("click", newUserFormShow);
    $("#registration-button").bind("click", register);
    $("#logout").bind("click", logOut);
    $("#change_password").bind("click", changePasswordFormShow);
    $("#change-password-button").bind("click", changePassword);
    $("#cancel-button").bind("click", cancelRegistration);


    if (localStorage.getItem("token") != null) {
        mainNavBarShow();

    } else {
        loginFormShow();
    }
});

//document objects
var objects = {
    serverLogin: "http://ft.oweather.net/api/auth/login",
    serverSignUp: "http://ft.oweather.net/api/auth/signup",
    serverLogOut: "http://ft.oweather.net/api/auth/logout",
    serverChangepsw: "http://ft.oweather.net/api/auth/changepsw",
    formSignIn: $("#form-signin"),
    formSignUp: $("#form-signup"),
    formChangePassword: $("#form-change-password"),
    mail: $("#inputEmail"),
    pass: $("#inputPassword"),
    loginButton: $("#login-button"),
    newUserButton: $("#new-user-button"),
    newMail: $("#newUserMail"),
    newPassword: $("#newUserPassword"),
    newPasswordEq: $("#newUserPasswordEq"),
    mainNavBar: $("#main_navbar"),
    newUserPasswordChange: $("#newUserPassword_change"),
    newUserPasswordEqChange: $("#newUserPasswordEq_change")
};

//TODO:remove this)
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
            //TODO:error handler, confirmation of success
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
            mainNavBarShow();
            hideForms();

        } else {
            parseObj(response[error]);
            //TODO: error handler
        }

    }

}

function logOut() {

    var tokenObject = {
        token: localStorage.getItem("token")
    }


    $.ajax({
        url: objects.serverLogOut,
        headers: {
            'X-Auth-Token': localStorage.getItem("token")
        },
        type: "GET",
        data: JSON.stringify(tokenObject),
        crossDomain: true,
        contentType: "application/json",
        success: functionOnSuccess
    });

    function functionOnSuccess(data) {
        parseObj(data);
    }

    localStorage.removeItem("token");
    mainNavBarHide();
    changePasswordFormHide();
    loginFormShow();
}

function changePassword() {

    changePasswordFormShow();
    objects.formChangePassword.css("padding-top","80px");

    var pass1 = objects.newUserPasswordChange.val();
    var pass2 = objects.newUserPasswordEqChange.val();

    if (pass1 != null && pass2 != null && pass1.localeCompare(pass2) == 0) {

        //json object
        var changePasswordData = {
            "newPassword": pass1
        };

        console.log(changePasswordData.newPassword);

        //ajax request
        $.ajax({
            url: objects.serverChangepsw,
            headers: {
                'X-Auth-Token': localStorage.getItem("token")
            },
            type: "POST",
            data: JSON.stringify(changePasswordData),
            crossDomain: true,
            contentType: "application/json",
            success: functionOnSuccess
        });


        //on success
        function functionOnSuccess(data) {
            if (data.error == null) {
                alert("Confirmation send to your mail!");
                changePasswordFormHide();
            }
            else {
                parseObj(data)
            }
            //TODO:error handler, confirmation of success
        }

    } else {
        //TODO:password alert
    }

 }

function cancelRegistration(){
    hideForms();
    loginFormShow();
}
//////////////////////////////UTILS/////////////////////////////////

function hideForms() {
    objects.formSignUp.hide();
    objects.formSignIn.hide();
    objects.formChangePassword.hide();
}

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

function mainNavBarShow() {
    objects.mainNavBar.show();
}

function mainNavBarHide() {
    objects.mainNavBar.hide();
}

function changePasswordFormShow() {

    objects.formChangePassword.show();
}

function changePasswordFormHide() {
    objects.formChangePassword.hide();
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