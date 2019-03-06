// When the tab button for tournament registration is clicked
function tournamentRegistrationTabButtonClicked() {
    tabButtonClicked(tournamentRegistrationTabButtonElement, tournamentRegistrationTabElement);
}

// When the tab button for edit information is clicked
function editInformationTabButtonClicked() {
    tabButtonClicked(editInformationTabButtonElement, editInformationTabElement);
}

// When the tab button for equipment sizes is clicked
function equipmentSizesTabButtonClicked() {
    tabButtonClicked(equipmentSizesTabButtonElement, equipmentSizesTabElement);
}

// When the tab button for create tournament is clicked
function createTournamentTabButtonClicked() {
    tabButtonClicked(createTournamentTabButtonElement, createTournamentTabElement);
}

// When the tab button for manage tournaments is clicked
function manageTournamentsTabButtonClicked() {
    tabButtonClicked(manageTournamentsTabButtonElement, manageTournamentsTabElement);
}

// When the tab button for view athletes is clicked
function viewAthletesTabButtonClicked() {
    tabButtonClicked(viewAthletesTabButtonElement, viewAthletesTabElement);
}

// Toggles the tab buttons when a button is clicked
function tabButtonClicked(buttonClicked, tabToShow) {
    for (var i = 0; i < tabButtonElements.length; i++) {
        var tabButton = tabButtonElements[i];
        if (tabButton == buttonClicked)
            tabButton.classList.add('isOnPage');
        else
            tabButton.classList.remove('isOnPage');
    }
    for (var i = 0; i < tabElements.length; i++) {
        var tab = tabElements[i];
        if (tab == tabToShow)
            tab.removeAttribute('hidden');
        else
            tab.setAttribute('hidden', 'true');
    }
}