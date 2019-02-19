// Displays a message with the snackbar.
function snackbar(message) {
    var data = {
        message: message,
        timeout: 2000
    };
    snackbarElement.MaterialSnackbar.showSnackbar(data);
}

// Signs-in to EZTourney.
function signIn() {
    var email = emailInputElement.value;
    var password = passwordInputElement.value;
    if (blankCredentials(email, password))
        return;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
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
    console.log(email);
    if (blankCredentials(email, password))
        return;
    console.log('TRIGGERED');
    if (invalidCredentials(email, password))
        return;
    console.log('yay');
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    console.log('hi');
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
        hoguSize: -1,
        helmetSize: -1,
        armGuardsSize: -1,
        shinGuardsSize: -1,
        socksSize: -1,
        glovesSize: -1
    }).catch(function(error) {
        console.error("Error writing new athlete's information to Firebase Database", error);
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

// Initiate firebase auth.
function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

// Returns the signed-in user's display name.
function getUserEmail() {
    return firebase.auth().currentUser.email;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
    if (user) { // User is signed in!
        var userEmail = getUserEmail();
        userEmailElement.textContent = userEmail;

        // Show user's profile and sign-out button.
        userEmailElement.removeAttribute('hidden');
        signOutButtonElement.removeAttribute('hidden');

        // if is not admin
        athleteScreenElement.removeAttribute('hidden');

        // Hide login screen.
        loginScreenElement.setAttribute('hidden', 'true');
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        userEmailElement.setAttribute('hidden', 'true');
        signOutButtonElement.setAttribute('hidden', 'true');
        athleteScreenElement.setAttribute('hidden', 'true');

        // Show sign-in button.
        loginScreenElement.removeAttribute('hidden');
    }
}

// Updates an athlete's information.
function updateInformation() {
    var name = document.getElementById('name').value;
    var year = document.getElementById('year').value;
    var gender = document.getElementById('gender').value;
    var kerberos = document.getElementById('kerberos').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var belt = document.getElementById('belt').value;
    var weightDivision = document.getElementById('weightDivision').value;
    var weight = document.getElementById('weight').value;
    var emergencyContactName = document.getElementById('emergencyContactName').value;
    var emergencyContactPhone = document.getElementById('emergencyContactPhone').value;

    if (name == "" ||
        year == "" ||
        gender == "" ||
        kerberos == "" ||
        phoneNumber == "" ||
        belt == "" ||
        weightDivision == "" ||
        weight == 0 ||
        emergencyContactName == "" ||
        emergencyContactPhone == "") {
            snackbar('Please fill out all fields');
            return;
    }

    // submit data
    firestore.doc('/athletes/' + getUserEmail()).get().then(function(doc) {
        if (!doc.exists) {
            addNewAthlete();
            console.log("new athlete added");
        }
    });

    firestore.doc('/athletes/' + getUserEmail()).get().then(function(doc) {
        if (!doc.exists) {
            console.log("this is wrong");
        }
        else {
            console.log("this is right");
        }
    });


    firestore.doc('/athletes/' + getUserEmail()).update({
        name: name,
        year: year,
        gender: gender,
        kerberos: kerberos,
        phoneNumber: phoneNumber,
        belt: belt,
        weightDivision: weightDivision,
        weight: weight,
        emergencyContactName: emergencyContactName,
        emergencyContactPhone: emergencyContactPhone
    })
    .then(function() {
        snackbar('Information updated!');
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

var loginScreenElement = document.getElementById('loginScreen');
var emailInputElement = document.getElementById('email');
var passwordInputElement = document.getElementById('password');
var signInButtonElement = document.getElementById('signIn');
var registerButtonElement = document.getElementById('register');

var snackbarElement = document.getElementById('snackbar');

var userEmailElement = document.getElementById('userEmail');
var signOutButtonElement = document.getElementById('signOut');

var athleteScreenElement = document.getElementById('athleteScreen');
var updateAthleteInformationElement = document.getElementById('updateInformation');

signInButtonElement.addEventListener('click', signIn);
signOutButtonElement.addEventListener('click', signOut);
registerButtonElement.addEventListener('click', register);
updateAthleteInformationElement.addEventListener('click', updateInformation);

// initialize Firebase
initFirebaseAuth();


function test() {
    var athletesRef = firestore.collection("athletes");

    athletesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });

    var docRef = firestore.collection("athletes").doc("SF");

    docRef.update({
        state: "TX"
    })

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}