class Utilities {

    /**********************************************************
    Displays an alert on the screen.
    **********************************************************/
    static displayAlert(message) {
        $.toast({
            text: message,
            position: 'bottom-center',
            loader: false,
            bgColor: '#3D3D3D',
            textColor: 'white'
        });
    }

    /**********************************************************
    Returns the user id from the local storage.
    **********************************************************/
    static getUserIdFromLocalStorage() {
        return window.localStorage.getItem('userID');
    }

    /**********************************************************
    Clears the user id from the local storage.
    **********************************************************/
    static removeUserIdFromLocalStorage() {
        window.localStorage.removeItem('userID');
    }

    /**********************************************************
    returns a UUID
    **********************************************************/
    static getUUID() {
        return uuidv4();
    }


    /**********************************************************
    Returns a bool indicating if the user id is set in 
    local storage.
    
    True = user id is set
    False = user id is NOT set
    **********************************************************/
    static isUserIdSet() {
        if (window.localStorage.getItem('userID') == null) {
            return false;
        } else {
            return true;
        }
    }

    /**********************************************************
    Generates an api url to use
    **********************************************************/
    static buildApiEventUrl(a_apiUrl, a_eventID) {
        let url = a_apiUrl + '/' + a_eventID;
        return url;
    }

}





