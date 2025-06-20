const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');

exports.run = async (client, message, args) => {
  
  this.fighting = new Set();
  
	let opponent = message.mentions.users.first()
	if (!opponent) return message.reply("Oynamak istediğin kişiyi etiketlemelisin!")
  
  if (opponent.bot) return message.reply('Botlar ile oynayamazsın!');
  if (opponent.id === message.author.id) return message.reply('Kendin ile Yıldız Savaşı oynayamassın!');
		if (this.fighting.has(message.channel.id)) return message.reply('Kanal başına sadece bir Yıldız Savaşı meydana gelebilir.');
		this.fighting.add(message.channel.id);
		try {
			if (!opponent.bot) {
                await message.channel.send(`${opponent}, Yıldız Savaşı isteği geldi. Yıldız Savaşı'nı kabul ediyor musun? (\`evet\` veya \`hayir\` olarak cevap veriniz.)`);
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.channel.send(`Yıldız Savaşı kabul edilmedi...`);
				}
			}
			let userHP = 500;
			let oppoHP = 500;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			};
			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			};
			while (userHP > 0 && oppoHP > 0) {
				const user = userTurn ? message.author : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
					await message.channel.send(stripIndents`
						${user}, ne yapmak istersin? \`lazer\`, \`bariyer\`, \`yardım gemisi\`, veya \`kaç\`?
						**${message.author.username}**: ${userHP} :rocket:
						**${opponent.username}**: ${oppoHP} :rocket:
					`);
					const filter = res =>
						res.author.id === user.id && ['lazer', 'bariyer', 'yardım gemisi', 'kaç'].includes(res.content.toLowerCase());
					const turn = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						await message.reply(`Üzgünüm ama, süre doldu!`);
						reset();
						continue;
					}
					choice = turn.first().content.toLowerCase();
				} else {
					const choices = ['lazer', 'bariyer', 'yardım gemisi'];
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'lazer') {
					const damage = Math.floor(Math.random() * (guard ? 100 : 250)) + 1;
					await message.channel.send(`${user}, TCG Enterprise gemisinin lazer topundan lazer ışını fırlattı ve **${damage}** kadar hasar vurdu!`);
					dealDamage(damage);
					reset();
				} else if (choice === 'bariyer') {
					await message.channel.send(`${user}, 2. komutan Spock'un yardımıyla tüm enerjiyi kalkanlarına yönlendirdi ve hasarı azalttı`);
					guard = true;
					reset(false);
				} else if (choice === 'yardım gemisi') {
					const miss = Math.floor(Math.random() * 4);
					if (!miss) {
						const damage = randomRange(100, guard ? 250 :300);
						await message.channel.send(`${user}, TCG Pardus Yıldız Gemi'si imdadına yetişti ve onun desteğiyle  **${damage}**  hasar vurdun!!`);
						dealDamage(damage);
					} else {
						await message.channel.send(`${user}, TCG Pardus'un ışık hızı motorunda bir arıza meydana geldi ve yardımına gelemedi`);
					}
					reset();
				} else if (choice === 'kaç') {
					await message.channel.send(`${user},Yıldız Gemisinin tüm enerjisini Işık hızı motoruna enerjiyi yönlendirip savaştan kaçtı`);
					forfeit();
					break;
				} else {
					await message.reply('Ne yapmak istediğini anlamadım.');
				}
			}
			this.fighting.delete(message.channel.id);
            const winner = userHP > oppoHP ? message.author : opponent;
			return message.channel.send(`Oyun bitti! Tebrikler, **${winner}** kazandı! \n**${message.author.username}**: ${userHP} :rocket: \n**${opponent.username}**: ${oppoHP} :rocket:`);
		} catch (err) {
			this.fighting.delete(message.channel.id);
			throw err;
		}
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ys', 'yıldızsavası', 'yıldızsavaşları'],
  permLevel: `Yetki gerekmiyor.`
};

exports.help = {
  name: 'yıldızsavası',
  category: "eğlence",
  description: 'İstediğiniz bir kişi ile düello atarsınız!',
  usage: 'yıldızsavaşı <@kullanıcı>'
};