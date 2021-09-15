/**
 * This class represents the user
 */

/**********************************************************
Constructor
**********************************************************/
function User(userID) {
    // init all properties
    this.userID = userID;
    this.email = null;
    this.createdOn = null;

    this.loadUserInfo();
}


/**********************************************************
Loads the user data into it's fields.
**********************************************************/
User.prototype.loadUserInfo = function() {
    const self = this;

    $.ajax({
        url: Constants.API_URLS.USERS + '/users',
        type: "get",

        beforeSend: function(xhr){
            xhr.setRequestHeader('X-USER-ID', self.userID);
        },

        success: function(response) { 
            self.email = response.email;
            self.createdOn = response.createdOn;
        },

        error: function(response) {
            console.log(response);
        }
    });
}




