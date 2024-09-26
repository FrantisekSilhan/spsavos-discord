import { Controller, Get } from "@nestjs/common";

@Controller('discord')
export class DiscordController {
    @Get()
    default(): string {
        return 'This action returns all cats';
    }
}