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
        let i = 0
        let selector = `body > main > section > div > div.ags-ServerStatus-content-responses > div.ags-ServerStatus-content-responses-response.ags-ServerStatus-content-responses-response--centered.ags-js-serverResponse > div:nth-child(${i}) > div.ags-ServerStatus-content-responses-response-server-status-wrapper `
        console.log(SearchString)
        await page.goto('https://www.newworldstatus.com/');
        try {
            let SearchString = args.join(" ");
            if (!SearchString) return client.sendTime(message.channel, `**Usage - **\`${GuildDB.prefix}nws [server name]\``);
            await page.waitForSelector( selector, { timeout: 30000 })
            console.log('found')
            for(let i = 0;i < 300; i++)
            {
                selectorServer = `body > main > section > div > div.ags-ServerStatus-content-responses > div.ags-ServerStatus-content-responses-response.ags-ServerStatus-content-responses-response--centered.ags-js-serverResponse > div:nth-child(${i}) > div.ags-ServerStatus-content-responses-response-server-status-wrapper div:nth-child(1)`
                let ServerName =  await page.evaluate(el => el.innerText, await page.$(selectorServer))
                console.log(ServerName)
                if (ServerName.toLowerCase() == SearchString.toLowerCase())
                {
                    selectorServerStatus = `body > main > section > div > div.ags-ServerStatus-content-responses > div.ags-ServerStatus-content-responses-response.ags-ServerStatus-content-responses-response--centered.ags-js-serverResponse > div:nth-child(${i}) > div.ags-ServerStatus-content-responses-response-server-status-wrapper div:nth-child(1)`
                    let ServerStatus =  await page.evaluate(el => el.getAttribute('title'), await page.$(selectorServerStatus))
                    console.log(ServerStatus)
                    break;
                }
            }

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
