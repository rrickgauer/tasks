/**********************************************************************************************************************
ModalEvent

This class holds the logic for the Event Modal.
It retrieves and displays the meta-data for an event.
**********************************************************************************************************************/

class ModalEvent
{  
    /**********************************************************
    Constructor.

    Parms:
        a_e_modalElement - the event modal html element
    **********************************************************/
    constructor(a_e_modalElement) {
        this.e_modal = a_e_modalElement;
        this.userID = Utilities.getUserIdFromLocalStorage();
        this.setElementFields();
        this.addEventListeners();
    }


    /**********************************************************
    Sets all the class properties.
    **********************************************************/
    setElementFields() {
        const self = this;
        const modal = this.e_modal;

        this.e_nameDisplay        = $(modal).find('.modal-title');
        this.e_descriptionDisplay = $(modal).find('.modal-header .description');
        this.e_phoneDisplay       = $(modal).find('.event-data.phone .event-data-data');
        this.e_addressDisplay     = $(modal).find('.event-data.address .event-data-data');
        this.e_occursOnDisplay    = $(modal).find('.event-data.occurs-on .event-data-data');

        this.e_btnToggleHeaderEdit = $(modal).find('.btn-modal-header-edit');
        this.e_btnDeleteEvent      = $(modal).find('.btn-modal-header-delete');

        this.e_formEditName        = $('#name-edit');
        this.e_formEditStartsOn    = $('#starts-on-edit');
        this.e_formEditStartsAt     = $('#starts-at-edit');
        this.e_formEditEndsOn      = $('#ends-on-edit');
        this.e_formEditEndsAt      = $('#ends-at-edit');
        this.e_formEditSeperation  = $('#seperation-edit');
        this.e_formEditFrequency   = $('#frequency-edit');
        this.e_formEditDay         = $('#recurrence-day-edit');
        this.e_formEditWeek        = $('#recurrence-week-edit');
        this.e_formEditMonth       = $('#recurrence-month-edit');
        this.e_formEditAddress1    = $('#address-1-edit');
        this.e_formEditAddress2    = $('#address-2-edit');
        this.e_formEditCity        = $('#city-edit');
        this.e_formEditState       = $('#state-edit');
        this.e_formEditZip         = $('#zip-edit');
        this.e_formEditDescription = $('#description-edit');
        this.e_formEditPhone       = $('#phone-edit');

        this.e_btnSaveEditForm = $('#btn-edit-event-save');
        this.e_btnCancelEditForm = $('#btn-edit-event-cancel');
    }

    /**********************************************************
    Initializes the modal display fields.

    This should be called every time a new event needs to be displayed
    **********************************************************/
    init(a_eventID, a_occursOn) {
        this.eventID = a_eventID;
        this.occursOn = DateTime.fromSQL(a_occursOn);
        this.loadData(this.displayEventData);
    }

    /**********************************************************
    Request the event data from the API
    **********************************************************/
    loadData(actionSuccess, actionError) {
        const self = this;
        const apiUrl = Utilities.buildApiEventUrl(Constants.API_URLS.EVENTS, this.eventID);

        if (actionSuccess == undefined) {
            actionSuccess = console.log;
        }

        if (actionError == undefined) {
            actionError = console.error;
        }

        $.ajax({
            headers: {"X-USER-ID": self.userID},
            url: apiUrl,
            type: "GET",
            dataType: "json",
            success: function(response) {
                actionSuccess(response, self);
            },
            error: actionError,
        });
    }


    /**********************************************************
    Display the event data in the modal.
    **********************************************************/
    displayEventData(apiResponse, self) {
        if (self == undefined) {
            self = this;
        }

        // event name
        $(self.e_nameDisplay).html(apiResponse.name);
        
        // description
        $(self.e_descriptionDisplay).html(apiResponse.description);

        // phone
        $(self.e_phoneDisplay).html(apiResponse.phone_number);

        // address
        const displayAddress = self.getAddressDisplayHtml(apiResponse);
        $(self.e_addressDisplay).html(displayAddress);

        // occurs on
        let occursOnDisplay = self.occursOn.toFormat('cccc, LLLL d');
        
        // if the api response includes a non-null starts_at, display the time as well 
        if (apiResponse.starts_at != null) {
            let startsAtDisplay = DateTime.fromSQL(apiResponse.starts_at).toLocaleString(DateTime.TIME_SIMPLE);
            occursOnDisplay += `&nbsp;&sdot;&nbsp;${startsAtDisplay}`;
        }

        $(self.e_occursOnDisplay).html(occursOnDisplay);

        self.loadEditFormData(apiResponse, self);
    }

