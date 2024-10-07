import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import db from "src/data/tables/pg/main";
import { DiscordBots } from "src/data/tables/pg/schema";
import tokenUtils from "src/utils/token.utils";

@Injectable()
export class AppAuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers['x-api-key'];

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const tokenPayload = tokenUtils.degenerateToken(authHeader);

        const botPromise = db.select(/*{
            id: DiscordBots.id,
            api_key: DiscordBots.api_key,
        }*/).from(DiscordBots).where(eq(DiscordBots.id, tokenPayload.id)).execute()

        botPromise.then((bots) => {
            if (!bots[0] || !tokenUtils.verifyToken(tokenPayload, bots[0].api_key)) {
                throw new UnauthorizedException('Invalid token');
            }
            req.bot = bots[0];
            next();
        });
    }
}