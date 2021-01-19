// main function
$(document).ready(function() {
    $("#nav-item-home").addClass('active');
    
    
    testConnection();
    
});


// displays an alert on the screen
function displayAlert(text) {
    $.toast({
        text: text,
        position: 'bottom-center',
        loader: false,
        bgColor: '#3D3D3D',
        textColor: 'white'
    });
}



function testConnection() {
    
    $.ajax({
        url: m_API + '/users',
        type: "get",

        data: {
            // email: "rrickgauer8@gmail.com",
            // password: "90!Hayrack",

        },

        beforeSend: function(xhr){
            xhr.setRequestHeader('X-USER-ID', '0f3b1d90-5a08-11eb-8c34-002590d0b8f0');
        },

        success: function(response) { 
            // console.log(response.text);
            console.log(response);
        },

        error: function(response) {
            console.log(response);
        }

    });
    
    
}



