var figlet = require('figlet');

module.exports.run = (client, message, args, tools) => {
  
  var maxLen = 15 // Kendiniz en yüksek harf sayısını ayarlayabilirsiniz
  
  if(args.join(' ').length > maxLen) return message.channel.send(`En fazla **15** karakter yazabilirsin Çünkü 15 Fazla Kullanırsanız Yazı Bozulur!`) 
  
  if(!args[0]) return message.channel.send('Lütfen bir yazı girin...');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('Bir hata var...');
          console.dir(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'arter'});
  });


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'arter',
  description: '.',
  usage: 'arter'
};