    /**********************************************************
    Generates a string to display an event's address:
    Address 1 Address 2, City, ST ZIP
    **********************************************************/
    getAddressDisplayHtml(a_eventStruct) {
        // setup flags
        const isAddress1Set = a_eventStruct.location_address_1 != null;
        const isAddress2Set = a_eventStruct.location_address_2 != null;
        const isCitySet     = a_eventStruct.location_city != null;
        const isStateSet    = a_eventStruct.location_state != null;
        const isZipSet      = a_eventStruct.location_zip != null;
        
        let result = '';
        
        if (isAddress1Set) {
            result += `${a_eventStruct.location_address_1}`;
        }

        if (isAddress2Set) {
            result += ` ${a_eventStruct.location_address_2}`;
        }

        if ((isAddress1Set || isAddress2Set) && (isCitySet || isStateSet || isZipSet)) {
            result += ', ';
        }

        if (isCitySet) {
            result += `${a_eventStruct.location_city}`;

            if (isStateSet || isZipSet) {
                result += ', ';
            }
        }

        if (isStateSet) {
            result += `${a_eventStruct.location_state}`;

            if (isZipSet) {
                result += ' ';
            }
        }

        if (isZipSet) {
            result += `${a_eventStruct.location_zip}`;
        }

        
        return result;
    }

    /**********************************************************
    Load the event data into the edit event form
    **********************************************************/
    loadEditFormData(apiResponse, self) {
        $(self.e_formEditName).val(apiResponse.name);   // name
        $(self.e_formEditSeperation).val(apiResponse.seperation);
        $(self.e_formEditFrequency).val(apiResponse.frequency);
        $(self.e_formEditDay).val(apiResponse.recurrence_day);
        $(self.e_formEditWeek).val(apiResponse.recurrence_week);
        $(self.e_formEditMonth).val(apiResponse.recurrence_month);
        $(self.e_formEditAddress1).val(apiResponse.location_address_1);
        $(self.e_formEditAddress2).val(apiResponse.location_address_2);
        $(self.e_formEditCity).val(apiResponse.location_city);
        $(self.e_formEditState).val(apiResponse.location_state);
        $(self.e_formEditZip).val(apiResponse.location_zip);
        $(self.e_formEditDescription).val(apiResponse.description);
        $(self.e_formEditPhone).val(apiResponse.phone_number);
        $(self.e_formEditStartsOn).val(apiResponse.starts_on);  // starts on
        $(self.e_formEditStartsAt).val(apiResponse.starts_at);  // starts at
        $(self.e_formEditEndsOn).val(apiResponse.ends_on);
        $(self.e_formEditEndsAt).val(apiResponse.ends_at);

        self.toggleEditRecurrenceInputs(self, false);
    }


    /**********************************************************
    Show the modal
    **********************************************************/
    showModal() {
        $(this.e_modal).modal('show');
    }
    
    /**********************************************************
    Adds all the event listeners to the modal
    **********************************************************/
    addEventListeners() {
        const self = this;
        
        // toggle an edit for the event data
        $(this.e_btnToggleHeaderEdit).on('click', function() {
            self.showEditHeader(self);
        });

        // make sure the edit form is not visible when the modal is closed
        $(this.e_modal).on('hidden.bs.modal', function() {
            self.showDisplayHeader(self);
        });

        // update an event
        $(this.e_btnSaveEditForm).on('click', function() {
            self.sendEventUpdateRequest(self);
        });

        // cancel an event edit request
        $(this.e_btnCancelEditForm).on('click', function() {
            self.showDisplayHeader(self);
            self.loadData(function(response) {
                self.loadEditFormData(response, self);  // reset the input values
            });
        });

        $(this.e_btnDeleteEvent).on('click', function() {
            self.deleteEvent(self);
        });

        $(this.e_formEditFrequency).on('change', function() {
            self.toggleEditRecurrenceInputs(self, true);
        });
    }

