import { Module } from '@nestjs/common';
import { MultiplyCommand } from './dict.command';
import { CommandServiceTsService } from './command.service.ts.service';

@Module({
  imports: [],
  providers: [MultiplyCommand],
})
export class DictModule {}
