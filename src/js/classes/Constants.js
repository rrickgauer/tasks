const m_API = 'http://localhost/files/api.tasks/src/main.php';
const m_API_EVENTS = m_API + '/events';
const m_API_RECURRENCES = m_API + '/recurrences';


const API_RETURN_CODES = {
    Email_Is_Taken: 100,
}

const m_EVENT_FREQUENCY_VALUES = {
    ONCE: 'ONCE',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
    YEARLY: 'YEARLY',
}


const DateTime = luxon.DateTime;