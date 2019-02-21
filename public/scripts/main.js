// some basic settings for firebase/firestore
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

// Attach onclick methods for tab buttons
editInformationTabButtonElement.addEventListener('click', editInformationTabButtonClicked);
equipmentSizesTabButtonElement.addEventListener('click', equipmentSizesTabButtonClicked);
createTournamentTabButtonElement.addEventListener('click', createTournamentTabButtonClicked);

// Attach onclick methods for buttons
signInButtonElement.addEventListener('click', signIn);
signOutButtonElement.addEventListener('click', signOut);
registerButtonElement.addEventListener('click', register);
updateAthleteInformationButtonElement.addEventListener('click', updateInformationButtonClicked);
updateEquipmentSizesButtonElement.addEventListener('click', updateEquipmentSizesButtonClicked);
createTournamentButtonElement.addEventListener('click', createTournamentButtonClicked);

// initialize Firebase
initFirebaseAuth();
