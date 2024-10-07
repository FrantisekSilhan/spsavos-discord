import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import db from './data/tables/pg/main';
import { Admins } from './data/tables/pg/schema';

async function bootstrap() {
  await db.insert(Admins)
  .values({
    discord_id: BigInt(798269878821715979),
  })
  .onConflictDoNothing({
    target: Admins.discord_id
  });
  

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

