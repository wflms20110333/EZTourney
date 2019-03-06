// Creates a copyright message element
function createCopyrightElement() {
    var copyright = document.createElement('p');
    copyright.setAttribute('class', 'copyright');
    copyright.appendChild(document.createTextNode('Copyright © 2019 MIT Sport Taekwondo'));
    return copyright;
}

// Creates a generic element that displays a message
function createDisplayMessageElement(message) {
    var displayBlock = document.createElement('div');
    displayBlock.setAttribute('class', 'inputForm');

    var messageElement = document.createElement('div');
    messageElement.appendChild(document.createTextNode(message));
    displayBlock.appendChild(messageElement);

    return displayBlock;
}

// Creates a tournament registration element
function createTournamentRegistrationElement(tournamentData, registered) {
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

    // creates the input part of the form, or displays alternative message if already registered
    if (registered) {
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
    } else {
        var alreadyRegistered = document.createElement('div');
        alreadyRegistered.appendChild(document.createTextNode('You have already registered for this tournament! Contact the organizer to make changes to your registration.'));
        inputForm.appendChild(alreadyRegistered);
    }

    return inputForm;
}

// Creates the element for a tournament on the management screen
function createTournamentManagementElement(tournamentData, path) {
    // creates the wrapper block for the tournament
    var tournamentBlock = document.createElement('div');
    tournamentBlock.setAttribute('class', 'inputForm inputFormLarge');
    
    // create title element
    var title = document.createElement('h1');
    title.appendChild(document.createTextNode(tournamentData.name));
    tournamentBlock.appendChild(title);

    // create message element
    if (tournamentData.message != "") {
        var message = document.createElement('p');
        var lines = tournamentData.message.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (i > 0)
                message.appendChild(document.createElement('br'));
            message.appendChild(document.createTextNode(lines[i]));
        }
        tournamentBlock.appendChild(message);
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
    description.appendChild(document.createTextNode("Contact information of organizer: " + tournamentData.contact));
    tournamentBlock.appendChild(description);

    if (tournamentData.status == "open") {
        // option to close an open tournament
        var closeTournamentButton = document.createElement('a');
        closeTournamentButton.setAttribute('class', 'button');
        closeTournamentButton.setAttribute('target', '_blank');
        closeTournamentButton.setAttribute('id', 'closeOpenTournament');
        closeTournamentButton.appendChild(document.createTextNode('Close registration'));
        closeTournamentButton.addEventListener('click', closeOpenTournamentButtonClicked);
        tournamentBlock.appendChild(closeTournamentButton);

        var lineBreak = document.createElement('br');
        lineBreak.setAttribute('id', 'closeOpenTournamentButtonBr');
        tournamentBlock.appendChild(lineBreak);
    }

    /*
    // create show/hide registered athletes button
    var submitButton = document.createElement('a');
    submitButton.setAttribute('class', 'button');
    submitButton.setAttribute('target', '_blank');
    // submitButton.setAttribute('id', 'registerForTournament');
    submitButton.appendChild(document.createTextNode('Show registered athletes')); // add onclick to toggle table display?
    tournamentBlock.appendChild(submitButton);
    */

    var registeredAthletesTitle = document.createElement('h2');
    registeredAthletesTitle.appendChild(document.createTextNode('Registered Athletes'));
    tournamentBlock.appendChild(registeredAthletesTitle);

    // create registered athletes table
    var registeredAthletesTable = document.createElement('table');

    var headerRow = document.createElement('tr');

    var headerName = document.createElement('th');
    headerName.appendChild(document.createTextNode('Name'));
    headerRow.appendChild(headerName);

    var headerEvents = document.createElement('th');
    headerEvents.appendChild(document.createTextNode('Events'));
    headerRow.appendChild(headerEvents);

    var headerYear = document.createElement('th');
    headerYear.appendChild(document.createTextNode('Year'));
    headerRow.appendChild(headerYear);

    var headerGender = document.createElement('th');
    headerGender.appendChild(document.createTextNode('Gender'));
    headerRow.appendChild(headerGender);

    var headerBelt = document.createElement('th');
    headerBelt.appendChild(document.createTextNode('Belt'));
    headerRow.appendChild(headerBelt);

    var headerWeightDivision = document.createElement('th');
    headerWeightDivision.appendChild(document.createTextNode('Weight Division'));
    headerRow.appendChild(headerWeightDivision);

    var headerWeight = document.createElement('th');
    headerWeight.appendChild(document.createTextNode('Weight'));
    headerRow.appendChild(headerWeight);

    var headerNotes = document.createElement('th');
    headerNotes.appendChild(document.createTextNode('Notes'));
    headerRow.appendChild(headerNotes);

    registeredAthletesTable.appendChild(headerRow);
    
    firestore.collection(path + 'registeredAthletes').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var data = doc.data();

            // create event string
            var events = "";
            if (data.poomsae && data.sparring)
                events = "poomsae, sparring";
            else if (data.poomsae)
                events = "poomsae";
            else
                events = "sparring";

            var currentRow = document.createElement('tr');

            // adds information of athlete
            firestore.doc('/athletes/' + doc.id).get().then(function(doc) {
                // retrieve the document's data
                var athleteData = doc.data();

                var currentName = document.createElement('td');
                currentName.appendChild(document.createTextNode(athleteData.name));
                currentRow.appendChild(currentName);

                var currentEvents = document.createElement('td');
                currentEvents.appendChild(document.createTextNode(events));
                currentRow.appendChild(currentEvents);

                var currentYear = document.createElement('td');
                currentYear.appendChild(document.createTextNode(athleteData.year));
                currentRow.appendChild(currentYear);

                var currentGender = document.createElement('td');
                currentGender.appendChild(document.createTextNode(athleteData.gender));
                currentRow.appendChild(currentGender);

                var currentBelt = document.createElement('td');
                currentBelt.appendChild(document.createTextNode(athleteData.belt));
                currentRow.appendChild(currentBelt);

                var currentWeightDivision = document.createElement('td');
                currentWeightDivision.appendChild(document.createTextNode(athleteData.weightDivision));
                currentRow.appendChild(currentWeightDivision);

                var currentWeight = document.createElement('td');
                currentWeight.appendChild(document.createTextNode(athleteData.weight));
                currentRow.appendChild(currentWeight);

                var currentNotes = document.createElement('td');
                currentNotes.appendChild(document.createTextNode(data.notes));
                currentRow.appendChild(currentNotes);
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

            registeredAthletesTable.appendChild(currentRow);
        });
    });
    
    tournamentBlock.appendChild(registeredAthletesTable);

    return tournamentBlock;
}

