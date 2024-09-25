import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DiscordController } from "./discord.controller";
import { DiscordMiddleware } from "src/middlewares/discord.middleware";

@Module({
    controllers: [DiscordController],
})

export class DiscordModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(DiscordMiddleware).forRoutes('discord');
    }
}