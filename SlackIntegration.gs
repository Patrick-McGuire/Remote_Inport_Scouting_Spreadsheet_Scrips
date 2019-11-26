///////////// All functions that deal with communicating with slack /////////////

// Happens when ever we get a command from slack. Acts acordingly
function doPost(e) {
  // Let user know that we recived the command
  post('Recived Command: ' + e.parameter.command);
  
  // Commands
  enterDataCMD = '/enterdata';
  testCMD = '/test1254';
  
  if (typeof e !== 'undefined') {
    // Get the number of logs in the log sheet, so we don't overwrite any logs
    var logCount = getValue(cmdLogs, 'F3');
    
    // Get the time and date to log in the log shhet
    time = new Date().toLocaleTimeString();
    date = new Date();
    
    // Get data from the post event
    command = e.parameter.command;
    text = e.parameter.text;
    
    // Post time, date, and command data into logs sheet
//    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!B' + (3 + pos)).setValue(command);
//    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!C' + (3 + pos)).setValue(text);
//    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!D' + (3 + pos)).setValue(time);
//    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!E' + (3 + pos)).setValue(date);
    
    if(e.parameter.command == enterDataCMD) {
      // Let anyone in this sheet know that we are running a function
      setValue(mediumBrother, 'B3', 'Entering Data');
      
      // Enter the data remotly
      masterEnter();
    }  else if(e.parameter.command == testCMD) {
       post('such test much wow');
    }  else {
       post('your command sucks');
    }
    post('Sucess, Command: ' + e.parameter.command);
  } else {
    post("error");
  }
  
  // If this function ran in less than 5s this will prevent a error message in slack by confirming that we got data
  return ContentService.createTextOutput('Dat Post Doe:ok_hand:');
}

// Post a message to slack
function post(text) {
  var webhookUrl = getSlackWebookURL();
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
function getSlackWebookURL() {
  return getValue(inputs, 'C6');
}




