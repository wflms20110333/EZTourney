// Concatenates strings with underscores
function concatenateString(strs) {
    ret = strs[0];
    for (var i = 1; i < strs.length; i++)
        ret += "_" + strs[i];
    return ret;
}

// Displays a message with the snackbar.
function snackbar(message) {
    var data = {
        message: message,
        timeout: 2000
    };
    snackbarElement.MaterialSnackbar.showSnackbar(data);
}

// Initiate firebase auth.
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) { // User is signed in!
        var userEmail = getUserEmail();
        userEmailElement.textContent = userEmail;

        // Show user's profile and sign-out button.
        userEmailElement.removeAttribute('hidden');
        signOutButtonElement.removeAttribute('hidden');

        // Show other screens
        pageTabElement.removeAttribute('hidden');
        // TODO: if is not admin
        // athleteScreenElement.removeAttribute('hidden');
        loadAthleteInformation();
        loadOpenTournamentRegistrations();

        // Hide login screen
        loginScreenElement.setAttribute('hidden', 'true');
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        userEmailElement.setAttribute('hidden', 'true');
        signOutButtonElement.setAttribute('hidden', 'true');

        // Hide other screens
        pageTabElement.setAttribute('hidden', 'true');
        // athleteScreenElement.setAttribute('hidden', 'true');

        // Show login screen
        loginScreenElement.removeAttribute('hidden');
    }
}