import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DiscordController } from "./discord.controller";
import { AppAuthMiddleware } from "src/middlewares/appauth.middleware";

@Module({
    controllers: [DiscordController],
})

export class DiscordModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppAuthMiddleware).forRoutes('discord');
        consumer.apply(AppAuthMiddleware).forRoutes('discord/*');
    }
}