
const Discord = require('discord.js');
const db = require("quick.db");


exports.run = async (client, message, args) => {
  
      
      let sebep = args.slice(0).join(" ");
      if (!sebep) return message.reply(`AFK Olmak İçin Bir Sebep Belirtmelisin.!`);

      db.set(`afks_${message.author.id}`, sebep)
          message.reply(`Artık **${sebep}** Sebebi İle Afk Modundasın.!`)

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'afk',
  description: 'AFK olursunuz! Etiketlendiğinizde bot AFK olduğunuzu söyler.',
  usage: 'afk <sebep>'
};