const DateTime = luxon.DateTime;

class Constants {

}


Constants.API = '/api';

Constants.API_URLS = {
    EVENTS: Constants.API + '/events',
    RECURRENCES: Constants.API + '/recurrences',
    ACCOUNT: Constants.API + '/account',
    LOGIN: Constants.API + '/login',
    COMPLETIONS: Constants.API + '/completions',
};

Constants.API_RETURN_CODES = {
    Email_Is_Taken: 100,
}

Constants.EVENT_FREQUENCY_VALUES = {
    ONCE: 'ONCE',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY',
}

Constants.WEEKDAY_VALUES = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
}




