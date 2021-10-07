const { MessageEmbed } = require("discord.js");
const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = {
    name: "kaloon",
    description: "New World Kaloon Server Status",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["newworld", "kaloon", "k", "nw", "status"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {

        const pageParse = (url) =>
            fetch(url)
                .then(response => response.text())
                .then(html = async () => {
                    const $ = cheerio.load(html);
                    serverStatus = $('body div.col-lg-8.mx-auto.p-3.py-md-5 main div:nth-child(4) div table:nth-child(20) tbody tr:nth-child(102) td.text-end span').html();
                    inGame = $('body > div.col-lg-8.mx-auto.p-3.py-md-5 > main > div:nth-child(4) > div > table:nth-child(20) > tbody > tr:nth-child(102) > td:nth-child(5)').html();
                    inQueue = $('body > div.col-lg-8.mx-auto.p-3.py-md-5 > main > div:nth-child(4) > div > table:nth-child(20) > tbody > tr:nth-child(102) > td:nth-child(6)').html();
                    inWaiting = $('body > div.col-lg-8.mx-auto.p-3.py-md-5 > main > div:nth-child(4) > div > table:nth-child(20) > tbody > tr:nth-child(102) > td:nth-child(7)').html();

                    await client.sendTime(message.channel,":Kaloon server Status: "+ serverStatus +
                        "\n"+
                        "Player InGame : "+inGame +
                            "\n"+
                        "Player InQueue : "+ inQueue+
                            "\n"+
                        "Waiting time : "+ inWaiting);
                    await message.react("✅");
                });
    },

    SlashCommand: {
        /**
         *
         * @param {import("../structures/DiscordMusicBot")} client
         * @param {import("discord.js").Message} message
         * @param {string[]} args
         * @param {*} param3
         */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel)
                return client.sendTime(
                    interaction,
                    "❌ | **You must be in a voice channel to use this command.**"
                );
            if (
                guild.me.voice.channel &&
                !guild.me.voice.channel.equals(member.voice.channel)
            )
                return client.sendTime(
                    interaction,
                    `❌ | **You must be in ${guild.me.voice.channel} to use this command.**`
                );

            let player = await client.Manager.get(interaction.guild_id);
            if (!player)
                return client.sendTime(
                    interaction,
                    "❌ | **Nothing is playing right now...**"
                );
            player.destroy();
            client.sendTime(
                interaction,
                ":notes: | **Disconnected!**"
            );
        },
    },
};
