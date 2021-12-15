// Load up the discord.js library
const {Client, Intents, MessageEmbed, GuildMember} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("./config.json");


client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setActivity(config.status);
});
//Embeds =====================================
const errorEmbed = new MessageEmbed()
.setColor("RED")
.setTitle(":x:  Proper Arguments are Required!")


client.on("message", async message => {

  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }

  if(command === "help") {
    const helpEmbed = new MessageEmbed()
    .setColor(config.embedColour)
    .setThumbnail(message.author.avatarURL())
    .setTitle("Commands:")
    .setDescription("**Prefix:** `!`")
    .addField("**General**", "`rolls`, `bands`", true)
    .setTimestamp()

    message.reply({ embeds: [helpEmbed] });
  }
  
  if(command === "bands") {

    const amount = parseInt(args[0], 10);
    const amountString = amount.toString();
    const worthInt = amount * 200

    let worth = worthInt.toString();
    let user = args.slice(1).join(' ');

    if(!amount || !user)
        return message.reply({ embeds: [errorEmbed] });
    if(typeof user != 'string')
        return message.reply({ embeds: [errorEmbed] });
    //message.delete().catch(O_o=>{}); 

    const bandEmbed = new MessageEmbed()
    .setColor(config.embedColour)
    .setThumbnail(message.author.avatarURL())
    .setTitle(":green_circle:  " + user + ":")
    .addField("Bands Amount:", amountString, true)
    .addField("Worth:", worth, true)
    .setTimestamp()


    //message.channel.send(worth);
    //message.channel.send(user);
    message.reply({ embeds: [bandEmbed] });
  }

  if(command === "rolls") {

    const amount = parseInt(args[0], 10);
    const amountString = amount.toString();
    const worthInt = amount * 32

    let worth = worthInt.toString();
    let user = args.slice(1).join(' ');

    if(!amount || !user)
        return message.reply({ embeds: [errorEmbed] });
    if(typeof user != 'string')
        return message.reply({ embeds: [errorEmbed] });
    //message.delete().catch(O_o=>{}); 

    const rollsEmbed = new MessageEmbed()
    .setColor(config.embedColour)
    .setThumbnail(message.author.avatarURL())
    .setTitle(":green_circle:  " + user + ":")
    .addField("Rolls Amount:", amountString, true)
    .addField("Worth:", worth, true)
    .setTimestamp()


    //message.channel.send(worth);
    //message.channel.send(user);
    message.reply({ embeds: [rollsEmbed] });
  } 
  
})
client.login(config.token);