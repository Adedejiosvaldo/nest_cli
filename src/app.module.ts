import { Module } from '@nestjs/common';

import { DictModule } from './dict/dict.module';
import { MultiplyCommand } from './dict/dict.command';
import { SearchDictonary } from './dict/search.dict';
import { ConfigModule } from '@nestjs/config';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [
    MultiplyCommand,
    SearchDictonary,
    ConfigModule.forRoot(),
    JokesModule,
  ],
  providers: [],
})
export class AppModule {}
