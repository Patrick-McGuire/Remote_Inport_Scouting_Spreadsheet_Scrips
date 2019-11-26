///////////// All functions that deal with entering data remotley in the main spreadsheet /////////////

// Detects if the cell that was just edited was the cell that triggers remote import
function editOn(e) {
  // Get the URL for the cell that was edited
  var eventURL = e.range.getDataSourceUrl();
  
  // Get the url of the trigger cell
  var triggerURL = getTriggerURL();
  
  if(eventURL == triggerURL) {    // If the trigger cell was edited
    // Enter the data remotly
    masterEnter();

    // Reset the trigger cell
    setValue(mediumBrother, 'B3', 'Done');
  }
}

// Import all sheets that we need to import from
function masterEnter() {
  // Get the SSID for this sheet, so we can change the active spreadsheet back to this sheet
  var thisSSID = getThisSSID();
  
  // Open the spreadsheet that we need to manipulate data in
  openSpreadsheet(getTargetSSID());
  
  // Set a cell to 'Importing' in the other spreadeheet to let users know that we are accesing it
  setValue(bigBrother, 'G15', 'Importing');
  
  EnterData(red1);
  EnterData(red2);
  EnterData(red3);
  EnterData(blue1);
  EnterData(blue2);
  EnterData(blue3);  
  
  // Set a cell to 'Safe' in the other spreadeheet to let users know that we are done accesing it
  setValue(bigBrother, 'G15', 'Safe');
  
  // Reset the active spreadsheet to this spreadsheet
  openSpreadsheet(thisSSID);
}

// REMOTELY, does this in another spreadsheet:
// Takes the match data from a given sheet name and puts it into the data by team sheet
function EnterData(sheetName) {
  clearContent(sheetName, 'H25', 'I44');

  //Get data from the sheetName sheet
  var autoData = getValues(sheetName, 'D3', 'D22');
  var teleData = getValues(sheetName, 'F3', 'F22');
  
  //Get the team ID, and match ID
  var teamID = getValue(sheetName, 'I3');
  var matchID = getValue(sheetName, 'I4');
  
  
  //Calculate what cell to put the data in
  var autoTop = (teamID * 43 - 39)
  var autoBottom = (teamID * 43 - 20)
  var teleTop = (teamID * 43 - 19)
  var teleBottom = (teamID * 43)
  
  //Put the auto values back into the sheet
  setValues(sheetName, 'H25', 'H44', autoData)
  setValues(dataByTeam, "" + matchID + autoTop, "" + matchID + autoBottom, autoData) 
  
  
  //Put the tele values back into the sheet
  setValues(sheetName, 'I25', 'I44', autoData)
  setValues(dataByTeam, "" + matchID + teleTop, "" + matchID + teleBottom, teleData) 
  
  //Clear the "Value:" data
  clearContent(sheetName, 'D3', 'D22');
  clearContent(sheetName, 'F3', 'F22');
}

// Returns the ID of this spreadsheet (as listed in the inputs sheet)
function getThisSSID() {
  return getValue(inputs, 'C4');
}

// Returns the ID of the target spreadsheet (as listed in the inputs sheet)
function getTargetSSID() {
  return getValue(inputs, 'C3');
}

// Returns the url of the trigger ranges (as listed din the inputs sheet)
function getTriggerURL() {
  return getValue(inputs, 'C5');
}





