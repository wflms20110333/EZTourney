// Regex for email validation
var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// The snackbar
var snackbarElement = document.getElementById('snackbar');

// The tab
var pageTabElement = document.getElementById('pageTab');

// Tab button elements
var loginTabButtonElement = document.getElementById('loginTabButton');
var passwordResetTabButtonElement = document.getElementById('passwordResetTabButton');
var emailVerificationTabButtonElement = document.getElementById('emailVerificationTabButton');
var tournamentRegistrationTabButtonElement = document.getElementById('tournamentRegistrationTabButton');
var editInformationTabButtonElement = document.getElementById('editInformationTabButton');
var equipmentSizesTabButtonElement = document.getElementById('equipmentSizesTabButton');
var createTournamentTabButtonElement = document.getElementById('createTournamentTabButton');
var manageTournamentsTabButtonElement = document.getElementById('manageTournamentsTabButton');
var viewAthletesTabButtonElement = document.getElementById('viewAthletesTabButton');
var manageUsersTabButtonElement = document.getElementById('manageUsersTabButton');

var tabButtonElements = [loginTabButtonElement, passwordResetTabButtonElement, emailVerificationTabButtonElement, 
    tournamentRegistrationTabButtonElement, editInformationTabButtonElement, equipmentSizesTabButtonElement, 
    createTournamentTabButtonElement, manageTournamentsTabButtonElement, viewAthletesTabButtonElement, 
    manageUsersTabButtonElement];

var signedOutTabButtonElements = [loginTabButtonElement, passwordResetTabButtonElement];
var athleteTabButtonElements = [passwordResetTabButtonElement, tournamentRegistrationTabButtonElement, 
    editInformationTabButtonElement, equipmentSizesTabButtonElement];
var adminTabButtonElements = [passwordResetTabButtonElement, createTournamentTabButtonElement, 
    manageTournamentsTabButtonElement, viewAthletesTabButtonElement, manageUsersTabButtonElement];

// Tab elements
var loginTabElement = document.getElementById('loginTab');
var passwordResetTabElement = document.getElementById('passwordResetTab');
var emailVerificationTabElement = document.getElementById('emailVerificationTab');
var tournamentRegistrationTabElement = document.getElementById('tournamentRegistrationTab');
var editInformationTabElement = document.getElementById('editInformationTab');
var equipmentSizesTabElement = document.getElementById('equipmentSizesTab');
var createTournamentTabElement = document.getElementById('createTournamentTab');
var manageTournamentsTabElement = document.getElementById('manageTournamentsTab');
var viewAthletesTabElement = document.getElementById('viewAthletesTab');
var manageUsersTabElement = document.getElementById('manageUsersTab');

var tabElements = [loginTabElement, passwordResetTabElement, emailVerificationTabElement, 
    tournamentRegistrationTabElement, editInformationTabElement, equipmentSizesTabElement, 
    createTournamentTabElement, manageTournamentsTabElement, viewAthletesTabElement, manageUsersTabElement];

// Login elements
var emailInputElement = document.getElementById('email');
var passwordInputElement = document.getElementById('password');
var signInButtonElement = document.getElementById('signIn');
var registerButtonElement = document.getElementById('register');

// Logout elements
var userEmailElement = document.getElementById('userEmail');
var signOutButtonElement = document.getElementById('signOut');

// Email verification elements
var verifyEmailButtonElement = document.getElementById('verifyEmail');

// Password reset elements
var passwordResetEmailElement = document.getElementById('passwordResetEmail');
var resetPasswordButtonElement = document.getElementById('resetPassword');

// Form submission elements
var registerForTournamentButtonElement = document.getElementById('registerForTournament');
var updateAthleteInformationButtonElement = document.getElementById('updateInformation');
var updateEquipmentSizesButtonElement = document.getElementById('updateSizes');
var createTournamentButtonElement = document.getElementById('createTournament');
var removeAdminButtonElement = document.getElementById('removeAdmin');
var addNewAdminButtonElement = document.getElementById('addNewAdmin');

// Tournament registration elements, need to reassign after load
var openRegistrationTournamentDocName = ""; // need to assign later
var eventsPoomsaeElement = document.getElementById('poomsae');
var eventsSparringElement = document.getElementById('sparring');
var needEquipmentBuddyElement = document.getElementById('needEquipmentBuddy');
var needEquipmentBuddyHoguElement = document.getElementById('needEquipmentBuddyHogu');
var needEquipmentBuddyHelmetElement = document.getElementById('needEquipmentBuddyHelmet');
var needEquipmentBuddyArmGuardsElement = document.getElementById('needEquipmentBuddyArmGuards');
var needEquipmentBuddyShinGuardsElement = document.getElementById('needEquipmentBuddyShinGuards');
var needEquipmentBuddyGlovesElement = document.getElementById('needEquipmentBuddyGloves');
var needEquipmentBuddyFeetProtectorsElement = document.getElementById('needEquipmentBuddyFeetProtectors');
var needEquipmentBuddyESocksElement = document.getElementById('needEquipmentBuddyESocks');
var canBeEquipmentBuddyElement = document.getElementById('canBeEquipmentBuddy');
var canBeEquipmentBuddyHoguElement = document.getElementById('canBeEquipmentBuddyHogu');
var canBeEquipmentBuddyHelmetElement = document.getElementById('canBeEquipmentBuddyHelmet');
var canBeEquipmentBuddyArmGuardsElement = document.getElementById('canBeEquipmentBuddyArmGuards');
var canBeEquipmentBuddyShinGuardsElement = document.getElementById('canBeEquipmentBuddyShinGuards');
var canBeEquipmentBuddyGlovesElement = document.getElementById('canBeEquipmentBuddyGloves');
var canBeEquipmentBuddyFeetProtectorsElement = document.getElementById('canBeEquipmentBuddyFeetProtectors');
var canBeEquipmentBuddyESocksElement = document.getElementById('canBeEquipmentBuddyESocks');
var tournamentRegistrationNotesElement = document.getElementById('tournamentRegistrationNotes');
var tournamentRegistrationConfirmationElement = document.getElementById('confirmationStatement');

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

// Create tournament elements
var tournamentNameElement = document.getElementById('tournamentName');
var tournamentMessageElement = document.getElementById('tournamentMessage');
var tournamentDateElement = document.getElementById('tournamentDate');
var tournamentSignUpDueDateElement = document.getElementById('tournamentSignUpDueDate');
var tournamentFeesElement = document.getElementById('tournamentFees');
var tournamentContactElement = document.getElementById('tournamentContact');
var createTournamentConfirmationElement = document.getElementById('createTournamentConfirmation');
// Dynamic form creation elements
var textInputWrapperElement = document.getElementById('textInputWrapper');
var addTextInputButtonElement = document.getElementById('addTextInput');
var checkboxInputWrapperElement = document.getElementById('checkboxInputWrapper');
var numCheckboxesLabelElement = document.getElementById('numCheckboxesLabel');
var numCheckboxesElement = document.getElementById('numCheckboxes');
var addCheckboxInputButtonElement = document.getElementById('addCheckboxInput');
var selectInputWrapperElement = document.getElementById('selectInputWrapper');
var numSelectsLabelElement = document.getElementById('numSelectsLabel');
var numSelectsElement = document.getElementById('numSelects');
var addSelectInputButtonElement = document.getElementById('addSelectInput');

// Manage tournaments elements
var tournamentElements = [];

// Manage users elements
var adminListElement = document.getElementById('adminList');
var newAdminEmailElement = document.getElementById('newAdminEmail');
var adminList = [];