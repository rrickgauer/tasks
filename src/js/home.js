let mUser = null;
let firstDateInCurrentWeek = null;
let lastDateInCurrentWeek = null;

const weekDates = new WeekDates();


/**********************************************************
Main logic
**********************************************************/
$(document).ready(function() {
    setUser();

    $("#nav-item-home").addClass('active');
});

/**********************************************************
Loads the user object.

If no user id is set in local storage, go to the login 
page.
**********************************************************/
function setUser() {
    // be sure the user's id is set
    if (!Common.isUserIdSet()) {
        window.location.href = 'login.php';
    }

    mUser = new User(window.localStorage.getItem('userID'));
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
Makes a request to the api to get all the date occurences
within the range of dates given.
**********************************************************/
function getEventsInRange(a_startsOn, a_endsOn, a_actionSuccess, a_actionError) {
    // actions to take if request was successful
    if (a_actionSuccess == undefined) {
        a_actionSuccess = function(response, textStatus, xhr) {
            console.log(JSON.parse(response));
        }
    }

    // actions to take if request was successful
    if (a_actionError == undefined) {
        a_actionError = function(response) {
            console.error(response.responseText);
        }
    }

    if (a_startsOn)

    // set the date ranges
    const dateRanges = {
        starts_on: a_startsOn,
        ends_on: a_endsOn,
    }
    
    // send the request to the api
    $.ajax({
        headers: {"X-USER-ID" :  mUser.userID},
        url: m_API_RECURRENCES,
        type: "GET",
        data: dateRanges,
        success: a_actionSuccess,
        error: a_actionError,
    });
}





