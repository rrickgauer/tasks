let mUser = null;
let firstDateInCurrentWeek = null;
let lastDateInCurrentWeek = null;


/**********************************************************
Main logic
**********************************************************/
$(document).ready(function() {
    setUser();

    setCurrentDates();
    
    $("#nav-item-home").addClass('active');

    getEventsInRange(firstDateInCurrentWeek.toISODate(), lastDateInCurrentWeek.toISODate(), console.log);
    

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
Sets the module variables related to the first and last
days of the current week.
**********************************************************/
function setCurrentDates() {
    // create the js date objects
    const curr             = new Date;
    firstDateInCurrentWeek = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    lastDateInCurrentWeek  = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

    // convert them into luxon DateTime objects
    firstDateInCurrentWeek = DateTime.fromJSDate(firstDateInCurrentWeek);
    lastDateInCurrentWeek = DateTime.fromJSDate(lastDateInCurrentWeek);
}

/**********************************************************
Makes a request to the api to get all the date occurences
within the range of dates given.
**********************************************************/
function getEventsInRange(startsOn, endsOn, actionSuccess, actionError) {
    
    if (actionSuccess == undefined) {
        actionSuccess = function(response, textStatus, xhr) {
            console.log(JSON.parse(response));
        }
    }

    if (actionError == undefined) {
        actionError = function(response) {
            console.error(response.responseText);
        }
    }

    const dateRanges = {
        starts_on: startsOn,
        ends_on: endsOn,
    }
    
    // send the request to the api
    $.ajax({
        headers: {"X-USER-ID" :  mUser.userID},
        url: m_API_EVENTS,
        type: "GET",
        data: dateRanges,
        success: actionSuccess,
        error: actionError,
    });
}





