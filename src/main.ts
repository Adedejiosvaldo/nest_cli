import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';



async function bootstrap() {
  await CommandFactory.run(AppModule);
  //   await app.listen(3000);
}
bootstrap();
