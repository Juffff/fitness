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
    newPasswordEq: $("#newUserPasswordEq")
};

//new user function
function newUserFormShow() {
    //change form
    objects.formSignIn.replaceWith(objects.formSignUp);
    objects.formSignUp.show("fast");
    //visibility correction =)
    objects.newPasswordEq.css("margin-top", "-11px");

}

function register() {
    var a = objects.newPassword.val();

    var b = objects.newPasswordEq.val();

    if (a != null && b != null && objects.newMail != null && a.localeCompare(b) == 0 && mailValidation(objects.newMail)) {
        //json object
        var newLogin_data = {
            "email": objects.newMail.val,
            "password": objects.newPassword.val
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
            /*$("#reply").text(data);*/
            alert(data);
        }

    } else {
        //TODO:password alert
    }
}

function mailValidation(mail) {
    //return true when valid, false when invalid
    //TODO: make validator
    return true;
}

//sing in function
function signIn() {

    // var serverLogin = "http://localhost:8080";

    //json object
    var login_data = {
        "email": objects.mail.val,
        "password": objects.pass.val
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
        /*$("#reply").text(data);*/
        alert(data);
    }


}