    /**********************************************************
    Returns an object of all the edit event form inputs
    **********************************************************/
    getEditFormValues() {
        const self = this;

        const result = {
            name              : $(self.e_formEditName).val(),
            description       : $(self.e_formEditDescription).val(),
            phone_number      : $(self.e_formEditPhone).val(),
            location_address_1: $(self.e_formEditAddress1).val(),
            location_address_2: $(self.e_formEditAddress2).val(),
            location_city     : $(self.e_formEditCity).val(),
            location_state    : $(self.e_formEditState).val(),
            location_zip      : $(self.e_formEditZip).val(),
            starts_on         : $(self.e_formEditStartsOn).val(),
            ends_on           : $(self.e_formEditEndsOn).val(),
            starts_at         : $(self.e_formEditStatsAt).val(),
            ends_at           : $(self.e_formEditEndsAt).val(),
            frequency         : $(self.e_formEditFrequency).val(),
            seperation        : $(self.e_formEditSeperation).val(),
            recurrence_day    : $(self.e_formEditDay).val(),
            recurrence_week   : $(self.e_formEditWeek).val(),
            recurrence_month  : $(self.e_formEditMonth).val(),
            description       : null,
        };

        return result;
    }

    /**********************************************************
    send an update request to the api to update an event's meta data
    **********************************************************/
    sendEventUpdateRequest(self) {
        const url = Utilities.buildApiEventUrl(Constants.API_URLS.EVENTS, self.eventID);

        // send the request to the api
        $.ajax({
            headers: {"X-USER-ID" :  self.userID},
            url: url,
            type: "PUT",
            data: self.getEditFormValues(),
            success: function(response) {
                self.loadData(self.displayEventData);
                self.showDisplayHeader(self);
                
                // fire an event saying an event was updated
                let event = new CustomEvent('event_update', {
                    bubbles: true,
                });

                $(self.e_modal)[0].dispatchEvent(event);

                Utilities.displayAlert('Event was successfully updated.');
            },
            error: console.error,
        });
    }

    /**********************************************************
    Show the display event modal header
    **********************************************************/
    showDisplayHeader(self) {
        if (self == undefined) {
            self = this;
        }

        $(self.e_modal).find('.modal-header-display').addClass('active');
        $(self.e_modal).find('.modal-header-edit').removeClass('active');
    }

    /**********************************************************
    Show the display event modal header
    **********************************************************/
    showEditHeader(self) {
        if (self == undefined) {
            self = this;
        }

        $(self.e_modal).find('.modal-header-display').removeClass('active');
        $(self.e_modal).find('.modal-header-edit').addClass('active');
    }

    /**********************************************************
    Delete an event
    **********************************************************/
    deleteEvent(self) {
        if (!confirm('Are you sure you want to delete this event?')) {
            return;
        }

        const url = Utilities.buildApiEventUrl(Constants.API_URLS.EVENTS, self.eventID);

        // send the request to the api
        $.ajax({
            headers: {"X-USER-ID" :  self.userID},
            url: url,
            type: "DELETE",
            success: function(response) {                
                // fire an event saying an event was updated
                let event = new CustomEvent('event_update', {
                    bubbles: true,
                });

                $(self.e_modal)[0].dispatchEvent(event);

                $(self.e_modal).modal('hide');
            },
            error: console.error,
        });
    }

    toggleEditRecurrenceInputs(self, clearInputs = true) {
        const inputFrequencyValue = $(self.e_formEditFrequency).find('option:selected').val();

        // clear and hide all the recurrence inputs initially
        if (clearInputs) {
            $('.event-edit-input.recurrence').val('');
        }
        
        $('.event-edit-input.recurrence').addClass('d-none');
        
        // if the frequency was set to once, hide the seperation and exit
        if (inputFrequencyValue == Constants.EVENT_FREQUENCY_VALUES.ONCE) {
            $(self.e_formEditSeperation).addClass('d-none');

            if (clearInputs) {
                $(self.e_formEditSeperation).val('1');
            }
            
            return;
        } else {
            $(self.e_formEditSeperation).removeClass('d-none');
        }


        if (inputFrequencyValue == Constants.EVENT_FREQUENCY_VALUES.WEEKLY) {
            $(self.e_formEditDay).removeClass('d-none');            // show day
        } 
        else if (inputFrequencyValue == Constants.EVENT_FREQUENCY_VALUES.MONTHLY) {
            $(self.e_formEditDay).removeClass('d-none');            // show day
            $(self.e_formEditWeek).removeClass('d-none');           // show week
        } 
        else if (inputFrequencyValue == Constants.EVENT_FREQUENCY_VALUES.YEARLY) {
            $('.event-edit-input.recurrence').removeClass('d-none'); // show all
        }

    }

}

