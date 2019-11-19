import decode from 'jwt-decode';
export default class AuthHelperMethods {
    // Initializing important variables
    // constructor(domain) {}

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    };

    isTokenExpired = token => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                // Checking if token is expired.
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token_id');
    };

    logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('token_id');
    };
}
