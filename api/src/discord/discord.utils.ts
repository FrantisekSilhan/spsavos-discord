import { randomBytes } from "crypto";
import db from "src/data/tables/pg/main";
import { DiscordBots } from "src/data/tables/pg/schema";

const bcrypt = require('bcrypt');

export const createDiscordBot = async () : Promise<string> => {
    const token = randomBytes(32).toString('hex');

    const bots = await db.insert(DiscordBots).values({
        api_key: await bcrypt.hash(token, 10)
    }).returning(({
        id: DiscordBots.id,

    })).execute();

    const bot = bots[0];

    return `${bot.id} ${token}`;
};

