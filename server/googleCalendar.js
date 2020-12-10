module.exports = function(app, pool, CLIENT_ID, CLIENT_SECRET) {
    const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');
    let arr = ['Refresh the browser to see your events'];

    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '../client/public2/views');
    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

     app.get('/getCalendar', function (req, res) {
         res.render("google.html");
     });

    app.post('/getCalendar', function (req, res) {
        const tkn = req.body.token;
        const fs = require('fs');
        const readline = require('readline');
        const {google} = require('googleapis');

        // If modifying these scopes, delete token.json.
        const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first
        // time.
        const TOKEN_PATH = 'token.json';

        // Load client secrets from a local file.
        fs.readFile('credentials.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Calendar API.
          authorize(JSON.parse(content), listEvents);
        });

        /**
         * Create an OAuth2 client with the given credentials, and then execute the
         * given callback function.
         * @param {Object} credentials The authorization client credentials.
         * @param {function} callback The callback to call with the authorized client.
         */
        function authorize(credentials, callback) {
          const {client_secret, client_id, redirect_uris} = credentials.installed;
          const oAuth2Client = new google.auth.OAuth2(
              client_id, client_secret, redirect_uris[0]);

          // Check if we have previously stored a token.
          fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
          });
        }

        /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
         * @param {getEventsCallback} callback The callback for the authorized client.
         */
        function getAccessToken(oAuth2Client, callback) {

            oAuth2Client.getToken(tkn, (err, token) => {
              if (err) return console.error('Error retrieving access token', err);
              oAuth2Client.setCredentials(token);
              // Store the token to disk for later program executions
              fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
              });
              callback(oAuth2Client);
            });
        }

        /**
         * Lists the next 10 events on the user's primary calendar.
         * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
         */
         function listEvents(auth) {
            async function fun(){
            const calendar = await google.calendar({version: 'v3', auth});
            calendar.events.list({
              calendarId: 'primary',
              timeMin: (new Date()).toISOString(),
              maxResults: 30,
              singleEvents: true,
              orderBy: 'startTime',
            }, (err, res) => {
              if (err) return console.log('The API returned an error: ' + err);
              const events = res.data.items;
              if (events.length) {
                console.log('Your upcoming events:', events);
                events.map((event, i) => {
                  arr.push(event);
                });
              } else {
                console.log('No upcoming events found.');
              }
            });
          }
          fun()
          }

        let html = '<table style="border:1px solid black; border-collapse:collapse;"><tr style="border: 1px solid black;"><th style="border: 1px solid black;">Event Name</th><th style="border: 1px solid black;">Event Description</th><th style="border: 1px solid black;">Start</th><th style="border: 1px solid black;">End</th></tr>';
        for (let i = 1; i < arr.length; i++){
            html += '<tr><td style="border: 1px solid black;">' + arr[i].summary + '</td><td style="border: 1px solid black;">' + arr[i].description + '</td><td style="border: 1px solid black;">' + arr[i].start.dateTime + '</td><td style="border: 1px solid black;">' + arr[i].end.dateTime + '</td></tr>';
        }
        html += '</table>';
        console.log(html);

        res.send(html);
        res.render('google.html');
    });

    app.post('/events', function (req, res) {
        const {google} = require('googleapis');
        const {OAuth2} = google.auth;
        const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

        oAuth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
        const eventStartTime = new Date(req.body.event_year, req.body.event_month - 1, req.body.event_day, req.body.event_hour);

        const eventEndTime = new Date(req.body.event_year, req.body.event_month - 1, req.body.event_day, req.body.event_hour);
        console.log(req.body.end_date);
        eventEndTime.setMinutes(eventEndTime.getMinutes() + req.body.duration);

        const event = {
            summary: `${req.body.summary}`,
            description: `${req.body.description}`,
            colorId: 1,
            start: {
                dateTime: eventStartTime,
            },
            end: {
                dateTime: eventEndTime,
            },
        }

        calendar.freebusy.query({
            resource: {
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                items: [{id: 'primary'}]
            },
        },
            (err, res) => {
          // Check for errors in our query and log them if they exist.
          if (err) return console.error('Free Busy Query Error: ', err)

          // Create an array of all events on our calendar during that time.
          const eventArr = res.data.calendars.primary.busy

          // Check if event array is empty which means we are not busy
          if (eventArr.length === 0) {
            // If we are not busy create a new calendar event.
            return calendar.events.insert(
              { calendarId: 'primary', resource: event },
              err => {
                // Check for errors and log them if they exist.
                if (err) return console.error('Error Creating Calender Event:', err)
                // Else log that the event was created.
                return console.log('Event created successfully.')
              })
            }
          // If event array is not empty log that we are busy.
          return console.log(`Sorry I'm busy for that time...`)
        }
      )


        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: req.body.to, // Change to your recipient
            from: 'brkeller99@gmail.com', // Change to your verified sender
            subject: req.body.summary,
            text: req.body.description,
            html: req.body.description,
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
        res.render('event.html');
    });
}