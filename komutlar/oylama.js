const Discord = require('discord.js');

 exports.run = (client, message, args) => {
   message.delete();

   let question = args.join(' ');

   let user = message.author.username

   if (!question) return message.channel.sendEmbed(

     new Discord.RichEmbed()

     .addField(`Ne Oylaması Olacağını Yazman Gerek`)).then(m => m.delete(5000));

     console.log("Oylama Komutu " + message.author.username + '#' + message.author.discriminator + " Tarafından kullanıldı.")
     message.channel.sendEmbed(

       new Discord.RichEmbed()

       .setColor("RANDOM")
       .setThumbnail(client.user.avatarURL)
       .setTimestamp()
       .setFooter("Developer Berat Oylama Sistemi", client.user.avatarURL)

       .addField(`** Oylama **`, `**${question}**`)).then(function(message) {

         message.react('✅');

         message.react('❌');

       });

     };

     exports.conf = {
       enabled: true,
       guildOnly: false,
       aliases: ['oylama'],

  permLevel: 3
};

exports.help = {
  name: 'oylama',
  description: 'Oylama Yaparsınız',
  usage: 'oylama <oylamaismi>'
};