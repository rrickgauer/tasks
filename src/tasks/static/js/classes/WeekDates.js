/**********************************************************************************************************************
WeekDates

This class' purpose is to retrieve the first and last days of either a current week,
or of the week of the date supplied.

Properties:
    - current
    - first
    - last
**********************************************************************************************************************/

class WeekDates {

    /*************************************************
    Constructor
    *************************************************/
    constructor(a_currentDate) {
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
    setFirstAndLastDates() {
        this.first = this.getFirstDateInWeek(this.current);
        this.last = this.getLastDateInWeek(this.current);
    }


    /*************************************************
    Increases the current date by the number of weeks
    provided.
    
    Default is 1 week
    *************************************************/
    increaseCurrentWeek(a_numWeeks = 1) {
        // increase the current date by the number of weeks
        this.current = this.current.plus({ weeks: a_numWeeks });

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
    decreaseCurrentWeek(a_numWeeks = 1) {
        // make the number negative
        let decreaseWeeks = a_numWeeks * -1;

        this.increaseCurrentWeek(decreaseWeeks);
    }


    /*************************************************
    Returns the frist day in the week (Sunday) that
    falls within the week of the date supplied.
    *************************************************/
    getFirstDateInWeek(a_date) {
        let daysDiff = a_date.weekday;

        if (daysDiff == 7) {
            daysDiff = 0;   // luxon uses 7 for sundays
        }

        daysDiff *= -1;

        let dateFirstInWeek = a_date.plus({ days: daysDiff });

        return dateFirstInWeek;
    }


    /*************************************************
    Returns the last day in the week (Saturday) that
    falls within the week of the date supplied.
    *************************************************/
    getLastDateInWeek(a_date) {
        let daysDiff = a_date.weekday;

        if (daysDiff == 7) {
            daysDiff = 0;   // luxon uses 7 for sundays
        }

        daysDiff = 6 - daysDiff;

        let dateLastInWeek = a_date.plus({ days: daysDiff });

        return dateLastInWeek;
    }

    /*************************************************
    Returns the date for the weekday number passed in.

    0 = Sunday's date
    1 = Monday's date
    ...
    6 = Saturday's date
    *************************************************/
    getDateInTheWeek(a_weekdayNum) {
        // make sure the weekday falls within 0-6
        if (a_weekdayNum > 6 || a_weekdayNum < 0) {
            return null;
        }

        let firstDate = this.first;
        let dateInWeek = firstDate.plus({days: a_weekdayNum});

        return dateInWeek;
    }

    /*************************************************
    Returns first property as an SQL string - YYYY-MM-DD
    *************************************************/
    getFirstString() {
        return this.first.toSQLDate();
    }

    /*************************************************
    Returns last property as an SQL string - YYYY-MM-DD
    *************************************************/
    getLastString() {
        return this.last.toSQLDate();
    }

    /*************************************************
    Returns current property as an SQL string - YYYY-MM-DD
    *************************************************/
    getCurrentString() {
        return this.current.toSQLDate();
    }

    /*************************************************
    Returns today's date
    *************************************************/
    static getTodaysDate() {
        return DateTime.local();
    }


}










