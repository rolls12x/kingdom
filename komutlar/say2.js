const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  var tagdakiler = 0;
  let tag = "꓃";
  message.guild.members.forEach(member => {
    if (member.user.username.includes(tag)) {
      tagdakiler = tagdakiler + 1;
    }
  });

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(
      "<a:siyahkalp:706608706015723562> ꓃ Sunucudaki üye sayısı ",
      message.guild.memberCount
    )
    .addField(
      "<a:siyahkalp:706608706015723562> ꓃ Çevrimiçi üye sayısı  ",
      message.guild.members.filter(
        m => !m.user.bot && m.user.presence.status !== "offline"
      ).size
    )
    .addField(
      " <a:siyahkalp:706608706015723562> ꓃ Seslideki üye sayısı ",
      count
    )
    .addField(
      " <a:siyahkalp:706608706015723562> ꓃ Tagdaki üye sayısı ",
      tagdakiler
    )
    .setFooter(
      `${message.author.tag} tarafından istendi  `,
      message.author.avatarURL
    );
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sayı"],
  permLevel: 0
};

exports.help = {
  name: "say2",
  description: "Say2",
  usage: "say2"
};