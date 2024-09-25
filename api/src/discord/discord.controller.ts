import { Controller, Get } from "@nestjs/common";
import { createDiscordBot } from "./discord.utils";

@Controller('discord')
export class DiscordController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }
}