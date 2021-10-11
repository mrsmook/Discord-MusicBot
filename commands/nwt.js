const { MessageEmbed } = require("discord.js");
let latestTweets = require('latest-tweets')

module.exports = {
    name: "nwt",
    description: "New World Kaloon Server Status",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["newworldtweets", "tweets"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        latestTweets('playnewworld', async function (err, tweets) {
            console.log(tweets);
            /*for(let tweet in tweets) {
                console.log(tweets);
                await client.sendTime(message.channel,"Lastest tweets: "+ tweet['content'] +
                    "\n"+
                    tweet['date'] +
                    "\n"+
                    tweet['username']
                );
                await message.react("✅");
            }*/

        })

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

            if (
                guild.me.voice.channel &&
                !guild.me.voice.channel.equals(member.voice.channel)
            )
                return client.sendTime(
                    interaction,
                    `❌ | **You must be in ${guild.me.voice.channel} to use this command.**`
                );

        },
    },
};
