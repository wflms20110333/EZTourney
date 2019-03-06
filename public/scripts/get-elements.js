// Regex for email validation
var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// The snackbar
var snackbarElement = document.getElementById('snackbar');

// The tab
var pageTabElement = document.getElementById('pageTab');

// Tab button elements
var tournamentRegistrationTabButtonElement = document.getElementById('tournamentRegistrationTabButton');
var editInformationTabButtonElement = document.getElementById('editInformationTabButton');
var equipmentSizesTabButtonElement = document.getElementById('equipmentSizesTabButton');
var createTournamentTabButtonElement = document.getElementById('createTournamentTabButton');
var manageTournamentsTabButtonElement = document.getElementById('manageTournamentsTabButton');
var viewAthletesTabButtonElement = document.getElementById('viewAthletesTabButton');
var manageUsersTabButtonElement = document.getElementById('manageUsersTabButton');

var tabButtonElements = [tournamentRegistrationTabButtonElement, editInformationTabButtonElement, 
    equipmentSizesTabButtonElement, createTournamentTabButtonElement, manageTournamentsTabButtonElement, 
    viewAthletesTabButtonElement, manageUsersTabButtonElement];

var athleteTabButtonElements = [tournamentRegistrationTabButtonElement, editInformationTabButtonElement, 
    equipmentSizesTabButtonElement];
var adminTabButtonElements = [createTournamentTabButtonElement, manageTournamentsTabButtonElement, 
    viewAthletesTabButtonElement, manageUsersTabButtonElement];

// Tab elements
var tournamentRegistrationTabElement = document.getElementById('tournamentRegistrationTab');
var editInformationTabElement = document.getElementById('editInformationTab');
var equipmentSizesTabElement = document.getElementById('equipmentSizesTab');
var createTournamentTabElement = document.getElementById('createTournamentTab');
var manageTournamentsTabElement = document.getElementById('manageTournamentsTab');
var viewAthletesTabElement = document.getElementById('viewAthletesTab');
var manageUsersTabElement = document.getElementById('manageUsersTab');

var tabElements = [tournamentRegistrationTabElement, editInformationTabElement, equipmentSizesTabElement, 
    createTournamentTabElement, manageTournamentsTabElement, viewAthletesTabElement, manageUsersTabElement];

// Login elements
var loginScreenElement = document.getElementById('loginScreen');
var emailInputElement = document.getElementById('email');
var passwordInputElement = document.getElementById('password');
var signInButtonElement = document.getElementById('signIn');
var registerButtonElement = document.getElementById('register');

// Logout elements
var userEmailElement = document.getElementById('userEmail');
var signOutButtonElement = document.getElementById('signOut');

// Form submission elements
var registerForTournamentButtonElement = document.getElementById('registerForTournament');
var updateAthleteInformationButtonElement = document.getElementById('updateInformation');
var updateEquipmentSizesButtonElement = document.getElementById('updateSizes');
var createTournamentButtonElement = document.getElementById('createTournament');
var removeAdminButtonElement = document.getElementById('removeAdmin');
var addNewAdminButtonElement = document.getElementById('addNewAdmin');

// Tournament registration elements
var openRegistrationTournamentDocName = ""; // need to assign later
var eventsPoomsaeElement = document.getElementById('poomsae');
var eventsSparringElement = document.getElementById('sparring');
var equipmentBuddyElement = document.getElementById('equipmentBuddy');
var equipmentBuddyHoguElement = document.getElementById('equipmentBuddyHogu');
var equipmentBuddyHelmetElement = document.getElementById('equipmentBuddyHelmet');
var equipmentBuddyArmGuardsElement = document.getElementById('equipmentBuddyArmGuards');
var equipmentBuddyShinGuardsElement = document.getElementById('equipmentBuddyShinGuards');
var equipmentBuddyGlovesElement = document.getElementById('equipmentBuddyGloves');
var equipmentBuddyFeetProtectorsElement = document.getElementById('equipmentBuddyFeetProtectors');
var equipmentBuddyESocksElement = document.getElementById('equipmentBuddyESocks');
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

// Manage tournaments elements
var tournamentElements = [];

// Manage users elements
var adminListElement = document.getElementById('adminList');
var newAdminEmailElement = document.getElementById('newAdminEmail');
var adminList = [];