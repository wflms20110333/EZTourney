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
        snackbar("Please complete all information on 'Edit Information' tab first");
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
            snackbar("Please fill out sizes for checked equipment on 'Equipment Sizes' tab");
            return;
        }
    }
    
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
        notes: notes
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

// Creates a tournament
function createTournamentButtonClicked() {
    // retrieve values
    var tournamentName = tournamentNameElement.value;
    var tournamentMessage = tournamentMessageElement.value;
    var tournamentDate = tournamentDateElement.value;
    var tournamentSignUpDueDate = tournamentSignUpDueDateElement.value;
    var tournamentFees = tournamentFeesElement.value;
    var tournamentContact = tournamentContactElement.value;

    // check for missing required fields
    if (tournamentName == "" ||
        tournamentDate == "" ||
        tournamentContact == "") {
        snackbar('Please fill out all required fields');
        return;
    }

    // check if there are other open tournaments
    if (openRegistrationTournamentDocName != "") {
        snackbar('Cannot have more than one tournament open for registration; please close the other first');
        return;
    }

    // submit data
    addTournamentToDatabase(tournamentName, tournamentMessage, tournamentDate, tournamentSignUpDueDate, tournamentFees, tournamentContact);
}

// Adds a tournament to the database
function addTournamentToDatabase(name, message, date, signUpDueDate, fees, contact) {
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
        contact: contact
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