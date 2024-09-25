import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDiscordBot } from './discord/discord.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

