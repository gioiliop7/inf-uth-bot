require("dotenv").config(); //initialize dotenv
const Discord = require("discord.js"); //import discord.js
const cheerio = require("cheerio");
const axios = require("axios");
const channelID = process.env.CHANNEL_ID;
const cron = require("cron");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

function axiosReq(url) {
  // create a promise for the axios request
  const promise = axios.get(url);
  // using .then, create a new promise which extracts the data
  const dataPromise = promise.then((response) => response);
  // return it
  return dataPromise;
}

let scheduledMessage = new cron.CronJob("* * * * *", () => {
  // This is runs every minute
  // inside a command, event listener, etc.

  let channel = client.channels.cache.get(channelID);
  channel.messages.fetch({ limit: 1 }).then((messages) => {
    let lastMessage = messages.first();
    let last = lastMessage.embeds;
    let title;
    for (let i = 0; i < last.length; i++) {
      title = last[i].title;
    }
    const inf_teiste_page = "http://inf.teiste.gr";
    let titles = [];
    let links = [];
    let announcements = [];
    axiosReq(inf_teiste_page).then((response) => {
      let $ = cheerio.load(response.data);
      let news_items = $(".news-title");
      $(news_items).each(function (e) {
        let children = $(this);
        let announcement = $(children).text().trim();
        titles.push(announcement);
      });
      let news_links = $(".news-title a");
      $(news_links).each(function (e) {
        let link = $(this).attr("href");
        links.push(link);
      });

      for (let i = 0; i < titles.length; i++) {
        for (let j = 0; j < links.length; j++) {
          if (i == j) {
            let announcementOBJ = {
              title: titles[j],
              link: links[j],
            };
            announcements.push(announcementOBJ);
          }
        }
      }
      the_first_announcement = announcements[0];
      firstAnnouncementTitle = the_first_announcement.title;
      firstAnnouncementLink = the_first_announcement.link;
      if (firstAnnouncementTitle != title) {
        const announcementEmbed = new Discord.MessageEmbed()
          .setColor("#983346")
          .setTitle(firstAnnouncementTitle)
          .setURL(firstAnnouncementLink)
          .setAuthor({
            name: "INF-UTH BOT",
          })
          .setThumbnail(
            "https://www.uth.gr/sites/default/files/contents/logos/UTH-logo-text-greek.jpg"
          )
          .setTimestamp()
          .setFooter({
            text: "Created with ❤️ by Gioiliop",
          });
        client.channels.cache
          .get(channelID)
          .send({ embeds: [announcementEmbed] });
      }
    });
  });
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("inf.teiste.gr Announcements", { type: "WATCHING" });
  scheduledMessage.start();
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token