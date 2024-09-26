import { Injectable } from '@nestjs/common';
import { createDiscordBot } from './discord/discord.utils';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return createDiscordBot();
  }
}
