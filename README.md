# QCS-Discord-Bot
The Open-Source Discord Bot for the QCS Discord Server.

## Getting Started

What follows will get a version of the QCS Discord Bot up and running on your local machine

### Installation

Please install the following;

* [NodeJS](https://nodejs.org/en/).
* IDE of choice. I reccomend [VS Code](https://code.visualstudio.com/).


### Set up for Running Locally

1. Clone the [QCS Discord Bot](https://github.com/Jbt3377/QCS-Discord-Bot) repo to your local machine.

2. Open Command Prompt and cd into root of local reop.

3. Check your Node version with `node --version`.

3. Run `npm i properties-reader` to install Properties Reader.

4. Setup a Discord Test Server

5. Follow [this](https://youtu.be/j_sD9udZnCk?t=515) tutorial to set up;
    * Personal Discord Bot hrough the developer portal
    * Calculate bots permissions
    * Invite the bot to your Discord Test Server

6. Rename the `bot.template.properties` file to `bot.properties`.

7. In `bot.properties`, set the `BOT_TOKEN` to your personal Bot Token.

4. Run `npm install --save @sendgrid/mail` to install SendGrid helper library.

5. Follow [this](https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/) guide to set up;
    * SendGrid Account
    * Create and store an API Key
    * Verify Single Sender

9. In `bot.properties`, set the `SENDGRID_API_KEY` to your generated API Key.

10. Open Command Prompt and type `node .` to run the bot locally.
