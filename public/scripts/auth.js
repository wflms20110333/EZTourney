// Signs-in to EZTourney.
function signIn() {
    var email = emailInputElement.value;
    var password = passwordInputElement.value;
    if (blankCredentials(email, password))
        return;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode == 'auth/invalid-email')
            snackbar('Invalid email');
        else if (errorCode == 'auth/user-not-found')
            snackbar('User not found');
        else if (errorCode == 'auth/wrong-password')
            snackbar('Incorrect password');
    });
}

// Signs-out of EZTourney.
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
}

// Registers an account.
function register() {
    var email = emailInputElement.value;
    var password = passwordInputElement.value;
    if (blankCredentials(email, password))
        return;
    if (invalidCredentials(email, password))
        return;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(smth) {
        addNewAthlete();
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use')
            snackbar('The email address is already in use by another account');
    });
}

// Returns true if either username or password is blank.
function blankCredentials(email, password) {
    if (email == "") {
        snackbar('Username cannot be blank');
        return true;
    }
    if (password == "") {
        snackbar('Password cannot be blank');
        return true;
    }
    return false;
}

// Returns true if credentials are invalid.
function invalidCredentials(email, password) {
    // admin account bypass...?
    // mit email
    if (!email.endsWith("@mit.edu")) {
        snackbar('Please use MIT email');
        return true;
    }
    // authorized mit email?
    // password length
    if (password.length < 8 || password.length > 32) {
        snackbar('Password length must be 8-32');
        return true;
    }
    // password complexity?
    return false;
}

// Add a new athlete entry to the Firebase database.
function addNewAthlete() {
    firestore.collection("athletes").doc(getUserUID()).set({
        name: "",
        year: "",
        gender: "",
        kerberos: "",
        phoneNumber: "",
        belt: "",
        weightDivision: "",
        weight: -1,
        emergencyContactName: "",
        emergencyContactPhone: "",
        hoguSize: 0,
        helmetSize: 0,
        armGuardsSize: 0,
        shinGuardsSize: 0,
        socksSize: 0,
        glovesSize: 0
    }).catch(function(error) {
        console.error("Error writing new athlete's information to Firebase Database", error);
    });
}

// // Returns true if a user is signed-in.
// function isUserSignedIn() {
//     return !!firebase.auth().currentUser;
// }

// Returns the signed-in user's display name.
function getUserEmail() {
    return firebase.auth().currentUser.email;
}

// Returns the signed-in user's uid.
function getUserUID() {
    return firebase.auth().currentUser.uid;
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

        // Show appropriate tab navigation buttons
        if (userEmail.endsWith('@mit.edu'))
            for (var i = 0; i < athleteTabButtonElements.length; i++)
                athleteTabButtonElements[i].removeAttribute('hidden');
        firestore.doc('/users/permissions').get().then(function(doc) {
            if (doc.data().admins.includes(userEmail))
                for (var i = 0; i < adminTabButtonElements.length; i++)
                    adminTabButtonElements[i].removeAttribute('hidden');
        });

        // Show tab navigation bar
        pageTabElement.removeAttribute('hidden');

        // Loads information from database
        loadAthleteInformation();
        loadOpenTournamentRegistrations();
        loadManageTournamentsPage();

        // Hide login screen
        loginScreenElement.setAttribute('hidden', 'true');

        // Show register tab
        tournamentRegistrationTabButtonClicked();
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        userEmailElement.setAttribute('hidden', 'true');
        signOutButtonElement.setAttribute('hidden', 'true');

        // Hide all tab navigation buttons
        for (var i = 0; i < tabButtonElements.length; i++)
            tabButtonElements[i].setAttribute('hidden', 'true');

        // Hide tab navigation bar
        pageTabElement.setAttribute('hidden', 'true');

        // Hide all other screens
        for (var i = 0; i < tabElements.length; i++)
            tabElements[i].setAttribute('hidden', 'true');

        // Show login screen
        loginScreenElement.removeAttribute('hidden');
    }
}