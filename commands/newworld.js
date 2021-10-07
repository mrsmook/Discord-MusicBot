const { MessageEmbed } = require("discord.js");
const puppeteer = require('puppeteer')

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
        console.log('Kaloon')
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        page.setUserAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36");

        await page.goto("https://www.newworldstatus.com/", {waitUntil: 'load', timeout: 0});
        await page.waitForSelector("body div.col-lg-8.mx-auto.p-3.py-md-5 main div:nth-child(4)");

        const serverStatus = page.$eval('body div.col-lg-8.mx-auto.p-3.py-md-5 main div:nth-child(4) div table:nth-child(20) tbody tr:nth-child(102) td.text-end span', el => el.innerText))
        const inGame = page.$eval('body > div.col-lg-8.mx-auto.p-3.py-md-5 > main > div:nth-child(4) > div > table:nth-child(20) > tbody > tr:nth-child(102) > td:nth-child(5)', el => el.innerText))
        const inQueue = page.$eval('body > div.col-lg-8.mx-auto.p-3.py-md-5 > main > div:nth-child(4) > div > table:nth-child(20) > tbody > tr:nth-child(102) > td:nth-child(6)', el => el.innerText))
        const inWaiting = page.$eval('body > div.col-lg-8.mx-auto.p-3.py-md-5 > main > div:nth-child(4) > div > table:nth-child(20) > tbody > tr:nth-child(102) > td:nth-child(7)', el => el.innerText))

        await client.sendTime(message.channel,":Kaloon server Status: "+ serverStatus +
            "\n"+
            "Player InGame : "+inGame +
            "\n"+
            "Player InQueue : "+ inQueue+
            "\n"+
            "Waiting time : "+ inWaiting);
        await message.react("✅");
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
