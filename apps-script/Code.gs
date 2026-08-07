// Generation Data — Course Signup Backend
// Bound to: "Datos Para Proteger El Voto de ICE — Course Signups"
// Deploy as Web App (Execute as: Me, Who has access: Anyone) and paste the
// resulting /exec URL into the site's config.js.

var SHEET_NAME = 'Signups';
var CAPACITY = 25;

function getSheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function currentCount_() {
  var sheet = getSheet_();
  var lastRow = sheet.getLastRow();
  return Math.max(0, lastRow - 1); // subtract header row
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var count = currentCount_();
  var remaining = Math.max(0, CAPACITY - count);
  return jsonOut_({ ok: true, capacity: CAPACITY, count: count, remaining: remaining, full: remaining <= 0 });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return jsonOut_({ ok: false, reason: 'busy', message: 'Please try again in a moment.' });
  }

  try {
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonOut_({ ok: false, reason: 'bad_request', message: 'Invalid submission.' });
    }

    var name = (data.name || '').toString().trim();
    var email = (data.email || '').toString().trim();
    var org = (data.org || '').toString().trim();
    var role = (data.role || '').toString().trim();

    if (!name || !email) {
      return jsonOut_({ ok: false, reason: 'missing_fields', message: 'Name and email are required.' });
    }

    var count = currentCount_();
    if (count >= CAPACITY) {
      return jsonOut_({ ok: false, reason: 'full', message: 'Signups are full.', capacity: CAPACITY, count: count, remaining: 0 });
    }

    var sheet = getSheet_();
    sheet.appendRow([new Date(), name, email, org, role]);

    var newCount = count + 1;
    var remaining = Math.max(0, CAPACITY - newCount);
    return jsonOut_({ ok: true, capacity: CAPACITY, count: newCount, remaining: remaining, full: remaining <= 0 });
  } finally {
    lock.releaseLock();
  }
}
