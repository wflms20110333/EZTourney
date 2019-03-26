// Loads database information into forms
function loadAthleteInformation() {
    firestore.doc('/athletes/' + getUserUID()).get().then(function(doc) {
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
            athleteWeightElement.value = data.weight == -1 ? '' : data.weight;
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

// Loads all open tournaments to the registration page
function loadOpenTournamentRegistrations() {
    // remove previously loaded information
    removeAllChildren(tournamentRegistrationTabElement);
    // add tournament registration forms
    firestore.collection('tournaments').get().then(function(querySnapshot) {
        // variable that stores whether there are tournaments open for registration
        var openTournamentExists = false;
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var path = doc.ref.path;
            var data = doc.data();
            if (data.status == 'open') {
                // open tournament
                openTournamentExists = true;
                firestore.doc('/tournaments/' + doc.id + '/registeredAthletes/' + getUserUID()).get().then(function(doc) {
                    var tournamentRegistrationElement = null;
                    if (doc.exists) {
                        // athlete is already registered, display alternative message
                        tournamentRegistrationElement = createTournamentRegistrationElement(data, true, path);
                    } else {
                        // athlete is not registered
                        tournamentRegistrationElement = createTournamentRegistrationElement(data, false, path);
                    }
                    // adds the registration form
                    tournamentRegistrationTabElement.prepend(tournamentRegistrationElement); // the prepend method may not work for all browsers
                    // updates the reference
                    openRegistrationTournamentDocName = data.documentID;
                    // loads the tournament registration elements if the input form was created
                    if (!doc.exists)
                        loadTournamentRegistrationElements();
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            }
        });
        // if there are no open tournaments, display alternative message
        if (!openTournamentExists)
            tournamentRegistrationTabElement.appendChild(createDisplayMessageElement('There are no tournaments open for registration!'));
        // add the copyright message
        tournamentRegistrationTabElement.appendChild(createCopyrightElement());
    });
}

// Loads tournament registration elements and adds onclick method for registerForTournament button
function loadTournamentRegistrationElements() {
    eventsPoomsaeElement = document.getElementById('poomsae');
    eventsSparringElement = document.getElementById('sparring');
    equipmentBuddyElement = document.getElementById('equipmentBuddy');
    equipmentBuddyHoguElement = document.getElementById('equipmentBuddyHogu');
    equipmentBuddyHelmetElement = document.getElementById('equipmentBuddyHelmet');
    equipmentBuddyArmGuardsElement = document.getElementById('equipmentBuddyArmGuards');
    equipmentBuddyShinGuardsElement = document.getElementById('equipmentBuddyShinGuards');
    equipmentBuddyGlovesElement = document.getElementById('equipmentBuddyGloves');
    equipmentBuddyFeetProtectorsElement = document.getElementById('equipmentBuddyFeetProtectors');
    equipmentBuddyESocksElement = document.getElementById('equipmentBuddyESocks');
    tournamentRegistrationNotesElement = document.getElementById('tournamentRegistrationNotes');
    tournamentRegistrationConfirmationElement = document.getElementById('confirmationStatement');

    registerForTournamentButtonElement = document.getElementById('registerForTournament');
    registerForTournamentButtonElement.addEventListener('click', registerForTournamentButtonClicked);
}

// Loads all open tournaments to the registration page
function loadManageTournamentsPage() {
    // remove previously loaded information
    removeAllChildren(manageTournamentsTabElement);
    // clear tournament elements
    tournamentElements = [];
    // individually create each tournament element
    firestore.collection('tournaments').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var data = doc.data();
            tournamentElements.push(createTournamentManagementElement(data, '/tournaments/' + data.documentID + '/'));
        });
        // if there are no tournaments, display alternative message
        if (tournamentElements.length == 0)
            manageTournamentsTabElement.appendChild(createDisplayMessageElement("There are no tournaments! You can add a new tournament on the 'Create Tournament' tab."))
        // add all tournament elements to the tab
        for (var i = tournamentElements.length - 1; i >= 0; i--)
            manageTournamentsTabElement.appendChild(tournamentElements[i]);
        // add the copyright message
        manageTournamentsTabElement.appendChild(createCopyrightElement());
    });
}

// Loads the view athletes page
function loadViewAthletesPage() {
    // remove previously loaded information
    removeAllChildren(viewAthletesTabElement);
    // reload elements
    viewAthletesTabElement.appendChild(createViewAthleteInformationElement());
    viewAthletesTabElement.appendChild(createViewEquipmentSizesElement());
    viewAthletesTabElement.appendChild(createCopyrightElement());
}

// Loads the list of admins on the manage users tab
function loadAdminList() {
    firestore.doc('/users/permissions').get().then(function(doc) {
        // resets the list of admins
        removeAllChildren(adminListElement);
        // sorted list of admins
        adminList = doc.data().admins.sort();
        for (var i = 0; i < adminList.length; i++) {
            var optionElement = document.createElement('option');
            optionElement.setAttribute('value', adminList[i]);
            optionElement.appendChild(document.createTextNode(adminList[i]));
            adminListElement.appendChild(optionElement);
        }
        adminListElement.setAttribute('size', adminList.length);
    });
}