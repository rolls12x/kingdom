const Discord = require('discord.js');

exports.run = async (client, message, args) => {
 
  const ping = new Discord.RichEmbed()
  .setTitle('Botun Pingi')
  .setTimestamp()
  .setDescription(`Pingim: ${client.ping}ms. `, message.author.name)
  .setThumbnail('https://media.discordapp.net/attachments/673224895756238848/673450899531628544/adalaett.gif')
  message.channel.send(ping)
  
   
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: 'ping',
  description: 'Ping komutudur.',
  usage: 'ping'
}
