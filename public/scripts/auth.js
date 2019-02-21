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
    var athletesRef = firestore.collection("athletes");
    athletesRef.doc(getUserEmail()).set({
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