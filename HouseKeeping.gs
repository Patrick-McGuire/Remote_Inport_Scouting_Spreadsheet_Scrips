// Sheet names
var mediumBrother = 'Medium Brother';
var inputs = 'Inputs';
var cmdLogs = 'CMD Logs';
var tbaImport = 'TBA Import';
// Other sheet:
var red1 = 'Red 1';
var red2 = 'Red 2';
var red3 = 'Red 3';
var blue1 = 'Blue 1';
var blue2 = 'Blue 2';
var blue3 = 'Blue 3';
var bigBrother = 'Big Brother';
var dataByTeam = 'Data By Team';
// Commands
var enterDataCommand = '/enterdata';
var importTeamsCommand = '/importteams';
var importTeamsMatchesCommand = '/importteamsmatches';
var importmatchScheduleCommand = '/importschedule';
var importmatchTimesCommand = '/importmatchtimes';
var testCommand = '/test1254';


// Open a spreadsheed by it's ID
function openSpreadsheet(ssID) {
  var toOpenSS = SpreadsheetApp.openById(ssID);
  SpreadsheetApp.setActiveSpreadsheet(toOpenSS);
}

// Clears content of a range
function clearContent(sheet, startCell, endCell) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, endCell)).clearContent();
}

// Returns the values of a range of cells in the form of a array
function getValues(sheet, startCell, endCell) {
  return SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, endCell)).getValues();
}
// Returns the value of a single cell
function getValue(sheet, startCell) {
  return SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, "")).getValue();
}

// Sets the value of a group of cells
function setValues(sheet, startCell, endCell, values) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, endCell)).setValues(values);
}
// Sets the value of a single cells
function setValue(sheet, startCell, value) {
  SpreadsheetApp.getActive().getActiveSheet().getRange(getRangeString(sheet, startCell, "")).setValue(value);
}

// Returns the string of a range
function getRangeString(sheet, startCell, endCell) {
  if(endCell == "" || endCell == 0) {
    return "" + "'" + sheet + "'"  + "!" + startCell;
  }
  return "" + "'" + sheet + "'"  + "!" + startCell + ':' + endCell;
}


  
  