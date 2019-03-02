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

// Loads all open tournaments to the registration page
function loadOpenTournamentRegistrations() {
    firestore.collection('tournaments').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var data = doc.data();
            if (data.status == 'open') {
                addTournamentRegistrationForm(data); // adds the registration form
                openRegistrationTournamentDocName = data.documentID; // updates the reference
            }
        });
        
        // add the copyright message
        var copyright = document.createElement('p');
        copyright.setAttribute('class', 'copyright');
        copyright.appendChild(document.createTextNode('Copyright © 2019 MIT Sport Taekwondo'));
        tournamentRegistrationTabElement.appendChild(copyright);

        // loads the tournament registration elements
        loadTournamentRegistrationElements();
    });
}

// Adds a tournament registration form to the register tab
function addTournamentRegistrationForm(tournamentData) {
    // TODO: if registered for this tournament, display alternative message!!

    // create the registration form
    var inputForm = document.createElement('div');
    inputForm.setAttribute('class', 'inputForm');

    // create title element
    var title = document.createElement('h1');
    title.appendChild(document.createTextNode(tournamentData.name));
    inputForm.appendChild(title);

    // create message element
    if (tournamentData.message != "") {
        var message = document.createElement('p');
        var lines = tournamentData.message.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (i > 0)
                message.appendChild(document.createElement('br'));
            message.appendChild(document.createTextNode(lines[i]));
        }
        inputForm.appendChild(message);
    }
    
    // create description element
    var description = document.createElement('p');
    description.appendChild(document.createTextNode("Date: " + tournamentData.date));
    if (tournamentData.signUpDueDate != "") {
        description.appendChild(document.createElement('br'));
        description.appendChild(document.createTextNode("Sign up due date: " + tournamentData.signUpDueDate));
    }
    if (tournamentData.fees != "") {
        description.appendChild(document.createElement('br'));
        description.appendChild(document.createTextNode("Tournament fees: " + tournamentData.fees));
    }
    description.appendChild(document.createElement('br'));
    description.appendChild(document.createTextNode("Contact " + tournamentData.contact + " for any questions~"));
    inputForm.appendChild(description);

    // which events they're competing in
    var events = document.createElement('div');
    events.setAttribute('class', 'formInput');

    var eventsTitle = document.createElement('div');
    eventsTitle.setAttribute('class', 'inputLabel requiredField');
    eventsTitle.appendChild(document.createTextNode('Events'));
    events.appendChild(eventsTitle);

    var poomsae = document.createElement('input');
    poomsae.setAttribute('id', 'poomsae');
    poomsae.setAttribute('type', 'checkbox');
    events.appendChild(poomsae);
    events.appendChild(document.createTextNode(' Poomsae'));
    events.appendChild(document.createElement('br'));

    var sparring = document.createElement('input');
    sparring.setAttribute('id', 'sparring');
    sparring.setAttribute('type', 'checkbox');
    events.appendChild(sparring);
    events.appendChild(document.createTextNode(' Sparring'));
    events.appendChild(document.createElement('br'));

    inputForm.appendChild(events);
    
    // need/can be an equipment buddy
    var equipmentBuddy = document.createElement('div');
    equipmentBuddy.setAttribute('class', 'formInput');

    var equipmentBuddyTitle = document.createElement('div');
    equipmentBuddyTitle.setAttribute('class', 'inputLabel');
    equipmentBuddyTitle.appendChild(document.createTextNode('Equipment Buddy?'));
    equipmentBuddy.appendChild(equipmentBuddyTitle);

    var dropdown = document.createElement('select');
    dropdown.setAttribute('id', 'equipmentBuddy');

    var optionSelect = document.createElement('option');
    optionSelect.setAttribute('selected', 'true');
    optionSelect.setAttribute('value', '');
    optionSelect.appendChild(document.createTextNode(' -- select an option -- '));
    dropdown.appendChild(optionSelect);

    var needEquipmentBuddy = document.createElement('option');
    needEquipmentBuddy.setAttribute('value', 'needEquipmentBuddy');
    needEquipmentBuddy.appendChild(document.createTextNode('Need an equipment buddy'));
    dropdown.appendChild(needEquipmentBuddy);

    var canBeEquipmentBuddy = document.createElement('option');
    canBeEquipmentBuddy.setAttribute('value', 'canBeEquipmentBuddy');
    canBeEquipmentBuddy.appendChild(document.createTextNode('Can be an equipment buddy'));
    dropdown.appendChild(canBeEquipmentBuddy);

    equipmentBuddy.appendChild(dropdown);

    inputForm.appendChild(equipmentBuddy);

    // which equipment needed/can lend out
    var equipment = document.createElement('div');
    equipment.setAttribute('class', 'formInput');

    var equipmentTitle = document.createElement('div');
    equipmentTitle.setAttribute('class', 'inputLabel');
    equipmentTitle.appendChild(document.createTextNode('If you need/can be an equipment buddy, what do you need/can lend out?'));
    equipment.appendChild(equipmentTitle);

    var hogu = document.createElement('input');
    hogu.setAttribute('id', 'equipmentBuddyHogu');
    hogu.setAttribute('type', 'checkbox');
    equipment.appendChild(hogu);
    equipment.appendChild(document.createTextNode(' Hogu'));
    equipment.appendChild(document.createElement('br'));

    var helmet = document.createElement('input');
    helmet.setAttribute('id', 'equipmentBuddyHelmet');
    helmet.setAttribute('type', 'checkbox');
    equipment.appendChild(helmet);
    equipment.appendChild(document.createTextNode(' Helmet'));
    equipment.appendChild(document.createElement('br'));

    var armGuards = document.createElement('input');
    armGuards.setAttribute('id', 'equipmentBuddyArmGuards');
    armGuards.setAttribute('type', 'checkbox');
    equipment.appendChild(armGuards);
    equipment.appendChild(document.createTextNode(' Arm Guards'));
    equipment.appendChild(document.createElement('br'));

    var shinGuards = document.createElement('input');
    shinGuards.setAttribute('id', 'equipmentBuddyShinGuards');
    shinGuards.setAttribute('type', 'checkbox');
    equipment.appendChild(shinGuards);
    equipment.appendChild(document.createTextNode(' Shin Guards'));
    equipment.appendChild(document.createElement('br'));

    var gloves = document.createElement('input');
    gloves.setAttribute('id', 'equipmentBuddyGloves');
    gloves.setAttribute('type', 'checkbox');
    equipment.appendChild(gloves);
    equipment.appendChild(document.createTextNode(' Gloves'));
    equipment.appendChild(document.createElement('br'));

    var feetProtectors = document.createElement('input');
    feetProtectors.setAttribute('id', 'equipmentBuddyFeetProtectors');
    feetProtectors.setAttribute('type', 'checkbox');
    equipment.appendChild(feetProtectors);
    equipment.appendChild(document.createTextNode(' Feet Protectors'));
    equipment.appendChild(document.createElement('br'));

    var eSocks = document.createElement('input');
    eSocks.setAttribute('id', 'equipmentBuddyESocks');
    eSocks.setAttribute('type', 'checkbox');
    equipment.appendChild(eSocks);
    equipment.appendChild(document.createTextNode(' Daedo E-Socks'));
    equipment.appendChild(document.createElement('br'));

    inputForm.appendChild(equipment);

    // special notes
    var notes = document.createElement('div');
    notes.setAttribute('class', 'formInput');

    var notesTitle = document.createElement('div');
    notesTitle.setAttribute('class', 'inputLabel');
    notesTitle.appendChild(document.createTextNode('Special Notes (cutting, injuries, etc.)'));
    notes.appendChild(notesTitle);

    var notesInput = document.createElement('textarea');
    notesInput.setAttribute('id', 'tournamentRegistrationNotes');
    notes.appendChild(notesInput);

    inputForm.appendChild(notes);

    // reminder to update belt rank and weight division/weight
    var reminder = document.createElement('div');
    reminder.setAttribute('class', 'formInput');

    var reminderTitle = document.createElement('div');
    reminderTitle.setAttribute('class', 'inputLabel requiredField');
    reminderTitle.appendChild(document.createTextNode('Reminder!'));
    reminder.appendChild(reminderTitle);

    var confirmationStatement = document.createElement('input');
    confirmationStatement.setAttribute('id', 'confirmationStatement');
    confirmationStatement.setAttribute('type', 'checkbox');
    reminder.appendChild(confirmationStatement);
    reminder.appendChild(document.createTextNode(' By selecting this box, I confirm that my belt rank and weight division/weight are up to date.'));
    reminder.appendChild(document.createElement('br'));

    inputForm.appendChild(reminder);

    var submitButton = document.createElement('a');
    submitButton.setAttribute('class', 'button');
    submitButton.setAttribute('target', '_blank');
    submitButton.setAttribute('id', 'registerForTournament');
    submitButton.appendChild(document.createTextNode('Register for Tournament!'));
    inputForm.appendChild(submitButton);

    document.getElementById('tournamentRegistrationTab').appendChild(inputForm);
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
    // clear tournament elements
    tournamentElements = [];

    // individually create each tournament element
    firestore.collection('tournaments').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var data = doc.data();
            console.log(data.date);
            tournamentElements.push(createTournamentManagementElement(doc));
        });

        // add all tournament elements to the tab
        for (var i = tournamentElements.length - 1; i >= 0; i--)
            manageTournamentsTabElement.appendChild(tournamentElements[i]);
        
        // add the copyright message
        var copyright = document.createElement('p');
        copyright.setAttribute('class', 'copyright');
        copyright.appendChild(document.createTextNode('Copyright © 2019 MIT Sport Taekwondo'));
        manageTournamentsTabElement.appendChild(copyright);

        // // loads the tournament registration elements
        // loadTournamentRegistrationElements();
    });
}

function createTournamentManagementElement(tournamentDoc) {
    // retrieve tournament data
    var tournamentData = tournamentDoc.data();

    // creates the wrapper block for the tournament
    var tournamentBlock = document.createElement('div');
    tournamentBlock.setAttribute('class', 'inputForm inputFormLarge');
    
    // create title element
    var title = document.createElement('h1');
    title.appendChild(document.createTextNode(tournamentData.name));
    tournamentBlock.appendChild(title);

    return tournamentBlock;
}