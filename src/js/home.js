let theUser = null;


/**********************************************************
Main logic
**********************************************************/
$(document).ready(function() {

    // be sure the user's id is set
    if (!isUserIdSet()) {
        window.location.href = 'login.php';
    }

    theUser = new User(window.localStorage.getItem('userID'));

    $("#nav-item-home").addClass('active');
});

/**********************************************************
Checks the localStorage if the userID is set.
**********************************************************/
function isUserIdSet() {
    if (window.localStorage.getItem('userID') == null) {
        return false;
    } else {
        return true;
    }
}



