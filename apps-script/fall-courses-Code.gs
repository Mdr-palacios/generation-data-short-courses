// Generation Data — Fall Short Courses Signup Backend
// Bound to: "Fall 2026 Short Courses — Signups"
// Deploy as Web App (Execute as: Me, Who has access: Anyone) and paste the
// resulting /exec URL into assets/config-fall-courses.js.

var SHEET_NAME = 'Signups';

function getSheet_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return jsonOut_({ ok: true, message: 'Fall courses signup endpoint is live.' });
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
    var courses = Array.isArray(data.courses) ? data.courses.join(', ') : (data.courses || '').toString().trim();

    if (!name || !email || !courses) {
      return jsonOut_({ ok: false, reason: 'missing_fields', message: 'Name, email, and at least one course are required.' });
    }

    var sheet = getSheet_();
    sheet.appendRow([new Date(), name, email, org, role, courses]);

    return jsonOut_({ ok: true, message: 'Signup recorded.' });
  } finally {
    lock.releaseLock();
  }
}