// Creates an element of athlete information for admin viewing
function createViewAthleteInformationElement() {
    // creates the wrapper block for the tournament
    var displayBlock = document.createElement('div');
    displayBlock.setAttribute('class', 'inputForm inputFormLarge');
    
    // create title element
    var title = document.createElement('h1');
    title.appendChild(document.createTextNode('Athlete Information'));
    displayBlock.appendChild(title);

    // create athletes table
    var athletesTable = document.createElement('table');

    var headerRow = document.createElement('tr');

    var headerName = document.createElement('th');
    headerName.appendChild(document.createTextNode('Name'));
    headerRow.appendChild(headerName);

    var headerYear = document.createElement('th');
    headerYear.appendChild(document.createTextNode('Year'));
    headerRow.appendChild(headerYear);

    var headerGender = document.createElement('th');
    headerGender.appendChild(document.createTextNode('Gender'));
    headerRow.appendChild(headerGender);

    var headerKerberos = document.createElement('th');
    headerKerberos.appendChild(document.createTextNode('Kerberos'));
    headerRow.appendChild(headerKerberos);

    var headerPhoneNumber = document.createElement('th');
    headerPhoneNumber.appendChild(document.createTextNode('Phone'));
    headerRow.appendChild(headerPhoneNumber);

    var headerBelt = document.createElement('th');
    headerBelt.appendChild(document.createTextNode('Belt'));
    headerRow.appendChild(headerBelt);

    var headerWeightDivision = document.createElement('th');
    headerWeightDivision.appendChild(document.createTextNode('Weight Division'));
    headerRow.appendChild(headerWeightDivision);

    var headerWeight = document.createElement('th');
    headerWeight.appendChild(document.createTextNode('Weight'));
    headerRow.appendChild(headerWeight);

    var headerEmergencyContactName = document.createElement('th');
    headerEmergencyContactName.appendChild(document.createTextNode('Emergency Contact Name'));
    headerRow.appendChild(headerEmergencyContactName);

    var headerEmergencyContactPhone = document.createElement('th');
    headerEmergencyContactPhone.appendChild(document.createTextNode('Emergency Contact Phone'));
    headerRow.appendChild(headerEmergencyContactPhone);

    athletesTable.appendChild(headerRow);
    
    firestore.collection('athletes').get().then(function(querySnapshot) {
        // creates a list and dictionary that will sort the athletes alphabetically
        var athleteNames = [];
        var elementsDictionary = {};

        // processes each athlete document
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var athleteData = doc.data();

            // if the athlete's information is not filled out, does not add them to the table
            if (athleteData.name != null && athleteData.name != '') {
                var currentRow = document.createElement('tr');

                var currentName = document.createElement('td');
                currentName.appendChild(document.createTextNode(athleteData.name));
                currentRow.appendChild(currentName);

                var currentYear = document.createElement('td');
                currentYear.appendChild(document.createTextNode(athleteData.year));
                currentRow.appendChild(currentYear);

                var currentGender = document.createElement('td');
                currentGender.appendChild(document.createTextNode(athleteData.gender));
                currentRow.appendChild(currentGender);

                var currentKerberos = document.createElement('td');
                currentKerberos.appendChild(document.createTextNode(athleteData.kerberos));
                currentRow.appendChild(currentKerberos);

                var currentPhoneNumber = document.createElement('td');
                currentPhoneNumber.appendChild(document.createTextNode(athleteData.phoneNumber));
                currentRow.appendChild(currentPhoneNumber);

                var currentBelt = document.createElement('td');
                currentBelt.appendChild(document.createTextNode(athleteData.belt));
                currentRow.appendChild(currentBelt);

                var currentWeightDivision = document.createElement('td');
                currentWeightDivision.appendChild(document.createTextNode(athleteData.weightDivision));
                currentRow.appendChild(currentWeightDivision);

                var currentWeight = document.createElement('td');
                currentWeight.appendChild(document.createTextNode(athleteData.weight));
                currentRow.appendChild(currentWeight);

                var currentEmergencyContactName = document.createElement('td');
                currentEmergencyContactName.appendChild(document.createTextNode(athleteData.emergencyContactName));
                currentRow.appendChild(currentEmergencyContactName);

                var currentEmergencyContactPhone = document.createElement('td');
                currentEmergencyContactPhone.appendChild(document.createTextNode(athleteData.emergencyContactPhone));
                currentRow.appendChild(currentEmergencyContactPhone);

                athleteNames.push(athleteData.name);
                elementsDictionary[athleteData.name] = currentRow;
            }
        });

        // sorts athletes by name and append them to the table
        athleteNames.sort();
        for (var i = 0; i < athleteNames.length; i++)
            athletesTable.appendChild(elementsDictionary[athleteNames[i]]);
    });

    displayBlock.appendChild(athletesTable);

    return displayBlock;
}

