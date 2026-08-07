# Signup backend — one-time setup

This connects the "Inscribirme ahora" form on the GitHub Pages site to your
Google Sheet, and enforces the 25-person cap. It takes about 3 minutes.

Google's Forms API and Apps Script API are both unavailable to the agent in
this environment, so this one step has to be done by hand in the Google UI.
Everything else (the sheet, the form page, the site) is already built.

## The Sheet

**Datos Para Proteger El Voto de ICE — Course Signups**
https://docs.google.com/spreadsheets/d/1I1O9m6-KFoV8UQLMS4bhmXTs2kDrvGfvlvOLqe5KDCo/edit

It has one tab, "Signups", with header row: Timestamp, Nombre completo,
Correo electrónico, Organización, Rol / Puesto.

## Steps

1. Open the Sheet above.
2. Go to **Extensions → Apps Script**.
3. Delete any starter code in `Code.gs`, then paste in the full contents of
   [`Code.gs`](./Code.gs) (same folder as this README).
4. Click **Save** (disk icon), name the project something like
   "Signup backend".
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
8. Open `assets/config.js` in the repo and paste that URL in between the
   quotes:
   ```js
   window.SIGNUP_CONFIG = {
     appsScriptUrl: "https://script.google.com/macros/s/XXXXXXXX/exec"
   };
   ```
9. Commit and push that one-line change (or ask the agent to do it).

That's it — the cap of 25 is enforced inside the script itself (in
`CAPACITY = 25`), so it works even if you never touch the Sheet again. The
sign-up page shows live remaining-seats and automatically closes once 25
people have signed up.

## Notes

- If you ever want to raise/lower the cap, change `CAPACITY` in the script
  and re-deploy (**Deploy → Manage deployments → Edit → New version**).
- Responses land directly in the "Signups" tab of the Sheet above, in
  real time.
- No separate "connect form to sheet" click is needed with this approach —
  the script is already bound to the Sheet from step 2.
