import 'dotenv/config';
import express from 'express';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { verifyKeyMiddleware } from 'discord-interactions';
import { VerifyDiscordRequest } from './utils.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.login(process.env.DISCORD_TOKEN)

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async (req, res) => {
    const {type, id, data} = req.body;

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});