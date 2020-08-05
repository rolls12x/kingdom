const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.member.roles.has("713041821621682297"))
    return message.reply(
      "**Bu komutu kullanabilmek için  Ban Hammer yetkisine sahip olmasınız.**"
    );
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        ":warning: Uyarı :warning:",
        "`ban` adlı komutu özel mesajlarda kullanamazsın."
      );
    return message.author.sendEmbed(ozelmesajuyari);
  }

  let guild = message.guild;
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();
  let modlog = guild.channels.find("name", "ban-log");
  if (!modlog) return message.reply("`ban-log` kanalını bulamıyorum.");
  if (message.mentions.users.size < 1)
    return message
      .reply(
        "<a:alevs:706608664257232977> Kimi banlayacağını yazmalısın <a:alevs:706608664257232977>"
      )
      .catch(console.error)
      .then(message => message.delete(2000));
  if (reason.length < 1)
    return message
      .reply("Ban sebebini yazmalısın.")
      .then(message => message.delete(2000));

  if (!message.guild.member(user).bannable)
    return message
      .reply("Yetkilileri banlayamam.")
      .then(message => message.delete(2000));
  message.guild.ban(user, 2);
  message.channel.bulkDelete(guild);
  const embed = new Discord.RichEmbed()
    .setColor(0xd97634)
    .setTimestamp()
    .addField("Eylem:", "Ban")
    .addField(
      "Kullanıcı:",
      `${user.username}#${user.discriminator} (${user.id})`
    )
    .addField(
      "Yetkili:",
      `${message.author.username}#${message.author.discriminator}`
    )
    .addField("Sebep", reason);
  return guild.channels.get(modlog.id).sendEmbed(embed);
  return;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: "ban",
  description: "İstediğiniz kişiyi banlar.",
  usage: "ban [kullanıcı] [sebep]"
};
