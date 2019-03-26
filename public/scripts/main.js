// some basic settings for firebase/firestore
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

// Attach onclick methods for tab buttons
loginTabButtonElement.addEventListener('click', loginTabButtonClicked);
passwordResetTabButtonElement.addEventListener('click', passwordResetTabButtonClicked);
emailVerificationTabButtonElement.addEventListener('click', emailVerificationTabButtonClicked);
tournamentRegistrationTabButtonElement.addEventListener('click', tournamentRegistrationTabButtonClicked);
editInformationTabButtonElement.addEventListener('click', editInformationTabButtonClicked);
equipmentSizesTabButtonElement.addEventListener('click', equipmentSizesTabButtonClicked);
createTournamentTabButtonElement.addEventListener('click', createTournamentTabButtonClicked);
manageTournamentsTabButtonElement.addEventListener('click', manageTournamentsTabButtonClicked);
viewAthletesTabButtonElement.addEventListener('click', viewAthletesTabButtonClicked);
manageUsersTabButtonElement.addEventListener('click', manageUsersTabButtonClicked);

// Attach onclick methods for buttons
signInButtonElement.addEventListener('click', signIn);
signOutButtonElement.addEventListener('click', signOut);
verifyEmailButtonElement.addEventListener('click', sendVerificationEmail);
resetPasswordButtonElement.addEventListener('click', resetPasswordButtonClicked);
registerButtonElement.addEventListener('click', register);
updateAthleteInformationButtonElement.addEventListener('click', updateInformationButtonClicked);
updateEquipmentSizesButtonElement.addEventListener('click', updateEquipmentSizesButtonClicked);
addTextInputButtonElement.addEventListener('click', addTextInputButtonClicked);
createTournamentButtonElement.addEventListener('click', createTournamentButtonClicked);
removeAdminButtonElement.addEventListener('click', removeAdminButtonClicked);
addNewAdminButtonElement.addEventListener('click', addNewAdminButtonClicked);

// initialize Firebase
initFirebaseAuth();
