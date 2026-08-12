# Fall courses signup backend — one-time setup

This connects the sign-up form on `announcement.html` (Cybersecurity Basics +
Spreadsheet Power) to a Google Sheet. Same pattern as the ICE course signup
backend — takes about 3 minutes.

Google's Apps Script API isn't available to the agent, so this one step has
to be done by hand in the Google UI. Everything else (the sheet, the form,
the site) is already built.

## The Sheet

**Fall 2026 Short Courses — Signups**
https://docs.google.com/spreadsheets/d/1oz-F8p4s3dU-1cKo_wTLDhY6OG76YCMeSB1cXiaCVRg/edit

It has one tab, "Signups", with header row: Timestamp, Name, Email,
Organization, Role / Title, Course(s).

## Steps

1. Open the Sheet above.
2. Go to **Extensions → Apps Script**.
3. Delete any starter code in `Code.gs`, then paste in the full contents of
   [`fall-courses-Code.gs`](./fall-courses-Code.gs) (same folder as this README).
4. Click **Save** (disk icon), name the project something like
   "Fall courses signup backend".
5. Click **Deploy → New deployment**.
   - Select type: **Web app**.
   - Description: anything, e.g. "v1".
   - Execute as: **Me**.
   - Who has access: **Anyone**.
   - Click **Deploy**.
6. The first time you deploy, Google will ask you to authorize the script —
   click through the consent screen (it will warn "Google hasn't verified
   this app" since it's your own personal script; click **Advanced → Go to
   [project name] (unsafe)** then **Allow**).
7. Copy the **Web app URL** shown after deployment (it ends in `/exec`).
8. Open `assets/config-fall-courses.js` in the repo and paste that URL in
   between the quotes:
   ```js
   window.FALL_COURSES_SIGNUP_CONFIG = {
     appsScriptUrl: "https://script.google.com/macros/s/XXXXXXXX/exec"
   };
   ```
9. Commit and push that one-line change (or ask the agent to do it).

## Until this is deployed

The form on the page will show a friendly message pointing people to the
"Email to RSVP" fallback link instead of failing silently, so it's safe to
publish the page before finishing this setup.

## Notes

- Responses land directly in the "Signups" tab of the Sheet above, in
  real time.
- There's no signup cap on this form (unlike the ICE course backend) —
  add one in `fall-courses-Code.gs` later if you need it.
