let m_User = null;
const m_WeekDates = new WeekDates();


/**********************************************************
Main logic
**********************************************************/
$(document).ready(function() {
    setUser();

    getEventsInRange(m_WeekDates.first.toSQLDate(), m_WeekDates.last.toSQLDate());

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

    m_User = new User(window.localStorage.getItem('userID'));
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
    // verify the start and end dates are set
    if (a_startsOn == undefined) {
        console.error('getEventsInRange() - needs start date');
        return;
    } else if (a_endsOn == undefined) {
        console.error('getEventsInRange() - needs ends date');
        return;
    }

    // actions to take if request was successful
    if (a_actionSuccess == undefined) {
        a_actionSuccess = function(response, textStatus, xhr) {
            // console.log(JSON.parse(response));
            console.log(response);
        }
    }

    // actions to take if request was successful
    if (a_actionError == undefined) {
        a_actionError = function(response) {
            console.error(response.responseText);
        }
    }

    // set the date ranges
    const dateRanges = {
        starts_on: a_startsOn,
        ends_on: a_endsOn,
    }
    
    // send the request to the api
    $.ajax({
        headers: {"X-USER-ID" :  m_User.userID},
        url: m_API_RECURRENCES,
        type: "GET",
        data: dateRanges,
        success: a_actionSuccess,
        error: a_actionError,
    });
}




function displayWeeklyEvents(a_events) {

    


}





