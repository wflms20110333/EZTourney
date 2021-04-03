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
    var needEquipmentBuddy = needEquipmentBuddyElement.checked;
    var needEquipmentBuddyHogu = needEquipmentBuddyHoguElement.checked;
    var needEquipmentBuddyHelmet = needEquipmentBuddyHelmetElement.checked;
    var needEquipmentBuddyArmGuards = needEquipmentBuddyArmGuardsElement.checked;
    var needEquipmentBuddyShinGuards = needEquipmentBuddyShinGuardsElement.checked;
    var needEquipmentBuddyGloves = needEquipmentBuddyGlovesElement.checked;
    var needEquipmentBuddyFeetProtectors = needEquipmentBuddyFeetProtectorsElement.checked;
    var needEquipmentBuddyESocks = needEquipmentBuddyESocksElement.checked;
    var canBeEquipmentBuddy = canBeEquipmentBuddyElement.checked;
    var canBeEquipmentBuddyHogu = canBeEquipmentBuddyHoguElement.checked;
    var canBeEquipmentBuddyHelmet = canBeEquipmentBuddyHelmetElement.checked;
    var canBeEquipmentBuddyArmGuards = canBeEquipmentBuddyArmGuardsElement.checked;
    var canBeEquipmentBuddyShinGuards = canBeEquipmentBuddyShinGuardsElement.checked;
    var canBeEquipmentBuddyGloves = canBeEquipmentBuddyGlovesElement.checked;
    var canBeEquipmentBuddyFeetProtectors = canBeEquipmentBuddyFeetProtectorsElement.checked;
    var canBeEquipmentBuddyESocks = canBeEquipmentBuddyESocksElement.checked;
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
    if (needEquipmentBuddy || canBeEquipmentBuddy) {
        if ((needEquipmentBuddyHogu || canBeEquipmentBuddyHogu) && hoguSizeElement.value == 0 ||
            (needEquipmentBuddyHelmet || canBeEquipmentBuddyHelmet) && helmetSizeElement.value == 0 ||
            (needEquipmentBuddyArmGuards || canBeEquipmentBuddyArmGuards) && armGuardsSizeElement.value == 0 ||
            (needEquipmentBuddyShinGuards || canBeEquipmentBuddyShinGuards) && shinGuardsSizeElement.value == 0 ||
            (needEquipmentBuddyGloves || canBeEquipmentBuddyGloves) && glovesSizeElement.value == 0 ||
            (needEquipmentBuddyFeetProtectors || canBeEquipmentBuddyFeetProtectors) && socksSizeElement.value == 0 ||
            (needEquipmentBuddyESocks || canBeEquipmentBuddyESocks) && socksSizeElement.value == 0) {
            snackbar("Please fill out sizes for checked equipment on the 'Equipment Sizes' tab");
            return;
        }
    }

    var textQuestionResponses = [];
    var textResponses = document.getElementsByClassName('optionalTextInput');
    for (var i = 0; i < textResponses.length; i++)
        textQuestionResponses.push(textResponses[i].value);

    var checkboxQuestionResponses = [];
    var checkboxResponses = document.getElementsByClassName('optionalCheckboxInput');
    for (var i = 0; i < checkboxResponses.length; i++) {
        var str = '';
        var children = checkboxResponses[i].children;
        for (var j = 0; j < children.length; j++) {
            if (children[j].type != 'checkbox' || !children[j].checked)
                continue;
            if (str.length > 0)
                str += ', ';
            str += children[j].name;
        }
        checkboxQuestionResponses.push(str);
    }

    var selectQuestionResponses = [];
    var selectResponses = document.getElementsByClassName('optionalSelectInput');
    for (var i = 0; i < selectResponses.length; i++)
        selectQuestionResponses.push(selectResponses[i].children[1].value);
    
    // submit data
    var registeredAthletesRef = firestore.collection("tournaments").doc(openRegistrationTournamentDocName).collection('registeredAthletes');
    registeredAthletesRef.doc('sharedInfo').get().then(function(doc) {
        var timestamp = 1;
        if (doc.exists) {
            // retrieve the document's data
            var data = doc.data();
            // get timestamp, the order in which the athlete registered
            timestamp = (data.timestamp == null ? 0 : data.timestamp) + 1;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document: tournaments/" + openRegistrationTournamentDocName + "/registeredAthletes/sharedInfo");
        }

        // send registration information to database
        registeredAthletesRef.doc(getUserUID()).set({
            userUID: getUserUID(),
            poomsae: poomsae,
            sparring: sparring,
            needEquipmentBuddy: needEquipmentBuddy,
            needEquipmentBuddyHogu: needEquipmentBuddyHogu,
            needEquipmentBuddyHelmet: needEquipmentBuddyHelmet,
            needEquipmentBuddyArmGuards: needEquipmentBuddyArmGuards,
            needEquipmentBuddyShinGuards: needEquipmentBuddyShinGuards,
            needEquipmentBuddyGloves: needEquipmentBuddyGloves,
            needEquipmentBuddyFeetProtectors: needEquipmentBuddyFeetProtectors,
            needEquipmentBuddyESocks: needEquipmentBuddyESocks,
            canBeEquipmentBuddy: canBeEquipmentBuddy,
            canBeEquipmentBuddyHogu: canBeEquipmentBuddyHogu,
            canBeEquipmentBuddyHelmet: canBeEquipmentBuddyHelmet,
            canBeEquipmentBuddyArmGuards: canBeEquipmentBuddyArmGuards,
            canBeEquipmentBuddyShinGuards: canBeEquipmentBuddyShinGuards,
            canBeEquipmentBuddyGloves: canBeEquipmentBuddyGloves,
            canBeEquipmentBuddyFeetProtectors: canBeEquipmentBuddyFeetProtectors,
            canBeEquipmentBuddyESocks: canBeEquipmentBuddyESocks,
            notes: notes,
            textQuestionResponses: textQuestionResponses,
            checkboxQuestionResponses: checkboxQuestionResponses,
            selectQuestionResponses: selectQuestionResponses,
            timestamp: timestamp
        }).then(function() {
            // snackbar
            snackbar('Successfully registered for tournament!');
            // update timestamp/number of registered athletes
            registeredAthletesRef.doc('sharedInfo').set({
                timestamp: timestamp
            }).then(function() {
                console.log('Successfully updated timestamp in sharedInfo');
            }).catch(function(error){
                console.log('Was not able to update timestamp in sharedInfo');
                console.log(error);
            });
            // reload page
            setTimeout(function(){ location.reload(); }, 3000);
        }).catch(function(error) {
            console.error("Error writing new athlete's registration information to Firebase Database", error);
        });
    }).catch(function(error) {
        console.log("Error getting document:", error);
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

// Adds an optional text input creation form element
function addTextInputButtonClicked() {
    textInputWrapperElement.insertBefore(createTextInputElement('Optional Question (Text Response)', 'optionalText'), addTextInputButtonElement);
}

// Adds an optional checkbox input creation form element
function addCheckboxInputButtonClicked() {
    var numCheckboxes = numCheckboxesElement.value;
    if (numCheckboxes < 1) {
        snackbar('Number of checkboxes must be positive');
        return;
    }
    checkboxInputWrapperElement.insertBefore(createMultipleChoiceInputCreationElement(numCheckboxes, 
        'checkboxCreation', 'Optional Question (Checkboxes)'), numCheckboxesLabelElement);
    numCheckboxesElement.value = '';
}

// Adds an optional checkbox input creation form element
function addSelectInputButtonClicked() {
    var numSelects = numSelectsElement.value;
    if (numSelects < 1) {
        snackbar('Number of choices must be positive');
        return;
    }
    selectInputWrapperElement.insertBefore(createMultipleChoiceInputCreationElement(numSelects, 
        'selectCreation', 'Optional Question (Multiple Choice)'), numSelectsLabelElement);
    numSelectsElement.value = '';
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
        else {
            snackbar('Please fill out all text questions');
            return;
        }
    }

    var checkboxQuestions = {};
    questionsElements = document.getElementsByClassName('checkboxCreation');
    for (var i = 0; i < questionsElements.length; i++) {
        var children = questionsElements[i].children;
        var question = children[0].children[1].value;
        if (question == "") {
            snackbar('Please fill out all checkbox questions');
            return;
        }
        var arr = [];
        for (var j = 1; j < children.length; j++) {
            var choice = children[j].children[1].value;
            if (choice == "") {
                snackbar('Please fill out all checkbox choices');
                return;
            }
            arr.push(choice);
        }
        checkboxQuestions[question] = arr;
    }

    var selectQuestions = {};
    questionsElements = document.getElementsByClassName('selectCreation');
    for (var i = 0; i < questionsElements.length; i++) {
        var children = questionsElements[i].children;
        var question = children[0].children[1].value;
        if (question == "") {
            snackbar('Please fill out all select questions');
            return;
        }
        var arr = [];
        for (var j = 1; j < children.length; j++) {
            var choice = children[j].children[1].value;
            if (choice == "") {
                snackbar('Please fill out all select choices');
                return;
            }
            arr.push(choice);
        }
        selectQuestions[question] = arr;
    }

    // submit data
    addTournamentToDatabase(tournamentName, tournamentMessage, tournamentDate, tournamentSignUpDueDate, tournamentFees, 
        tournamentContact, textQuestions, checkboxQuestions, selectQuestions);
}

// Adds a tournament to the database
function addTournamentToDatabase(name, message, date, signUpDueDate, fees, contact, textQuestions, 
    checkboxQuestions, selectQuestions) {
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
        textQuestions: textQuestions,
        checkboxQuestions: checkboxQuestions,
        selectQuestions: selectQuestions,
    }).then(function() {
        var success = true;
        /* OLD IMPLEMENTATION OF STORING CHECKBOX/SELECT CHOICES
        var keyIt = checkboxChoices.keys();
        var key = keyIt.next();
        while (!key.done) {
            tournamentsRef.doc(tournamentDocName).collection('checkboxQuestions').doc(concatenateString(key.value.split(" "))).set({
                question: key.value,
                choices: checkboxChoices.get(key.value)
            }).catch(function(error) {
                success = false;
                console.error("Error writing new tournament's information to Firebase Database", error);
            });
            key = keyIt.next();
        }
        keyIt = selectChoices.keys();
        key = keyIt.next();
        while (!key.done) {
            tournamentsRef.doc(tournamentDocName).collection('selectQuestions').doc(concatenateString(key.value.split(" "))).set({
                question: key.value,
                choices: selectChoices.get(key.value)
            }).catch(function(error) {
                success = false;
                console.error("Error writing new tournament's information to Firebase Database", error);
            });
            key = keyIt.next();
        }
        */
        // this actually probably doesn't work -- the database queries are slow and a separate thread
        if (success) {
            snackbar("Tournament successfully created and open for registration!");
            setTimeout(function(){ location.reload(); }, 3000);
        }
    }).catch(function(error) {
        console.error("Error writing new tournament's information to Firebase Database", error);
    });;
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