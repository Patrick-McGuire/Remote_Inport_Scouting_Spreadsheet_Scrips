///////////// All functions that deal with entering data remotley in the main spreadsheet /////////////

// Detects if the cell that was just edited was the cell that triggers remote import
function editOn(e) {
  var range = e.range;
  var rangeURL = range.getDataSourceUrl();
  var cRangeURL = SpreadsheetApp.getActiveSpreadsheet().getRange('inputs!C5').getValue();
  if(rangeURL == cRangeURL) {
    var thisSSID = SpreadsheetApp.getActiveSpreadsheet().getRange('inputs!C4').getValue();
    var ssID = SpreadsheetApp.getActiveSpreadsheet().getRange('inputs!C3').getValue();
    masterEnter(ssID);
    var ss = SpreadsheetApp.openById(thisSSID);
    SpreadsheetApp.setActiveSpreadsheet(ss);
    SpreadsheetApp.getActiveSpreadsheet().getRange('Medium Brother!B3').setValue('Done');
  }
}

// Functions for every sheet that we need to import from
function Sheet1(ssID) {
  EnterData('RED 1', ssID);
}

function Sheet2(ssID) {
  EnterData('RED 2', ssID);
}

function Sheet3(ssID) {
  EnterData('RED 3', ssID);
}

function Sheet4(ssID) {
  EnterData('BLUE 1', ssID);
}

function Sheet5(ssID) {
  EnterData('BLUE 2', ssID);
}

function Sheet6(ssID) {
  EnterData('BLUE 3', ssID);
}

// Import all sheets that we need to import from
function masterEnter(ssID) {

  Sheet1(ssID);

  Sheet2(ssID);

  Sheet3(ssID);

  Sheet4(ssID);

  Sheet5(ssID);

  Sheet6(ssID);
  
}

// REMOTELY, does this in another spreadsheet: Takes the match data from a given sheet name and puts it into the data by team sheet
function EnterData(sheetName, ssID) {
  var ss = SpreadsheetApp.openById(ssID);
  SpreadsheetApp.setActiveSpreadsheet(ss);

  //Clear the last match data
  SpreadsheetApp.getActive().getActiveSheet().getRange(sheetName + '!H25:I44').clearContent();

  //Get data from the sheetName sheet
  var autoData = SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!D3:D22').getValues();
  var teleData = SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!F3:F22').getValues();
  
  //Get the team ID, and match ID
  var teamID = SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!I3').getValue();
  var matchID = SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!I4').getValue();
  
  //Calculate what cell to put the data in
  var autoTop = (teamID * 43 - 39)
  var autoBottom = (teamID * 43 - 20)
  var teleTop = (teamID * 43 - 19)
  var teleBottom = (teamID * 43)
  var autoRange = "Data By Team!" + matchID + autoTop + ":" + matchID + autoBottom;
  var teleRange = "Data By Team!" + matchID + teleTop + ":" + matchID + teleBottom;
  
  //Put the auto values back into the sheet
  SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!H25:H44').setValues(autoData);
  SpreadsheetApp.getActiveSpreadsheet().getRange(autoRange).setValues(autoData);
  
  //Put the tele values back into the sheet
  SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!I25:I44').setValues(teleData);
  SpreadsheetApp.getActiveSpreadsheet().getRange(teleRange).setValues(teleData);
  
  //Clear the "Value:" data
 SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!D3:D22').setValues([[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],['']]);
 SpreadsheetApp.getActiveSpreadsheet().getRange(sheetName + '!F3:F22').setValues([[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],[''],['']]);
}

///////////// All functions that deal with communicating with slack /////////////

// Happens when every we get a command from slack. Acts acordingly
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