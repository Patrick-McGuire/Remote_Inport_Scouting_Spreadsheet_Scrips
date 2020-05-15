// Create the menue when ever the spreadsheet is opened
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Manager')
  .addItem('Setup', 'setup')
  .addItem('Add Compition', 'newComp')
  .addToUi();
  
  // Setup the spreadsheet, if it need it
  if(getValue(spreadsheet, manager, "D2") == "Incomplete") {
    setup();
  }
}

// Creates a spreadsheet for a new compition
function newComp() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  var ui = SpreadsheetApp.getUi();
  var compName = ui.prompt('Create a new compition', 'Enter the name of the compition you would like to add:', ui.ButtonSet.OK).getResponseText();
  var exitingComps = getValue(spreadsheet, inputs, "F9") + 7;
  setValue(spreadsheet, inputs, "B" + exitingComps, compName);
  
  ui.alert("When you click ok", "The new compition sheet should open in a new tab. If this does not happen, chrome probably blocked the popup, and you can open the link from the dialog they provide. When the new spreadsheet opens please copy the folwing code into the dialog box: " + spreadsheet.getId(), ui.ButtonSet.OK)
  openUrl(getCopyTemplateURL(spreadsheet));
}

// Takes a normal google url, and makes it a copy link
function getCopyTemplateURL(spreadsheet) {
  var templateLink = getValue(spreadsheet, inputs, "C4");
  var arrayLink = templateLink.split("/");
  arrayLink[arrayLink.length - 1] = "copy";
  return arrayLink.join("/");
}

////// Stuff to set up the sheet //////
// Sets up the trigger for this spreadsheet
function setup() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Setup the tigger
//  setupTrigger(spreadsheet);
  // Alert the user
  var ui = SpreadsheetApp.getUi();
  ui.alert("Congrats!", "Your Spreadsheet has ben set up! To add sheets for indivudal compitions please use go to Manager > Add Compition", ui.ButtonSet.OK);
  setValue(spreadsheet, manager, "D2", "Complete");
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
