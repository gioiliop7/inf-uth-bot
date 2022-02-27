## Inf-UTH Announcement BOT
One of the most problems when studied at university is to see the announcements on time.
I tried to solve the problem by making a discord bot.

The bot sends the last announcement by scrapping the html from main page of the university.

Try the bot on your server.
Join the discord server of inf-uth here

## Installation

### Packages
Install the required modules with npm
```
npm install discord.js axios dotenv cheerio cron
```

The packages we have installed are:

-   `discord.js`: a Node.js module to allow easy interactions with the Discord API.
-   `axios`: allows making HTTP Promises easily with Node.js.
-   `dotenv`: allows loading variables from process.env in Node apps.
-   `cheerio`: help us scrapping the html of the page
-   `cron`: Repeat every time a schedule message


### Create an App in Discord
Then you need to create an app in Discord. Go to [Discord developers portal](https://discord.com/developers) and sign in or create a developer account.

Once you're logged in, click on 'New Application' at the top right of the window.

![alt text](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-1.png)

Then fill in the details of your app (i.e. name) and you will be taken to your app's dashboard. Navigate to 'Bot' and click 'Add Bot' to enable your app as a bot.

![alt text](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-2.png)

In the section appear, click copy to token. Create a .env file and store the token there or copy to your code (index.js)

### Install bot to server

Create a new Discord server with your Discord account to install the bot at.

Back at the App dashboard, navigate to 'OAuth2' and select  **'bot'**  under the Scopes section.![enter image description here](https://buddy.works/tutorials/assets/posts/how-to-build-a-discord-bot-in-node-js-for-beginners/discord-bot-4.png)

You will see an URL being generated at the bottom. Copy this URL and paste it on a new tab. You will be redirected to the page that connects the bot on a server.

Install this bot to your preferred Discord server.
If everything works correctly, your bot should now appear in your Discord server.

After you paste the token in your code or stored it in an .env file, run the code.

```default
node index.js
```

## Contributing
Feel free to suggest anything in order to improve the project.
