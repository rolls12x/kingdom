const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
 if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Otorol sistemini ayarlamak için yeterli yetkin yok!");
  
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();
  
  if(!rol) return message.channel.send(":exclamation: Rol Etiketlemedin. `Doğru kullanım: j!otorol-ayarla @rol #kanal`")
  if(!kanal) return message.channel.send(":pencil: Kanal Etiketlemedin. `Doğru kullanım: j!otorol-ayarla @rol #kanal`")
  
  db.set(`otoR_${message.guild.id}`, rol.id);
  db.set(`otoK_${message.guild.id}`, kanal.id);
  
  message.channel.send(` Başarılı! Kullanıcı Sunucuya Girdiğinde ${rol} Rolünü Vereceğim ${kanal} Kanalına Log Mesajı Gidicek. **Botun Rolünü Ayarladığınız Otorol Rolünün Üstüne Koyunuz.**`)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'otorol-ayarla',
  description: 'Otorol sistemini ayarlamaya yarar.',
  usage: 'otorol-ayarla @rol #kanal'
};