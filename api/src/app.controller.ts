import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createDiscordBot } from './discord/discord.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    createDiscordBot().then((res) => console.log(res));
    return this.appService.getHello();
  }
}
