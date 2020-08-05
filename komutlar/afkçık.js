

const Discord = require('discord.js');
const db = require("quick.db");


exports.run = async (client, message, args) => {
  
      

        if(await db.fetch(`afks_${message.author.id}`)) {
                message.reply("AFK Modundan Çıkıldı.!")
            db.delete(`afks_${message.author.id}`)

}
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'afk-çık',
  description: 'AFK olursunuz! Etiketlendiğinizde bot AFK olduğunuzu söyler.',
  usage: 'afk <sebep>'
};