<h1>Employee Time-off Tracker</h1>

<h3>This is a small web application that will allow employees to register
their out of office times as well as their holidays. Employees will be signing in using
their Google account and requesting time-offs, which will be accepted or declined by
admins. Time-offs will be put on Google Calendar and kept track of by admins.</h3>

<hr>

How to import database:
* In terminal, go to mongodb/bin directory
    * mongorestore -d ett path/to/project-root/database/ett

How to configure app:
* In terminal, go to ett directory in the project location
    * npm install
* Create a Google Service Account with Google+ & enable Google Calendar API
    * Download json file from Google after creation
    * Save the file into ett/config directory
    * Change line 5 to:

            const key = require('./NAME_OF_FILE.json').private_key;
    * Create an API Key
    * Create Google OAuth client id and client secret
    * Create apiGoogleconfig.json in ett/frontend directory

            "clientId": "GOOGLE_OAUTH_CLIENT_ID",
            "apiKey": "API_KEY",
            "scope": "https://www.googleapis.com/auth/calendar",
            "discoveryDocs": [ "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest" ]
    * Create default.json file in ett/config

            “oauthClientID”: “GOOGLE_OAUTH_CLIENT_ID”,
            “oauthClientSecret”: “GOOGLE_OAUTH_CLIENT_SECRET”,
            “mongoURI”: “mongodb://localhost:27017/ett”,
            “cookieKey”: “thisisthecookiekey”,
            “jwtSecret”: “thisisthejwtsecret”
    * In terminal, make sure the current location is ett/

            npm run dev
    * Make sure that all the users allow the service account to make changes to
events in Google Calendar