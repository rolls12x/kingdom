const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')
 
exports.run = async (client, message, args) => {
        if(!args[0]) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`Lütfen geçerli bir sayı belirtiniz!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
  }
 
        let profil = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  const s1 = new Discord.RichEmbed()
  .setDescription('Sayaç kanalı belirtmelisiniz!')
  .setColor("RANDOM")
                        .setTimestamp()
  if (!mentionedChannel && args[0] !== "sıfırla") return message.channel.send(s1);
 
 
        if(args[0] === "sıfırla") {
                if(!profil[message.guild.id]) {
                        const embed = new Discord.RichEmbed()
                                .setDescription(`Sayaç, Ayarlanmadığından Dolayı Sıfırlanamaz!`)
                                .setColor("RANDOM")
                                .setTimestamp()
                        message.channel.send({embed})
                        return
                }
                delete profil[message.guild.id]
                fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                        console.log(err)
                })
                const embed = new Discord.RichEmbed()
                        .setDescription(`Sayaç, Başarılı Bir Şekilde Sıfırlandı!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(isNaN(args[0])) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`Lütfen, Geçerli Bir Sayı Belirtiniz!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(args[0] <= message.guild.memberCount) {
                const embed = new Discord.RichEmbed()
                        .setDescription(`Lütfen, [${message.guild.memberCount}] Rakamlı Sayıdan Daha Yüksek Bir Değer Belirtiniz!`)
                        .setColor("RANDOM")
                        .setTimestamp()
                message.channel.send({embed})
                return
        }
 
        if(!profil[message.guild.id]){
                profil[message.guild.id] = {
                        sayi: args[0],
      kanal: mentionedChannel.id
                };
        }
       
        profil[message.guild.id].sayi = args[0]
  profil[message.guild.id].kanal = mentionedChannel.id
       
        fs.writeFile("./ayarlar/sayac.json", JSON.stringify(profil), (err) => {
                console.log(err)
        })
 
        const embed = new Discord.RichEmbed()
                .setDescription(`Sayaç, Başarılı Bir Şekilde \`${args[0]}\` Olarak Ayarlandı, Sayaç Kanalı İse ${mentionedChannel} Olarak Ayarlandı!`)
                .setFooter('JAGUAR BOT, iyi eğlenceler diler!', client.user.avatarURL)
                .setColor("RANDOM")
                .setTimestamp()
        message.channel.send({embed})
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayaç-ayarla'],
        permLevel: 2,
        kategori: "moderasyon"
}
 
exports.help = {
        name: 'sayaç-ayarla',
        description: 'Sayaç,',
        usage: 'sayaç-ayarla [sayı/sıfırla] [kanal]'
}
   
