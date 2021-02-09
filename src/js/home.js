/**********************************************************
Module variables
**********************************************************/

let m_User = null;
const m_WeekDates = new WeekDates();


/**********************************************************
Main logic
**********************************************************/
$(document).ready(function() {
    setUser();

    getEventsInRange(m_WeekDates.first.toSQLDate(), m_WeekDates.last.toSQLDate(), displayWeeklyEvents);

    $("#nav-item-home").addClass('active');

});

/**********************************************************
Loads the user object.

If no user id is set in local storage, go to the login page.
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



/**********************************************************
Takes a week's worth of event recurrences received from the
API and displays them for viewing.
**********************************************************/
function displayWeeklyEvents(a_events) {
    const vRecurrencesSun   = new DailyRecurrences(m_WeekDates.getDateInTheWeek(0));
    const vRecurrencesMon   = new DailyRecurrences(m_WeekDates.getDateInTheWeek(1));
    const vRecurrencesTues  = new DailyRecurrences(m_WeekDates.getDateInTheWeek(2));
    const vRecurrencesWed   = new DailyRecurrences(m_WeekDates.getDateInTheWeek(3));
    const vRecurrencesThurs = new DailyRecurrences(m_WeekDates.getDateInTheWeek(4));
    const vRecurrencesFri   = new DailyRecurrences(m_WeekDates.getDateInTheWeek(5));
    const vRecurrencesSat   = new DailyRecurrences(m_WeekDates.getDateInTheWeek(6));


    // put each event into its related day bucket
    for (let count = 0; count < a_events.length; count++) {
        const thisEvent = a_events[count];
        const thisEventWeekday = DateTime.fromSQL(thisEvent.occurs_on).weekday;

        switch (thisEventWeekday) {
            case 0:
                vRecurrencesSun.addEventRecurrence(thisEvent);
                break;
            case 1:
                vRecurrencesMon.addEventRecurrence(thisEvent);
                break;
            case 2:
                vRecurrencesTues.addEventRecurrence(thisEvent);
                break;
            case 3:
                vRecurrencesWed.addEventRecurrence(thisEvent);
                break;
            case 4:
                vRecurrencesThurs.addEventRecurrence(thisEvent);
                break;
            case 5:
                vRecurrencesFri.addEventRecurrence(thisEvent);
                break;
            case 6:
                vRecurrencesSat.addEventRecurrence(thisEvent);
                break;
        }
    }


    // combine all of the html for each of the days
    let html = vRecurrencesSun.getHtml() + vRecurrencesMon.getHtml();
    html += vRecurrencesTues.getHtml() + vRecurrencesWed.getHtml();
    html += vRecurrencesThurs.getHtml() + vRecurrencesFri.getHtml();
    html += vRecurrencesSat.getHtml();

    // add the html to the view
    $('.recurrences-board .recurrences').html(html);
}

