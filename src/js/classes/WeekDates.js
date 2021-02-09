/**********************************************************************************************************************
WeekDates

This class' purpose is to retrieve the first and last days of either a current week,
or of the week of the date supplied.
**********************************************************************************************************************/


/*************************************************
Constructor
*************************************************/
function WeekDates(a_currentDate) {
    // initalize the properties
    this.current = null;
    this.first = null;
    this.last = null;


    // If a date is not supplied, then set it to the current date
    if (a_currentDate == undefined) {
        this.current = DateTime.local();
    } else {
        this.current = a_currentDate;
    }

    // set the first and last days
    this.setFirstAndLastDates();
}

/*************************************************
Sets the object's first and last fields based on 
the current date.
*************************************************/
WeekDates.prototype.setFirstAndLastDates = function() {
    this.first = this.getFirstDateInWeek(this.current);
    this.last = this.getLastDateInWeek(this.current);
}


/*************************************************
Increases the current date by the number of weeks
provided.

Default is 1 week
*************************************************/
WeekDates.prototype.increaseCurrentWeek = function(a_numWeeks = 1) {
    // increase the current date by the number of weeks
    this.current = this.current.plus({weeks: a_numWeeks}); 

    // reset the first and last days in the week
    this.setFirstAndLastDates();
}

/*************************************************
Decreases the current date by the number of weeks
provided.

This function simply makes the input negative,
then calls increaseCurrentWeek().

Default is 1 week
*************************************************/
WeekDates.prototype.decreaseCurrentWeek = function(a_numWeeks = 1) {
    // make the number negative
    decreaseWeeks = a_numWeeks * -1;

    this.increaseCurrentWeek(decreaseWeeks);
}


/*************************************************
Returns the frist day in the week (Sunday) that
falls within the week of the date supplied.
*************************************************/
WeekDates.prototype.getFirstDateInWeek = function(a_date) {
    let daysDiff = (a_date.weekday) * -1;
    
    let dateFirstInWeek = a_date.plus({days: daysDiff});

    return dateFirstInWeek;
}

/*************************************************
Returns the last day in the week (Saturday) that
falls within the week of the date supplied.
*************************************************/
WeekDates.prototype.getLastDateInWeek = function(a_date) {
    let daysDiff = 6 - a_date.weekday;

    let dateLastInWeek = a_date.plus({days: daysDiff});

    return dateLastInWeek;
}



