/**********************************************************
Module variables
**********************************************************/
const inputEmail       = $('#new-email');
const inputPassword1   = $('#new-password-1');
const inputPassword2   = $('#new-password-2');
const btnCreateAccount = $('#btn-create-account');


/**********************************************************
Main logic
**********************************************************/
$(document).ready(function() {
    addEventListeners();
});


/**********************************************************
Adds all the event listeners.
**********************************************************/
function addEventListeners() {
    createAccount();
    clearInvalidFeedbackClasses();
}


/**********************************************************
Create new account
**********************************************************/
function createAccount() {
    $(btnCreateAccount).on('click', function() {
        // disable the 'create account' button
        enableLoginLoadingButton();

        // verify inputs are filled in and matching
        if (!areInputsValid()) {
            disableLoginLoadingButton();
            return;
        }

        // retrieve the input values
        const email = $(inputEmail).val();
        const password = $(inputPassword1).val();

        // send the request to the api
        $.ajax({
            url: m_API + '/users',
            type: "post",
            data: {
                email: email,
                password: password,
            },

            success: loginSuccessful,
            error: loginUnsuccessful,
        });

        // clear the loading spinner and enable the 'create account' button
        disableLoginLoadingButton();
    });
}



/**********************************************************
Disables the login button.
Shows the spinner
**********************************************************/
function enableLoginLoadingButton() {
    const btnHtml = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Loading...';

    $(btnCreateAccount).html(btnHtml);

    $(btnCreateAccount).prop('disabled', true);
}


/**********************************************************
Returns the login button back to its normal state
**********************************************************/
function disableLoginLoadingButton() {
    $(btnCreateAccount).html('Create account');

    $(btnCreateAccount).prop('disabled', false);
}


/**********************************************************
Validates all the inputs before sending data to the api.
- Checks if all the inputs have a value
- Checks if passwords match
**********************************************************/
function areInputsValid() {
    // check if email has a value
    if ($(inputEmail).val() == '') {
        $(inputEmail).closest('.form-group').find('.invalid-feedback').text('Please enter an email.');
        $(inputEmail).addClass('is-invalid');

        return false;
    }

    // check if password1 has a value
    if ($(inputPassword1).val() == '') {
        $(inputPassword1).closest('.form-group').find('.invalid-feedback').text('Please enter a password.');
        $(inputPassword1).addClass('is-invalid');

        return false;
    }

    // check if password2 has a value
    if ($(inputPassword2).val() == '') {
        $(inputPassword2).closest('.form-group').find('.invalid-feedback').text('Please enter a password.');
        $(inputPassword2).addClass('is-invalid');

        return false;
    }


    // check that passwords match
    if ($(inputPassword1).val() != $(inputPassword2).val()) {
        $(inputPassword2).closest('.form-group').find('.invalid-feedback').text('Passwords do not match.');
        $(inputPassword2).addClass('is-invalid');

        return false;
    }

    return true;
}


/**********************************************************
Clears the 'invalid-feedback' class from the inputs
when the user starts typing on it.
**********************************************************/
function clearInvalidFeedbackClasses() {
    $('.new-account-input').on('keydown', function() {
        $(this).removeClass('is-invalid');
    });
}


/**********************************************************
Steps to take when a log in attempt was successful
**********************************************************/
function loginSuccessful(apiResponse) {
    window.localStorage.setItem('userID', apiResponse.id);
    window.location.href = 'home.php';
}


/**********************************************************
Steps to take when a log in attempt was not successful
**********************************************************/
function loginUnsuccessful(apiResponse) {
    // default error message
    let errorMessage = 'Error. Your account was not created. Please try again.';

    // email has already been taken
    if (apiResponse.responseJSON.errorNumber == API_RETURN_CODES.Email_Is_Taken) {
        errorMessage = 'The email you have entered has already been taken.';
    }

    $(inputPassword2).closest('.form-group').find('.invalid-feedback').text(errorMessage);
    $('.new-account-input').addClass('is-invalid');

    console.log(apiResponse.responseJSON);
}


