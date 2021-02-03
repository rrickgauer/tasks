// input variables
const inputName            = $('#name-new');
const inputDescription     = $('#description-new');
const inputPhone           = $('#phone-new');
const inputAddress1        = $('#address-1-new');
const inputAddress2        = $('#address-2-new');
const inputCity            = $('#city-new');
const inputState           = $('#state-new');
const inputZip             = $('#zip-new');
const inputStartsOn        = $('#starts-on-new');
const inputStartsAt        = $('#starts-at-new');
const inputEndsOn          = $('#ends-on-new');
const inputEndsAt          = $('#ends-at-new');
const inputSeperation      = $('#seperation-new');
const inputFrequency       = $('#frequency-new');
const inputRecurrenceDay   = $('#recurrence-day-new');
const inputRecurrenceWeek  = $('#recurrence-week-new');
const inputRecurrenceMonth = $('#recurrence-month-new');

const btnSubmit = $('#btn-submit-new-event');

const inputClassName = '.event-new-input';

// other shit
const mUser = new User(Common.getUserIdFromLocalStorage());

/***************************************************************************
Main logic
***************************************************************************/
$(document).ready(function() {
    addListeners();
    initFlatpickr();
});


/***************************************************************************
Add all the event listeners to the page.
***************************************************************************/
function addListeners() {
    
    $(btnSubmit).on('click', function() {
        submitNewEvent();
    });

    // submit entry when enter key is hit
    $('.form-event-new').on('keypress', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            submitNewEvent();
        }
    });
    
    
    // submitNewEvent();
    removeInvalidFeedback();
    toggleRecurrenceInputsVisibility();

}

/***************************************************************************
Initialize the date/time inputs to use flatpickr
***************************************************************************/
function initFlatpickr() {
    // time inputs
    $('.event-dates-new .time').flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i:S",
        altInput: true,
        altFormat: "h:i K",
    });
    
    // date inputs
    $('.event-dates-new .date').flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        defaultDate: "today",
    });   
}


/***************************************************************************
Submits a new event to the api.
***************************************************************************/
function submitNewEvent() {
    // make sure all inputs are valid
    if (!areInputsValid()) {
        return;
    }

    let inputValues = getNewEventInputValues();   // retrieve the input values

    // generate and add a UUID for the event
    // const eventUUID = Common.getUUID();
    inputValues.id = Common.getUUID();
    inputValues.recurrence_id = Common.getUUID();
    
    // send the request to the api
    $.ajax({
        headers: {"X-USER-ID" :  mUser.userID},
        url: m_API_EVENTS,
        type: "POST",
        data: inputValues,
        success: submitNewEventSuccess,
        error: submitNewEventError,
    });

}


/***************************************************************************
Validates all the inputs before sending the request to the api.
***************************************************************************/
function areInputsValid() {
    // ensure a name is given
    if ($(inputName).val() == '') {
        // set the error message
        const invalidFeedbackMessage = 'Please enter a name.';
        $(inputName).closest('.form-event-new-group').find('.invalid-feedback').text(invalidFeedbackMessage);
        
        // set the input to invalid to show the message
        $(inputName).addClass('is-invalid');
        
        return false;
    }


    // starts_on must have value
    if ($(inputStartsOn).val() == '') {
        setInputIsInvalid(inputStartsOn);
        return false;
    }

    // ends_on must have value
    if ($(inputEndsOn).val() == '') {
        setInputIsInvalid(inputEndsOn);
        return false;
    }


    // ends on must be >= starts on
    const dateStartsOn = new Date($(inputStartsOn).val());
    const dateEndsOn = new Date($(inputEndsOn).val());
    if (dateEndsOn < dateStartsOn) {
        setInputIsInvalid(inputEndsOn, 'Must be on or after Starts on');
        return false;
    }


    // if frequency is not once, seperation must have a value greater than 0
    const inputFrequencyValue = $(inputFrequency).find('option:selected').val();
    if (inputFrequencyValue != m_EVENT_FREQUENCY_VALUES.ONCE) {
        const seperationValue = $(inputSeperation).val();

        if (seperationValue == '') {
            setInputIsInvalid(inputSeperation);
            return false;
        }

        else if (parseInt(seperationValue) < 1) {
            setInputIsInvalid(inputSeperation, 'Must be greater than 0.');
            return false;
        }
    }

    // if freq is weekly day must have a value between 0-6
    const recurrenceDayValue = $(inputRecurrenceDay).val();
    if (inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.WEEKLY) {
        // no value
        if (recurrenceDayValue == '') {
            setInputIsInvalid(inputRecurrenceDay);
            return false;
        }

        // value is not within 0-6
        else if (parseInt(recurrenceDayValue) > 6 || parseInt(recurrenceDayValue) < 0) {
            setInputIsInvalid(inputRecurrenceDay, 'Must be between 0-6');
            return false;
        }
    }


    const recurrenceWeekValue = $(inputRecurrenceWeek).val();
    if (inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.MONTHLY || inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.YEARLY) {
        // no day value
        if (recurrenceDayValue == '') {
            setInputIsInvalid(inputRecurrenceDay);
            return false;
        }

        // if week is null, day must be between 1-31
        if (recurrenceWeekValue == '' && recurrenceDayValue != '') {
            if (parseInt(recurrenceDayValue) > 31 || parseInt(recurrenceDayValue) < 1) {
                setInputIsInvalid(inputRecurrenceDay, 'Must be within 1-31');
                return false;   
            }
        }

        // if week and day have values:
        // week must be between 1-4
        // day must be within 0-6
        if (recurrenceDayValue != '' && recurrenceWeekValue != '') {
            // check day
            if (parseInt(recurrenceDayValue) > 6 || parseInt(recurrenceDayValue) < 0) {
                setInputIsInvalid(inputRecurrenceDay, 'Must be within 0-6');
                return false;            
            }
            // check week
            if (parseInt(recurrenceWeekValue) > 4 || parseInt(recurrenceWeekValue) < 1) {
                setInputIsInvalid(inputRecurrenceWeek, 'Must be within 1-4');
                return false;             
            }
        }
    }

    const recurrenceMonthValue = $(inputRecurrenceMonth).val();

    // if freq is YEARLY and month input has a value
    // month must be within 1-12
    if (inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.YEARLY && recurrenceMonthValue != '') {
        if (parseInt(recurrenceMonthValue) > 12 || parseInt(recurrenceMonthValue) < 1) {
            setInputIsInvalid(inputRecurrenceMonth, 'Must be within 1-12');
            return false; 
        }
    }

    return true;
}

