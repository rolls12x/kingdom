const Discord = require("discord.js");

const mapping = {
  " ": "   ",
   "0":" <a:0_:713498849523531798>",
  "1": " <a:1_:713498848000999456>",
  "2": " <a:2_:713498848579813437>",
  "3": " <a:3_:713498626147745837>",
  "4": " <a:4_:713498625942224987>",
  "5": " <a:5_:713498626382626827>",
  "6": " <a:6_:713498626852388938>",
  "7": " <a:7_:713498930020614226>",
  "8": " <a:8_:713498936446287903>",
  "9": " <a:9_:713498930247368767>",
  "!": "❕",
  "?": "❔",
  "#": "#️⃣",
  "*": "*️⃣"
};

"abcdefghijklmnopqr".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = function(client, message, args) {
  let offlinesayi = message.guild.members.filter(
    m => m.user.presence.status === "offline"
  ).size; 
  let offline = '<a:altun:713776490596270117>**Çevrimdışı Kişi Sayısı** ' +
     `${offlinesayi}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")
  let toplam = message.guild.memberCount;
  let sunucu = '<a:altun:713776490596270117>**Sunucudaki Kişi Sayısı:** ' + 
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
  let onlinesayi = message.guild.members.filter(
    m => !m.user.bot && m.user.presence.status !== "offline"
   
  ).size;
  let online = '<a:altun:713776490596270117>**Çevrimiçi Kişi Sayısı:** ' +
     
      `${onlinesayi}`
      .split("")
      .map(c => mapping[c] || c)
    .join("")
  

const embed = new Discord.RichEmbed()
.setTitle('Sunucu İstatistikleri')
.setColor('BLACK')
.setDescription('' + sunucu + '\n \n' + online + '\n \n' + offline +  '')
.setFooter('')

  message.channel.send(embed)
 
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};