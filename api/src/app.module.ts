import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DiscordModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
