// Displays a message with the snackbar.
function snackbar(message) {
    var data = {
        message: message,
        timeout: 2000
    };
    snackbarElement.MaterialSnackbar.showSnackbar(data);
}

// When the tab button for edit information is clicked
function editInformationTabButtonClicked() {
    editInformationTabElement.removeAttribute('hidden');
    equipmentSizesTabElement.setAttribute('hidden', 'true');
    createTournamentTabElement.setAttribute('hidden', 'true');
}

// When the tab button for equipment sizes is clicked
function equipmentSizesTabButtonClicked() {
    editInformationTabElement.setAttribute('hidden', true);
    equipmentSizesTabElement.removeAttribute('hidden');
    createTournamentTabElement.setAttribute('hidden', 'true');
}

// When the tab button for edit information is clicked
function createTournamentTabButtonClicked() {
    editInformationTabElement.setAttribute('hidden', 'true');
    equipmentSizesTabElement.setAttribute('hidden', 'true');
    createTournamentTabElement.removeAttribute('hidden');
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

        // Show other screens
        pageTabElement.removeAttribute('hidden');
        // TODO: if is not admin
        // athleteScreenElement.removeAttribute('hidden');
        loadAthleteInformation();

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

// Updates an athlete's information.
function updateInformation() {
    // retrieve values
    var name = athleteNameElement.value;
    var year = athleteYearElement.value;
    var gender = athleteGenderElement.value;
    var kerberos = athleteKerberosElement.value;
    var phoneNumber = athletePhoneNumberElement.value;
    var belt = athleteBeltElement.value;
    var weightDivision = athleteWeightDivisionElement.value;
    var weight = athleteWeightElement.value;
    var emergencyContactName = athleteEmergencyContactNameElement.value;
    var emergencyContactPhone = athleteEmergencyContactPhoneElement.value;

    // check for invalid form
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

// Updates an athlete's equipment sizes.
function updateSizes() {
    // retrieve values
    var hoguSize = hoguSizeElement.value;
    var helmetSize = helmetSizeElement.value;
    var armGuardsSize = armGuardsSizeElement.value;
    var shinGuardsSize = shinGuardsSizeElement.value;
    var socksSize = socksSizeElement.value;
    var glovesSize = glovesSizeElement.value;

    // submit data
    firestore.doc('/athletes/' + getUserEmail()).update({
        hoguSize: hoguSize,
        helmetSize: helmetSize,
        armGuardsSize: armGuardsSize,
        shinGuardsSize: shinGuardsSize,
        socksSize: socksSize,
        glovesSize: glovesSize
    })
    .then(function() {
        snackbar('Equipment sizes updated!');
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

// Loads database information into forms
function loadAthleteInformation() {
    firestore.doc('/athletes/' + getUserEmail()).get().then(function(doc) {
        if (doc.exists) {
            // retrieve the document's data
            var data = doc.data();

            // Athlete information elements
            athleteNameElement.value = data.name;
            athleteYearElement.value = data.year;
            athleteGenderElement.value = data.gender;
            athleteKerberosElement.value = data.kerberos;
            athletePhoneNumberElement.value = data.phoneNumber;
            athleteBeltElement.value = data.belt;
            athleteWeightDivisionElement.value = data.weightDivision;
            athleteWeightElement.value = data.weight;
            athleteEmergencyContactNameElement.value = data.emergencyContactName;
            athleteEmergencyContactPhoneElement.value = data.emergencyContactPhone

            // Equipment sizes elements
            hoguSizeElement.value = data.hoguSize;
            helmetSizeElement.value = data.helmetSize;
            armGuardsSizeElement.value = data.armGuardsSize;
            shinGuardsSizeElement.value = data.shinGuardsSize;
            socksSizeElement.value = data.socksSize;
            glovesSizeElement.value = data.glovesSize;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

function createTournament() {

}

// Adds a tournament
function addTournamentToDatabase(name, message, date, dueDate, tournamentFees, contact) {
    name = name.trim();
    var tournamentDocName = concatenateString(/* date + */ name.split(/\s+/));
    var tournamentsRef = firestore.collection('tournaments');
    tournamentsRef.doc("Princeton").set({name: "Princeton"});
    tournamentsRef.doc("Princeton").collection("women'sA").doc("A1").set({light: "EZ"});
}

// Concatenates strings with underscores
function concatenateString(strs) {
    ret = strs[0];
    for (var i = 1; i < strs.length; i++)
        ret += "_" + strs[i];
    return ret;
}

/*************************************************************************************************/

// some basic settings for firebase/firestore
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

// The snackbar
var snackbarElement = document.getElementById('snackbar');

// The tab
var pageTabElement = document.getElementById('pageTab');

// Tab button elements
var tournamentRegistrationTabButtonElement = document.getElementById('tournamentRegistrationTabButton');
var editInformationTabButtonElement = document.getElementById('editInformationTabButton');
var equipmentSizesTabButtonElement = document.getElementById('equipmentSizesTabButton');
var createTournamentTabButtonElement = document.getElementById('createTournamentTabButton');
var manageTournamentsTabButtonElement = document.getElementById('manageTournamentsTabButton');

// Tab elements
var editInformationTabElement = document.getElementById('editInformationTab');
var equipmentSizesTabElement = document.getElementById('equipmentSizesTab');
var createTournamentTabElement = document.getElementById('createTournamentTab');

// Login elements
var loginScreenElement = document.getElementById('loginScreen');
var emailInputElement = document.getElementById('email');
var passwordInputElement = document.getElementById('password');
var signInButtonElement = document.getElementById('signIn');
var registerButtonElement = document.getElementById('register');

// Logout elements
var userEmailElement = document.getElementById('userEmail');
var signOutButtonElement = document.getElementById('signOut');

// Form submission elements
var updateAthleteInformationElement = document.getElementById('updateInformation');
var updateEquipmentSizesElement = document.getElementById('updateSizes');

// Athlete information elements
var athleteNameElement = document.getElementById('name');
var athleteYearElement = document.getElementById('year');
var athleteGenderElement = document.getElementById('gender');
var athleteKerberosElement = document.getElementById('kerberos');
var athletePhoneNumberElement = document.getElementById('phoneNumber');
var athleteBeltElement = document.getElementById('belt');
var athleteWeightDivisionElement = document.getElementById('weightDivision');
var athleteWeightElement = document.getElementById('weight');
var athleteEmergencyContactNameElement = document.getElementById('emergencyContactName');
var athleteEmergencyContactPhoneElement = document.getElementById('emergencyContactPhone');

// Equipment sizes elements
var hoguSizeElement = document.getElementById('hoguSize');
var helmetSizeElement = document.getElementById('helmetSize');
var armGuardsSizeElement = document.getElementById('armGuardsSize');
var shinGuardsSizeElement = document.getElementById('shinGuardsSize');
var socksSizeElement = document.getElementById('socksSize');
var glovesSizeElement = document.getElementById('glovesSize');

// Attach onclick methods for tab buttons
editInformationTabButtonElement.addEventListener('click', editInformationTabButtonClicked);
equipmentSizesTabButtonElement.addEventListener('click', equipmentSizesTabButtonClicked);
createTournamentTabButtonElement.addEventListener('click', createTournamentTabButtonClicked);

// Attach onclick methods for buttons
signInButtonElement.addEventListener('click', signIn);
signOutButtonElement.addEventListener('click', signOut);
registerButtonElement.addEventListener('click', register);
updateAthleteInformationElement.addEventListener('click', updateInformation);
updateEquipmentSizesElement.addEventListener('click', updateSizes);

// initialize Firebase
initFirebaseAuth();
