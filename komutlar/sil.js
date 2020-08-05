const Discord = require ("discord.js");

exports.run = (client, message, args) => {
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Yeterli yetkin yok!");

   let silinecekmesaj = args[0]
  
  if(!silinecekmesaj) return message.channel.send("Kaç tane silmeme gerekiyor belirt")
  
  if(silinecekmesaj < 1) {
    message.channel.send("1/100 arasında bi değer girmen gerekli")
    return;
  }
  
  if(silinecekmesaj > 100) {
     message.channel.send("En fazla 100 mesaj silebilirim")
     return;
  }
  
  message.channel.bulkDelete(silinecekmesaj)
  message.channel.send(`Başarıyla ${silinecekmesaj} adet mesaj sildim <a:verify:706608753662754907>`).then(message => message.delete(2000));

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: 'sil',
    category: 'sil',
    description: 'Mesaj siler.',
};