///////////// All functions that deal with communicating with slack /////////////

// Happens when ever we get a command from slack. Acts acordingly
function doPost(e) {
  // Get the info we want from the event
  var command = e.parameter.command;
  var text =  e.parameter.text;
  
  // Get the time and date to log in the log shhet
  var time = new Date().toLocaleTimeString();
  var date = new Date();
  
  // Let user know that we recived the command
  post('Recived Command: ' + command);
  
  // Get the number of logs in the log sheet, so we don't overwrite any logs
  var logCount = getValue(cmdLogs, 'F3');
  var endRow = logCount + 3;

  // Post time, date, and command data into logs sheet
  setValues(cmdLogs, 'B' + endRow, 'E' + endRow, [[command, text, time, date]]);
    
  if(command == enterDataCommand) {
    // Let anyone in this sheet know that we are running a function
    setValue(mediumBrother, 'B3', 'Entering Data');
    // Enter the data remotly
    sendCommand(enterDataCommand);
    setValue(mediumBrother, 'B3', "Done");
    
  } else if(command == importTeamsCommand){
    // Let anyone in this sheet know that we are running a function
    setValue(tbaImport, 'B3', 'Importing');
    // Enter the data remotly
    sendCommand(importTeamsCommand);
    setValue(tbaImport, 'B3', "Done");
  } else if(command == importTeamsMatchesCommand){
    // Let anyone in this sheet know that we are running a function
    setValue(tbaImport, 'D3', 'Importing');
    // Enter the data remotly
    sendCommand(importTeamsMatchesCommand);
    setValue(tbaImport, 'D3', "Done");
  } else if(command == importmatchScheduleCommand){
    // Let anyone in this sheet know that we are running a function
    setValue(tbaImport, 'B7', 'Importing');
    // Enter the data remotly
    sendCommand(importmatchScheduleCommand);
    setValue(tbaImport, 'B7', "Done");
  } else if(command == importmatchTimesCommand){
    // Let anyone in this sheet know that we are running a function
    setValue(tbaImport, 'D7', 'Importing');
    // Enter the data remotly
    sendCommand(importmatchTimesCommand);
    setValue(tbaImport, 'D7', "Done");
  } else if(command == testCommand) {
    post('such test much wow');
  } else {
    post('your command sucks');
  }
  post('Sucess, Command: ' + e.parameter.command);
  
  // If this function ran in less than 5s this will prevent a error message in slack by confirming that we got data
  return ContentService.createTextOutput('Dat Post Doe:ok_hand:');
}

// Post a message to slack
function post(text) {
  var webhookUrl = getSlackWebhookURL();
  var payload = {
    'text' : text,
  }
  var options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(payload)
  };
 
  return UrlFetchApp.fetch(webhookUrl, options)
}

// gets the incoming webhook url (as listed din the inputs sheet)
function getSlackWebhookURL() {
  return getValue(inputs, 'C4');
}



