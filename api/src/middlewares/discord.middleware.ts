import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import db from "src/data/tables/pg/main";
import { DiscordBots } from "src/data/tables/pg/schema";
import { createDiscordBot } from "src/discord/discord.utils";

@Injectable()
export class DiscordMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers.authorization.split(' ');

        const botId = authHeader[0] as number;
        const apiKey = authHeader[1];

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }
        const botPromise = db.select(/*{
            id: DiscordBots.id,
            api_key: DiscordBots.api_key,
        }*/).from(DiscordBots).where(eq(DiscordBots.id, botId)).execute()

        botPromise.then((bot) => {
            console.log(bot, "botik");
        });

        next();
    }

}