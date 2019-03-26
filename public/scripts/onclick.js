// Sends a password reset email.
function resetPasswordButtonClicked() {
    var email = passwordResetEmailElement.value;
    if (!isValidEmailAddress(email)) {
        snackbar('Please enter a valid email address.');
        return;
    }

    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        snackbar('Password reset email successfully sent!');
    }).catch(function(error) {
        // An error happened.
        if (error.code == 'auth/user-not-found')
            snackbar('There is no user record corresponding to this email.');
        else
            snackbar(error.message);
    });
}

// Registers the current user for a tournament.
function registerForTournamentButtonClicked() {
    loadAthleteInformation(); // to check if filled

    // retrieve values
    var poomsae = eventsPoomsaeElement.checked;
    var sparring = eventsSparringElement.checked;
    var equipmentBuddy = equipmentBuddyElement.value;
    var equipmentBuddyHogu = equipmentBuddyHoguElement.checked;
    var equipmentBuddyHelmet = equipmentBuddyHelmetElement.checked;
    var equipmentBuddyArmGuards = equipmentBuddyArmGuardsElement.checked;
    var equipmentBuddyShinGuards = equipmentBuddyShinGuardsElement.checked;
    var equipmentBuddyGloves = equipmentBuddyGlovesElement.checked;
    var equipmentBuddyFeetProtectors = equipmentBuddyFeetProtectorsElement.checked;
    var equipmentBuddyESocks = equipmentBuddyESocksElement.checked;
    var notes = tournamentRegistrationNotesElement.value;
    var confirmation = tournamentRegistrationConfirmationElement.checked;

    // check for missing required fields
    if ((!poomsae && !sparring) ||
        !confirmation) {
        snackbar('Please fill out all required fields');
        return;
    }

    // check that athlete information is completed
    if (athleteNameElement.value == "" ||
        athleteYearElement.value == "" ||
        athleteGenderElement.value == "" ||
        athleteKerberosElement.value == "" ||
        athletePhoneNumberElement.value == "" ||
        athleteBeltElement.value == "" ||
        athleteWeightDivisionElement.value == "" ||
        athleteWeightElement.value == "" ||
        athleteEmergencyContactNameElement.value == "" ||
        athleteEmergencyContactPhoneElement.vlue == "") {
        snackbar("Please complete all information on the 'Edit Information' tab first");
        return;
    }

    // check that equipment sizes are filled out
    if (equipmentBuddy != "") {
        if (equipmentBuddyHogu && hoguSizeElement.value == 0 ||
            equipmentBuddyHelmet && helmetSizeElement.value == 0 ||
            equipmentBuddyArmGuards && armGuardsSizeElement.value == 0 ||
            equipmentBuddyShinGuards && shinGuardsSizeElement.value == 0 ||
            equipmentBuddyGloves && glovesSizeElement.value ||
            equipmentBuddyFeetProtectors && socksSizeElement.value == 0 ||
            equipmentBuddyESocks && socksSizeElement.value == 0) {
            snackbar("Please fill out sizes for checked equipment on the 'Equipment Sizes' tab");
            return;
        }
    }

    var textQuestionResponses = [];
    var textResponses = document.getElementsByClassName('optionalTextInput');
    for (var i = 0; i < textResponses.length; i++)
        textQuestionResponses.push(textResponses[i].value);
    
    // submit data
    var tournamentsRef = firestore.collection("tournaments");
    tournamentsRef.doc(openRegistrationTournamentDocName).collection('registeredAthletes').doc(getUserUID()).set({
        userUID: getUserUID(),
        poomsae: poomsae,
        sparring: sparring,
        equipmentBuddy: equipmentBuddy,
        equipmentBuddyHogu: equipmentBuddyHogu,
        equipmentBuddyHelmet: equipmentBuddyHelmet,
        equipmentBuddyArmGuards: equipmentBuddyArmGuards,
        equipmentBuddyShinGuards: equipmentBuddyShinGuards,
        equipmentBuddyGloves: equipmentBuddyGloves,
        equipmentBuddyFeetProtectors: equipmentBuddyFeetProtectors,
        equipmentBuddyESocks: equipmentBuddyESocks,
        notes: notes,
        textQuestionResponses: textQuestionResponses
    }).then(function() {
        snackbar('Successfully registered for tournament!');
    }).catch(function(error) {
        console.error("Error writing new athlete's registration information to Firebase Database", error);
    });
}

