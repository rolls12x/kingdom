const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "a!";

  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTitle("Rol Koruma Sistemi!")
      .setDescription(
        "**Hatalı Komut Kullandın.! Örnek : j!rol-koruma aç && kapat**"
      );

    message.channel.send(embed);
    return;
  }
  let rol = await db.fetch(`rolk_${message.guild.id}`);
  if (args[0] == "aç") {
    if (rol) {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Rol Koruma Sistemi!")
        .setDescription("**Rol Koruma Zaten Aktif.!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`rolk_${message.guild.id}`, "acik");
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setTitle("Rol Koruma Sistemi!")
        .setDescription("**Rol Koruma Başarıyla Açıldı.!**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`rolk_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setTitle("Rol Koruma Sistemi!")
      .setDescription("**Rol Koruma Başarıyla Kapandı.!**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-k"],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: "rol-koruma",
  description: "Rol koruma",
  usage: "rol-koruma"
};