// Creates an element of equipment sizes for admin viewing
function createViewEquipmentSizesElement() {
    // creates the wrapper block for the tournament
    var displayBlock = document.createElement('div');
    displayBlock.setAttribute('class', 'inputForm inputFormLarge');
    
    // create title element
    var title = document.createElement('h1');
    title.appendChild(document.createTextNode('Equipment Sizes'));
    displayBlock.appendChild(title);

    // create athletes table
    var equipmentSizesTable = document.createElement('table');

    var headerRow = document.createElement('tr');

    var headerName = document.createElement('th');
    headerName.appendChild(document.createTextNode('Name'));
    headerRow.appendChild(headerName);

    var headerHoguSize = document.createElement('th');
    headerHoguSize.appendChild(document.createTextNode('Hogu Size'));
    headerRow.appendChild(headerHoguSize);

    var headerHelmetSize = document.createElement('th');
    headerHelmetSize.appendChild(document.createTextNode('Helmet Size'));
    headerRow.appendChild(headerHelmetSize);

    var headerArmGuardsSize = document.createElement('th');
    headerArmGuardsSize.appendChild(document.createTextNode('Arm Guards Size'));
    headerRow.appendChild(headerArmGuardsSize);

    var headerShinGuardsSize = document.createElement('th');
    headerShinGuardsSize.appendChild(document.createTextNode('Shin Guards Size'));
    headerRow.appendChild(headerShinGuardsSize);

    var headerSocksSize = document.createElement('th');
    headerSocksSize.appendChild(document.createTextNode('Feet Protectors/E-Socks Size'));
    headerRow.appendChild(headerSocksSize);

    var headerGlovesSize = document.createElement('th');
    headerGlovesSize.appendChild(document.createTextNode('Gloves Size'));
    headerRow.appendChild(headerGlovesSize);

    equipmentSizesTable.appendChild(headerRow);
    
    firestore.collection('athletes').get().then(function(querySnapshot) {
        // creates a list and dictionary that will sort the athletes alphabetically
        var athleteNames = [];
        var elementsDictionary = {};

        // processes each athlete document
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            var athleteData = doc.data();

            // if the athlete's information is not filled out, does not add them to the table
            if (athleteData.name != null && athleteData.name != '') {
                // extract equipment sizes
                var hoguSize = athleteData.hoguSize == 0 ? '' : athleteData.hoguSize;
                var helmetSize = athleteData.helmetSize == 0 ? '' : athleteData.helmetSize;
                var armGuardsSize = athleteData.armGuardsSize == 0 ? '' : athleteData.armGuardsSize;
                var shinGuardsSize = athleteData.shinGuardsSize == 0 ? '' : athleteData.shinGuardsSize;
                var socksSize = athleteData.socksSize == 0 ? '' : athleteData.socksSize;
                var glovesSize = athleteData.glovesSize == 0 ? '' : athleteData.glovesSize;

                if (hoguSize != '' ||
                    helmetSize != '' ||
                    armGuardsSize != '' ||
                    shinGuardsSize != '' ||
                    socksSize != '' ||
                    glovesSize != '') {
                    var currentRow = document.createElement('tr');

                    var currentName = document.createElement('td');
                    currentName.appendChild(document.createTextNode(athleteData.name));
                    currentRow.appendChild(currentName);
    
                    var currentHoguSize = document.createElement('td');
                    currentHoguSize.appendChild(document.createTextNode(hoguSize));
                    currentRow.appendChild(currentHoguSize);
    
                    var currentHelmetSize = document.createElement('td');
                    currentHelmetSize.appendChild(document.createTextNode(helmetSize));
                    currentRow.appendChild(currentHelmetSize);
    
                    var currentArmGuardsSize = document.createElement('td');
                    currentArmGuardsSize.appendChild(document.createTextNode(armGuardsSize));
                    currentRow.appendChild(currentArmGuardsSize);
    
                    var currentShinGuardsSize = document.createElement('td');
                    currentShinGuardsSize.appendChild(document.createTextNode(shinGuardsSize));
                    currentRow.appendChild(currentShinGuardsSize);
    
                    var currentSocksSize = document.createElement('td');
                    currentSocksSize.appendChild(document.createTextNode(socksSize));
                    currentRow.appendChild(currentSocksSize);
    
                    var currentGlovesSize = document.createElement('td');
                    currentGlovesSize.appendChild(document.createTextNode(glovesSize));
                    currentRow.appendChild(currentGlovesSize);
    
                    athleteNames.push(athleteData.name);
                    elementsDictionary[athleteData.name] = currentRow;
                }
            }
        });

        // sorts athletes by name and append them to the table
        athleteNames.sort();
        for (var i = 0; i < athleteNames.length; i++)
            equipmentSizesTable.appendChild(elementsDictionary[athleteNames[i]]);
    });

    displayBlock.appendChild(equipmentSizesTable);

    return displayBlock;
}