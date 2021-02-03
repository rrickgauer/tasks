let theUser = null;


/**********************************************************
Main logic
**********************************************************/
$(document).ready(function() {
    setUser();
    $("#nav-item-home").addClass('active');

    getCurrentDates();
});

/**********************************************************
Loads the user object.

If no user id is set in local storage, go to the login 
page.
**********************************************************/
function setUser() {
    // be sure the user's id is set
    if (!isUserIdSet()) {
        window.location.href = 'login.php';
    }

    theUser = new User(window.localStorage.getItem('userID'));
}



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


/**********************************************************
Get the first and last dates in the current week.
**********************************************************/
function getCurrentDates() {
    const curr     = new Date;
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    const lastday  = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
}



