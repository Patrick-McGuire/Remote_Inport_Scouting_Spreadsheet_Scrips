///////////// All functions that deal with entering data remotley in the main spreadsheet /////////////

// Detects if the cell that was just edited was the cell that triggers remote import
function editOn(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get the data for the cell that was edited
  var cell = e.range.getA1Notation();
  var sheetName = e.range.getSheet().getName();
  
  if(sheetName == mediumBrother && cell == "B3") {
    // Enter the data remotly
    sendCommand(enterDataCommand, spreadsheet);
    setValue(spreadsheet, mediumBrother, 'B3', "Done");    
  } else if(sheetName == tbaImport && cell == "B3") {
    // run the import teams script in the other sheet
    sendCommand(importTeamsCommand, spreadsheet);
    setValue(spreadsheet, tbaImport, 'B3', "Done");
  } else if(sheetName == tbaImport && cell == "D3") {
    // run the import teams matches script in the other sheet
    sendCommand(importTeamsMatchesCommand, spreadsheet);
    setValue(spreadsheet, tbaImport, 'D3', "Done");
  } else if(sheetName == tbaImport && cell == "B7") {
    // run the import match schedule script in the other sheet
    sendCommand(importmatchScheduleCommand, spreadsheet);
    setValue(spreadsheet, tbaImport, 'B7', "Done");
  } else if(sheetName == tbaImport && cell == "D7") {
    // run the import match times script in the other sheet
    sendCommand(importmatchTimesCommand, spreadsheet);
    setValue(spreadsheet, tbaImport, 'D7', "Done");
  }
}

// Sends a command to other sheet
function sendCommand(command, spreadsheet) {
  var webAppURL = getTargetWebAppURL(spreadsheet);

  var options = {
    'payload' : {'command' : command},
  };

  UrlFetchApp.fetch(webAppURL, options);
}

// // Returns the url of the target web app (as listed din the inputs sheet)
function getTargetWebAppURL(spreadsheet) {
  return getValue(spreadsheet, inputs, 'F3');
}