/***************************************************************************
Sets the text of an input's error message section.
Then, sets the input to invalid.
***************************************************************************/
function setInputIsInvalid(elementName, errorMessage) {
    if (errorMessage == undefined) {
        errorMessage = 'Required';
    }

    if ($(elementName).closest('.form-group').find('.invalid-feedback').length < 1) {
        $(elementName).closest('.form-group').append('<div class="invalid-feedback"></div>');
    }

    $(elementName).closest('.form-group').find('.invalid-feedback').text(errorMessage)
    $(elementName).closest('.form-group').find('input').addClass('is-invalid');
    $(elementName).addClass('is-invalid');
}


/***************************************************************************
Remove the class is-invalid from an input when it is changed.
***************************************************************************/
function removeInvalidFeedback() {
    $(inputClassName).on('change keydown', function() {

        if ($(this).hasClass('is-invalid')) {
            $(this).removeClass('is-invalid');
        } else {
            $(this).closest('.form-group').find('input').removeClass('is-invalid');
        }
    });
}


/***************************************************************************
Returns a dictionary structure of all the input parms.
***************************************************************************/
function getNewEventInputValues() {
    
    // get the inital input values
    const inputValues = {
        name:               $(inputName).val(),
        description:        $(inputDescription).val(),
        phone_number:       $(inputPhone).val(),
        location_address_1: $(inputAddress1).val(),
        location_address_2: $(inputAddress2).val(),
        location_city:      $(inputCity).val(),
        location_state:     $(inputState).val(),
        location_zip:       $(inputZip).val(),
        starts_on:          $(inputStartsOn).val(),
        starts_at:          $(inputStartsAt).val(),
        ends_on:            $(inputEndsOn).val(),
        ends_at:            $(inputEndsAt).val(),
        frequency:          $(inputFrequency).val(),
        seperation:         $(inputSeperation).val(),
        recurrence_day:     $(inputRecurrenceDay).val(),
        recurrence_week:    $(inputRecurrenceWeek).val(),
        recurrence_month:   $(inputRecurrenceMonth).val(),
    }
    
    
    // loop through the dictionary and change all empty strings to nulls
    const keys = Object.keys(inputValues);
    
    for (let count = 0; count < keys.length; count++) {
        const theKey = keys[count];         // current key
        
        if (inputValues[theKey] == '') {    // empty string
            inputValues[theKey] = null;
        }
    }
    
    return inputValues;
}


/***************************************************************************
Action to take when submitting a new event is successful.
***************************************************************************/
function submitNewEventSuccess(responseData, textStatus, xhr) {
    console.log(responseData);
}

/***************************************************************************
Action to take when submitting a new event returns an error.
***************************************************************************/
function submitNewEventError(response) {
    console.error(response.responseText);
}


/***************************************************************************
Toggles the recurrence inputs visibility depending on which frequency
the input was changed to.
***************************************************************************/
function toggleRecurrenceInputsVisibility() {
    $(inputFrequency).on('change', function() {
        const inputFrequencyValue = $(inputFrequency).find('option:selected').val();

        // clear and hide all the recurrence inputs initiallly
        $('.event-new-input.recurrence').val('');
        $('.event-new-input.recurrence').addClass('d-none');
        
        // if the frequency was set to once, hide the seperation and exit
        if (inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.ONCE) {
            $(inputSeperation).addClass('d-none');
            $(inputSeperation).val('1');
            return;
        } else {
            $(inputSeperation).removeClass('d-none');
        }


        if (inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.WEEKLY) {
            $(inputRecurrenceDay).removeClass('d-none');            // show day
        } 
        else if (inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.MONTHLY) {
            $(inputRecurrenceDay).removeClass('d-none');            // show day
            $(inputRecurrenceWeek).removeClass('d-none');           // show week
        } 
        else if (inputFrequencyValue == m_EVENT_FREQUENCY_VALUES.YEARLY) {
            $('.event-new-input.recurrence').removeClass('d-none'); // show all
        }
    });


}