// Updates an athlete's information.
function updateInformationButtonClicked() {
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

    // check for missing required fields
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
        snackbar('Please fill out all required fields');
        return;
    }

    // submit data
    firestore.doc('/athletes/' + getUserUID()).update({
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
    }).then(function() {
        snackbar('Information updated!');
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

// Updates an athlete's equipment sizes.
function updateEquipmentSizesButtonClicked() {
    // retrieve values
    var hoguSize = hoguSizeElement.value;
    var helmetSize = helmetSizeElement.value;
    var armGuardsSize = armGuardsSizeElement.value;
    var shinGuardsSize = shinGuardsSizeElement.value;
    var socksSize = socksSizeElement.value;
    var glovesSize = glovesSizeElement.value;

    // submit data
    firestore.doc('/athletes/' + getUserUID()).update({
        hoguSize: hoguSize,
        helmetSize: helmetSize,
        armGuardsSize: armGuardsSize,
        shinGuardsSize: shinGuardsSize,
        socksSize: socksSize,
        glovesSize: glovesSize
    }).then(function() {
        snackbar('Equipment sizes updated!');
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

// Adds an optional text input form element
function addTextInputButtonClicked() {
    textInputWrapperElement.insertBefore(createTextInputElement('Optional Question (Text Response)', 'optionalText'), addTextInputButtonElement);
}

// Creates a tournament
function createTournamentButtonClicked() {
    // retrieve values
    var tournamentName = tournamentNameElement.value;
    var tournamentMessage = tournamentMessageElement.value;
    var tournamentDate = tournamentDateElement.value;
    var tournamentSignUpDueDate = tournamentSignUpDueDateElement.value;
    var tournamentFees = tournamentFeesElement.value;
    var tournamentContact = tournamentContactElement.value;
    var confirmation = createTournamentConfirmationElement.checked;

    // check for missing required fields
    if (tournamentName == "" ||
        tournamentDate == "" ||
        tournamentContact == "" ||
        !confirmation) {
        snackbar('Please fill out all required fields');
        return;
    }

    // check if there are other open tournaments
    if (openRegistrationTournamentDocName != "") {
        snackbar('Cannot have more than one tournament open for registration; please close the other first');
        return;
    }

    var textQuestions = [];
    var questionsElements = document.getElementsByClassName('optionalText');
    for (var i = 0; i < questionsElements.length; i++) {
        var question = questionsElements[i].value;
        if (question != "")
            textQuestions.push(question);
    }

    // submit data
    addTournamentToDatabase(tournamentName, tournamentMessage, tournamentDate, tournamentSignUpDueDate, tournamentFees, tournamentContact, textQuestions);
}

// Adds a tournament to the database
function addTournamentToDatabase(name, message, date, signUpDueDate, fees, contact, textQuestions) {
    // create tournament's document name
    name = name.trim();
    var tournamentDocName = date + "_" + concatenateString(name.split(/\s+/));

    // get tournaments collection reference
    var tournamentsRef = firestore.collection('tournaments');

    // add new tournament document to collection
    tournamentsRef.doc(tournamentDocName).set({
        documentID: tournamentDocName,
        status: "open",
        name: name,
        message: message,
        date: date,
        signUpDueDate: signUpDueDate,
        fees: fees,
        contact: contact,
        textQuestions: textQuestions
    }).then(function() {
        snackbar("Tournament successfully created and open for registration!");
    }).catch(function(error) {
        console.error("Error writing new tournament's information to Firebase Database", error);
    });;

    // add sparring teams collection? or do when sparring teams are generated
    // tournamentsRef.doc(tournamentDocName).collection("women'sA").doc("A1").set({light: "EZ"});
}

// Closes the tournament currently open (there should be at most one)
function closeOpenTournamentButtonClicked() {
    // checks if no tournament is open for registration
    if (openRegistrationTournamentDocName == "") {
        console.log('No open tournaments to close');
        return;
    }

    // sets the tournament's status to closed
    firestore.doc('/tournaments/' + openRegistrationTournamentDocName).update({
        status: "closed"
    }).then(function() {
        openRegistrationTournamentDocName = "";
        removeElement(document.getElementById('closeOpenTournament'));
        removeElement(document.getElementById('closeOpenTournamentButtonBr'));
        snackbar('Tournament registration closed!');
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

// Removes an admin
function removeAdminButtonClicked() {
    // retrieves the email address to remove
    var toRemove = adminListElement.value;

    // check if no email is selected
    if (toRemove == '') {
        snackbar('You have not selected an admin to remove.');
        return;
    }

    // removes admin
    adminList.splice(adminList.indexOf(toRemove), 1);
    firestore.doc('users/permissions').update({
        admins: adminList
    }).then(function() {
        loadAdminList();
        snackbar('Admin removed!');
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

// Adds a new admin
function addNewAdminButtonClicked() {
    // retrieves the email address to add
    var toAdd = newAdminEmailElement.value;

    // check if email address is invalid
    if (!isValidEmailAddress(toAdd)) {
        snackbar('Please enter a valid email address.');
        return;
    }

    // prevents double adding the same admin email address
    loadAdminList();
    if (adminList.includes(toAdd)) {
        snackbar('This email address is already an admin');
        return;
    }

    // adds admin
    adminList.push(toAdd);
    firestore.doc('users/permissions').update({
        admins: adminList
    }).then(function() {
        loadAdminList();
        snackbar('Admin added!');
    }).catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}