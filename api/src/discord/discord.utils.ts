import db from "src/data/tables/pg/main";
import { DiscordBots } from "src/data/tables/pg/schema";
import tokenUtils from "src/utils/token.utils";

export const createDiscordBot = async () : Promise<string> => {
    const apiKey: string = tokenUtils.generateApiKey();
    const salt: string = tokenUtils.generateSalt();

    const hashedApiKey: string = await tokenUtils.hashApiKey(apiKey, salt);

    const bots = await db.insert(DiscordBots).values({
        api_key: hashedApiKey
    }).returning(({
        id: DiscordBots.id
    }))
    const tokenPayload = {  id: bots[0].id,apiKey, salt };
    const token = tokenUtils.generateToken(tokenPayload);

    return `${token}`;
};

