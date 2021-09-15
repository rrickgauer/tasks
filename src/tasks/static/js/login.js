/* module variables */
const inputEmail    = $('#login-email');
const inputPassword = $('#login-password');
const btnLogin      = $('#btn-login');


/**********************************************************
Main function
**********************************************************/
$(document).ready(function() {
    console.log(window.localStorage);
    addEventListeners();
});


/**********************************************************
Add all the event listeners to the page
**********************************************************/
function addEventListeners() {
    $(btnLogin).on('click', loginAttmempt);
    
    $('.form-control').on('keypress', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            loginAttmempt();
        }
    });
    
    removeInvalidDisplaysOnKeyDown();
}


/**********************************************************
Removes the class 'is-invalid' from an input when the user types into it.
**********************************************************/
function removeInvalidDisplaysOnKeyDown() {
    $('.form-group input').on('keydown', function() {
        $(this).removeClass('is-invalid');
    });
}


/**********************************************************
User has attempted to log in to the system.

Send a request to the api to validate the email and password 
are a match.
**********************************************************/
function loginAttmempt() {
    // show the loading button
    enableLoginLoadingButton();
    
    // validate the inputs
    if (!validateLoginInputs()) {
        disableLoginLoadingButton();
        return;
    }
    
    let email = getEmailInput();
    let password = getPasswordInput();
    
    // send the request to the api
    $.ajax({
        url: Constants.API_URLS.USERS,
        type: "get",
        data: {
            email: email,
            password: password,
        },
        
        success: loginSuccessful,
        error: loginUnsuccessful,
    });
    
    disableLoginLoadingButton();
    
}


/**********************************************************
Disables the login button and shows the spinner.
**********************************************************/
function enableLoginLoadingButton() {
    const btnHtml = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Loading...';
    
    $(btnLogin).html(btnHtml);
    
    $(btnLogin).prop('disabled', true);
}


/**********************************************************
Returns the login button back to its normal state.
**********************************************************/
function disableLoginLoadingButton() {
    $(btnLogin).html('Log in');
    
    $(btnLogin).prop('disabled', false);
}


/**********************************************************
Validates all the inputs required before sending a login 
request to the api.
**********************************************************/
function validateLoginInputs() {
    
    // ensure the email input has a value in it
    if ($(inputEmail).val() == '') {
        $(inputEmail).closest('.form-group').find('.invalid-feedback').text('Please enter your email.');
        $(inputEmail).addClass('is-invalid');
        return false;
    }
    
    // ensure the password input has a value in it
    if ($(inputPassword).val() == '') {
        $(inputPassword).closest('.form-group').find('.invalid-feedback').text('Please enter your password.');
        $(inputPassword).addClass('is-invalid');
        return false;
    }
    
    // everything is okay!
    return true;
}


/**********************************************************
Get the email input value
**********************************************************/
function getEmailInput() {
    return $(inputEmail).val();
}


/**********************************************************
Get the password input value
**********************************************************/
function getPasswordInput() {
    return $(inputPassword).val();
}


/**********************************************************
Steps to take when a log in attempt was successful
**********************************************************/
function loginSuccessful(apiResponse) {
    window.localStorage.setItem('userID', JSON.parse(apiResponse).id);    
    window.location.href = 'home.php';
}


/**********************************************************
Steps to take when a log in attempt was not successful
**********************************************************/
function loginUnsuccessful() {
    $('.form-group .invalid-feedback').text('');
    
    $(inputPassword).closest('.form-group').find('.invalid-feedback').text('Email or password is incorrect.');
    
    $('.form-group input').addClass('is-invalid');
}








