///////////// All functions that deal with entering data remotley in the main spreadsheet /////////////

// Detects if the cell that was just edited was the cell that triggers remote import
function editOn(e) {
  // Get the URL for the cell that was edited
  var eventURL = e.range.getDataSourceUrl();
  
  // Get the url of the trigger cell
  var triggerURL = getTriggerURL();
  
  if(eventURL == triggerURL) {    // If the trigger cell was edited
    // Enter the data remotly
    sendCommand(enterDataCommand);
  }
  setValue(mediumBrother, 'B3', "Done");
}

// Sends a command to other sheet
function sendCommand(command) {
  var webAppURL = getTargetWebAppURL();

  var options = {
    'payload' : {'command' : command},
  };

  UrlFetchApp.fetch(webAppURL, options);
}

// // Returns the url of the target web app
function getTargetWebAppURL() {
  return getValue(inputs, 'E3');
}

// Returns the url of the trigger ranges (as listed din the inputs sheet)
function getTriggerURL() {
  return getValue(inputs, 'C4');
}