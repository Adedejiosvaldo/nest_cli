import en from 'dictionary-en';
import { Command, CommandRunner, Option } from 'nest-commander';

@Command({ name: 'multiply' })

export class MultiplyCommand extends CommandRunner {
  number: string;

  async run(): Promise<void> {}

  @Option({
    flags: '-n,--number <number>',
    description: 'The Number to multiply by 2',
  })
  parseNumber(val: string) {
    const number = val;
    const regex = /^[0-9]+$/;
    if (!regex.test(number)) {
      console.error('Values can only be numbers');
    } else {
      const parsedValue = parseFloat(number);
      const result = parsedValue * 2;
      console.log(`${number} multiplied by 2 is ${result}`);
    }
  }
}
