
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.roles.has("713041837417431131"))
    return message.channel.send(
      `Bu Komutu Kullanabilmek için **Phoenix Register Squad** Yetkisine Sahip Olmalısın!`
    );

  let member = message.mentions.members.first();
   let isim = args.slice(1).join(" | ");
  let yaş = args.slice(1).join(" ");
  let isimön = "꓃ ";///ismin önüne gelır
  let isimson = "";//ismin sonuna gelır
  let alınacak = "713041840324214928"; ///alınacak rol idsi
  let verilecek = "713041838407417959"; ///verilecek rol idsi
  if (!member) return message.channel.send("Bir Kullanıcı Etiketle");
  if (!isim) return message.channel.send("Bir İsim Girmelisin!");
  member.setNickname(`${isimön}${isim}${isimson}`);

  setTimeout(function() {
    member.addRole(verilecek);
  }, 1000);
  setTimeout(function() {
    member.removeRole(alınacak);
  }, 1000);

       const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setTitle("Kayıt Sistemi")
    .setThumbnail(message.author.avatarURL)
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setDescription(
      `Kayıt Edilen Kullanıcı: **${member.user}** \n Kayıt Eden Yetkili: **${message.author.username}**`
    )
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp()
    .setImage(
      "https://cdn.discordapp.com/attachments/513745137835442196/733120033298972722/giphy_2.gif"
    );
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "e",
  description: "Kayıt Sistemi",
  usage: "e @kullanıcı <isim> <yaş>"
};