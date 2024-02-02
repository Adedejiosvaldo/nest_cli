import { Module } from '@nestjs/common';
import { JokesCommand } from './jokes.command';

@Module({
  imports: [JokesCommand],
})
export class JokesModule {}
