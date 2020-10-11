# QCS-Discord-Bot
The Open-Source Discord Bot for the QCS Discord Server.

It is used for;
* Validating QCS Memberships
* Setting member NickNames


What follows will get a version of the QCS Discord Bot up and running on your local machine...

## Installation

Please install the following;

* [NodeJS](https://nodejs.org/en/).
* IDE of choice. I recommend [VS Code](https://code.visualstudio.com/).


## Set up for Running Locally

1. Clone the [QCS Discord Bot](https://github.com/Jbt3377/QCS-Discord-Bot) repo to your local machine.

2. Open Command Prompt and cd into root of local reop.

3. Check your Node version with `node --version`.

4. Run `npm i properties-reader` to install Properties Reader.

5. In `bot.properties` set the `BOT_TOKEN` to your personal Bot Token.

6. Setup a Discord Test Server

7. Setup SendGrid

8. Setup Google Spreadsheets API

9. Open Command Prompt and type `node .` to run the bot locally.

## Setup Discord

1. Follow [this](https://youtu.be/j_sD9udZnCk?t=515) tutorial to set up the following;
    * A Personal Discord Bot hrough the developer portal
    * Calculate bots permissions
    * Invite the bot to a Personal Discord Test Server

2. In `bot.properties` set the `BOT_TOKEN` to your personal Bot Token.

## Setup SendGrid

1. Run `npm install --save @sendgrid/mail` to install SendGrid helper library.

2. Follow [this](https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/) guide to set up;
    * SendGrid Account
    * Create and store an API Key
    * Verify Single Sender

3. In `bot.properties`, set the `SENDGRID_API_KEY` to your generated API Key.

## Setup Google Spreadsheets API

1. Run `npm install google-spreadsheet@2.0.6` to install Google Spreadsheets.

2. Follow [this](https://www.youtube.com/watch?v=UGN6EUi4Yio&ab_channel=Twilio) guide to set up;
    * Service Account for your Google Drive API
    * Credentials for the Service Account
    * A connection to a Spreadsheet in your Google Drive

3. In `bot.properties`, set the `SPREADSHEET_ID` to the ID of the Spreadsheet on your Google Drive (found in the URL).


