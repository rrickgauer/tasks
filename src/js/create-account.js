
const inputEmail = $('#new-email');
const inputPassword1 = $('#new-password-1');
const inputPassword2 = $('#new-password-2');
const btnCreateAccount = $('#btn-create-account');


/**
 * Main
 */
$(document).ready(function() {
    addEventListeners();


   

});

/**
 * Adds all the event listeners.
 */
function addEventListeners() {
    createAccount();
    clearInvalidFeedbackClasses();
}


/**
 * Create a new account
 */
function createAccount() {

    $(btnCreateAccount).on('click', function() {

        // verify inputs
        if (!areInputsValid()) {
            return;
        }


    });
}

/**
 * validates all the inputs before sending data to the api.
 * 
 * Checks if all inputs have a value.
 * Checks if passwords match.
 */
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


/**
 * Clear the 'invalid-feedback' class from the inputs when 
 * the user starts typing on it.
 */
function clearInvalidFeedbackClasses() {
    $('.form-group input').on('keydown', function() {
        $(this).removeClass('is-invalid');
    });
}


















