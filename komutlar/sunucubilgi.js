const Discord = require("discord.js");
const db = require('quick.db')

exports.run = (client, message, params) => {

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${client.user.username}`, client.user.avatarURL)
  
  .setThumbnail(message.guild.iconURL)
    .addField('Ad:',` ${ message.guild.name}`)
    .addField('Bölge', ` ${message.guild.region}`)
    .addField('Üye sayısı:', ` ${message.guild.memberCount} üye`)
    .addField('Sahibi:', ` ${message.guild.owner}`)
    .addField('Kanal sayısı:',` ${message.guild.channels.size} kanal`)
    .addField('Oluşturulma tarihi:', message.guild.createdAt)
  .setFooter(`${client.user.username}`, client.user.avatarURL)
  .setTimestamp()
  message.channel.send(embed)

  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["serverinfo"],
  kategori: "sunucu",
  permLevel: 0
};

exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: '-sunucubilgi',
};