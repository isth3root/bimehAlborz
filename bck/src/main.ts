import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedAdmin } from './seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  const dataSource = app.get(DataSource);
  await seedAdmin(dataSource);
}
bootstrap();
