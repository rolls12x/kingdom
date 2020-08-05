const Discord = require("discord.js")
exports.run = (bot, message) => {
  if(message.author.bot || message.channel.type === "dm") return;
 message.channel.send("**Buyurun Tagımız  ꓃**")
} 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tag'],
  permLevel: 0
};

exports.help = {
  name: "tag",
  description: "tag",
  usage: "tag"
};
