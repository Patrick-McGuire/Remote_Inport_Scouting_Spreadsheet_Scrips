///////////// All functions that deal with communicating with slack /////////////

// Happens when ever we get a command from slack. Acts acordingly
function doPost(e) {
  SpreadsheetApp.getActiveSpreadsheet().getRange('Medium Brother!B3').setValue('Entering Data');
  post('Recived Command: ' + e.parameter.command);      
  // Commands
  enterDataCMD = '/enterdata';
  testCMD = '/test1254';
  if (typeof e !== 'undefined') {
    pos = SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!F3').getValue();
    time = new Date().toLocaleTimeString();
    date = new Date();
    command = e.parameter.command;
    text = e.parameter.text;
    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!B' + (3 + pos)).setValue(command);
    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!C' + (3 + pos)).setValue(text);
    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!D' + (3 + pos)).setValue(time);
    SpreadsheetApp.getActive().getActiveSheet().getRange('CMD Logs!E' + (3 + pos)).setValue(date);
    
    if(e.parameter.command == enterDataCMD) {
       var thisSSID = SpreadsheetApp.getActiveSpreadsheet().getRange('inputs!C4').getValue();
       var ssID = SpreadsheetApp.getActiveSpreadsheet().getRange('inputs!C3').getValue();
       masterEnter(ssID);
       var ss = SpreadsheetApp.openById(thisSSID);
       SpreadsheetApp.setActiveSpreadsheet(ss);
       SpreadsheetApp.getActiveSpreadsheet().getRange('Medium Brother!B3').setValue('Done');
    }  else if(e.parameter.command == testCMD) {
       post('such test much wow');
    }  else {
       post('your command sucks');
    }
    post('Sucess, Command: ' + e.parameter.command);
  } else {
    post("error");
  }
  return ContentService.createTextOutput('Dat Post Doe:ok_hand:');
}

// Post a message to slack
function post(text) {
  var webhookUrl = "https://hooks.slack.com/services/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";
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
    