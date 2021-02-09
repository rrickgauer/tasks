/**********************************************************************************************************************
WeekDates

This represents an event recurrence.
**********************************************************************************************************************/

class EventRecurrence {

    /**********************************************************
    Constructor
    **********************************************************/
    constructor(a_apiResponse) {
        this.id = a_apiResponse.id;
        this.occursOn = a_apiResponse.occurs_on;
        this.name = a_apiResponse.name;
    }

    /**********************************************************
    Generates and returns the html for this event recurrence
    **********************************************************/
    getHtml() {
        let html = `
        <li class="task list-group-item" data-event-id="${this.id}">
            ${this.name}
        </li>`;

        return html;

    }
}









