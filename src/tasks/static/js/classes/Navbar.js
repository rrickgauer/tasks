/**********************************************************************************************************************
Navbar

This class holds all the logic related to the navbar
**********************************************************************************************************************/

class Navbar 
{
    /**********************************************************
    Module properties
    **********************************************************/
    static LogoutButton = $('#nav-item-logout');
    static Navbar = $('#navbar');

    /**********************************************************
    Adds all the listeners
    **********************************************************/
    static setListeners() {
        Navbar.logout();
    }

    /**********************************************************
    Log the user out
    **********************************************************/
    static logout() {
        $(Navbar.LogoutButton).on('click', function(e) {
            e.preventDefault();
            Utilities.removeUserIdFromLocalStorage();
            window.location.href = 'login.php';
        });
    }
}

Navbar.setListeners();

