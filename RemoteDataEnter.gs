///////////// All functions that deal with entering data remotley in the main spreadsheet /////////////
var linkBegining =      'https://docs.google.com/spreadsheets/d/';
var dataEnterURL =      '/gviz/tq?headers=-1&transpose=0&merge=rows&gid=1831719361&range=B3';
var teamsURL =          '/gviz/tq?headers=-1&transpose=0&merge=rows&gid=425803645&range=B3';
var teamsMatchesURL =   '/gviz/tq?headers=-1&transpose=0&merge=rows&gid=425803645&range=D3';
var matchScheduleURL =  '/gviz/tq?headers=-1&transpose=0&merge=rows&gid=425803645&range=B7';
var matchTimesURL =     '/gviz/tq?headers=-1&transpose=0&merge=rows&gid=425803645&range=D7';

// Detects if the cell that was just edited was the cell that triggers remote import
function editOn(e) {
  // Get the URL for the cell that was edited
  var eventURL = e.range.getDataSourceUrl();
  
  if(eventURL == linkBegining + getSheetID() + dataEnterURL) {
    // Enter the data remotly
    sendCommand(enterDataCommand);
    setValue(mediumBrother, 'B3', "Done");
  } else if(eventURL == linkBegining + getSheetID() + teamsURL) {
    // run the import teams script in the other sheet
    sendCommand(importTeamsCommand);
    setValue(tbaImport, 'B3', "Done");
  } else if(eventURL == linkBegining + getSheetID() + teamsMatchesURL) {
    // run the import teams matches script in the other sheet
    sendCommand(importTeamsMatchesCommand);
    setValue(tbaImport, 'D3', "Done");
  } else if(eventURL == linkBegining + getSheetID() + matchScheduleURL) {
    // run the import match schedule script in the other sheet
    sendCommand(importmatchScheduleCommand);
    setValue(tbaImport, 'B7', "Done");
  } else if(eventURL == linkBegining + getSheetID() + matchTimesURL) {
    // run the import match times script in the other sheet
    sendCommand(importmatchTimesCommand);
    setValue(tbaImport, 'D7', "Done");
  }
}

// Sends a command to other sheet
function sendCommand(command) {
  var webAppURL = getTargetWebAppURL();

  var options = {
    'payload' : {'command' : command},
  };

  UrlFetchApp.fetch(webAppURL, options);
}

// // Returns the url of the target web app (as listed din the inputs sheet)
function getTargetWebAppURL() {
  return getValue(inputs, 'E3');
}

function getSheetID() {
  return getValue(inputs, 'C5');
}