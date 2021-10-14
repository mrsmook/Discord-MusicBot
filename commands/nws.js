const { MessageEmbed } = require("discord.js");
const { chromium } = require("playwright-chromium");

module.exports = {
    name: "nws",
    description: "New World Server Status",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["newworldtstatus", "nwstatus"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        const browser = await chromium.launch({ args: ["--no-sandbox"] });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.newworldstatus.com/');
        try {
            await page.waitForSelector('body > main > section > div > div.ags-ServerStatus-content-responses > div.ags-ServerStatus-content-responses-response.ags-ServerStatus-content-responses-response--centered.ags-js-serverResponse.is-active > div:nth-child(197) > div.ags-ServerStatus-content-responses-response-server-name', { timeout: 30000 })
            console.log('found')
        } catch (error) {
            console.log("The element didn't appear.")
        }
        await browser.close();

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
