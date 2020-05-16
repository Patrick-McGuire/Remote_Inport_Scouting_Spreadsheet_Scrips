// These are messages we will send the user during setup and adding new competitions
alertToSettupMsg = "Please go to the menu at the top of the spreadsheet, and click on Manager -> Setup. You will be asked to give authorization (click continue, click on your account, click advanced, click got to ... unsafe), scroll down, and click allow). Then go to Manager -> Setup again and run the script again to set up the sheet."
askForCompNameMsg = "Enter the name of the competition you would like to add:"
alertForOpiningOfCopySheetMsg = "The new competition sheet should open in a new tab. If this does not happen, chrome probably blocked the popup, and you can open the link from the dialog they provide (upper right-hand corner of the screen). This will let you copy the template. When the new copy opens you will be asked to do some things. You will need this code to copy into a dialog box later, so please copy it: "
alertSettupCompleate = "Your Spreadsheet has been set up! To add sheets for individual competitions please use go to Manager > Add Competition"

// Create the menue when ever the spreadsheet is opened. This runs when ever a sheet is opened on a non-mobile device
function onOpen() {
  // Create the objects that we will use to operate on the spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  
  ui.createMenu('Manager')
  .addItem('Setup', 'setup')
  .addItem('Add Compition', 'newComp')
  .addToUi();
  
  // Tell the user to setup the spreadsheet, if it needs it
  if(ScriptApp.getProjectTriggers().length == 0 && spreadsheet.getId() != getValue(spreadsheet, inputs, "F12")) {
    alertToSetup(ui);
  }
}

function alertToSetup(ui) {
  // Alert the user with a dialog box
  ui.alert(alertToSettupMsg)
}

// Creates a spreadsheet for a new compition
function newComp() {
   // Create the objects that we will use to operate on the spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  
  // Geet the name of the compition the user wants to add, and put it into the spreadsheet
  var compName = ui.prompt('Create a new competition',askForCompNameMsg , ui.ButtonSet.OK).getResponseText();    // Alert the user with a dialog box + input
  var exitingComps = getValue(spreadsheet, inputs, "F9") + 8;                                                    // Get where to insert the name
  setValue(spreadsheet, inputs, "B" + exitingComps, compName);                                                   // Insert the name into the inputs sheet
  
  // Open the copy template url, and explain what to do
  ui.alert("When you click ok", alertForOpiningOfCopySheetMsg + spreadsheet.getId(), ui.ButtonSet.OK)            // Alert the user with a dialog box
  openUrl(getCopyTemplateURL(spreadsheet))                                                                       // Open the link
}

// Takes a normal google url, and makes it a copy link
function getCopyTemplateURL(spreadsheet) {
  var templateLink = getValue(spreadsheet, inputs, "C4");      // Get the normal link from the sheet
  var arrayLink = templateLink.split("/");                     // Split it into a array based on '/'
  arrayLink[arrayLink.length - 1] = "copy";                    // Replace the last segment for the array with 'copy'
  return arrayLink.join("/");                                  // Convert back to a string and return that
}

////// Stuff to set up the sheet //////
// Sets up the trigger for this spreadsheet
function setup() {
  // Create the objects that we will use to operate on the spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  
  // Setup editOn tigger programmatically
  setupTrigger(spreadsheet);
  
  // Alert the user that we are done
  ui.alert("Congrats!", alertSettupCompleate, ui.ButtonSet.OK);
  
  // This is how we make sure we only run setup once
  setValue(spreadsheet, inputs, "F12", spreadsheet.getId())
}

// Set up the trigger for this spreadsheet
function setupTrigger(spreadsheet) {
  // Function to run on every edit
  var trigerFuncton = 'editOn';
  // Loop over all triggers, and delete them
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
      ScriptApp.deleteTrigger(allTriggers[i]);
  }
  // Create the new trigger
  ScriptApp.newTrigger(trigerFuncton)
  .forSpreadsheet(spreadsheet)
  .onEdit()
  .create();
}
