/**********************************************************************************************************************
DailyRecurrences

This represents a card that has a list of EventRecurrences in it.
**********************************************************************************************************************/
class DailyRecurrences {


    /**********************************************************
    Constructor
    **********************************************************/ 
    constructor(a_date) {
        this.eventRecurrences = [];
        this.date = a_date;
    }

    /**********************************************************
    Insert a new event recurrence into the Event Recurrences list.
    **********************************************************/ 
    addEventRecurrence(a_apiResponseEventRecurrence) {
        this.eventRecurrences.push(new EventRecurrence(a_apiResponseEventRecurrence));
    }

    /**********************************************************
    Insert a new event recurrence into the Event Recurrences list.
    **********************************************************/ 
    getHtml(a_apiResponseEventRecurrence) {

        const eventRecurrencesHtml = this.getEventRecurrencesHtml();
        const weekdayDisplay = this.date.weekdayLong;

        let html = `
        <div class="recurrence-wrapper">
            <div class="card card-recurrence-day">
                <div class="card-header">
                    <div class="card-task-weekday">${weekdayDisplay}</div>
                </div>
                <div class="card-body">
                    <ul class="list-group tasks">
                        ${eventRecurrencesHtml}
                    </ul>
                </div>
            </div>
        </div>`;

        return html;

    }



    /**********************************************************
    Generate all of the html for the EventRecurrences in the list.
    **********************************************************/
    getEventRecurrencesHtml() {
        let html = '';

        for (let count = 0; count < this.eventRecurrences.length; count++) {
            html += this.eventRecurrences[count].getHtml();
        }

        return html;
    }
}