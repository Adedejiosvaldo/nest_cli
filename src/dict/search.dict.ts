import { Animation } from 'termination';
import * as en from 'dictionary-en';
import { Command, CommandRunner, Option } from 'nest-commander';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

interface DictionaryClass {
  definition: String;
  valid: boolean;
  word: string;
}

@Command({ name: 'search' })
export class SearchDictonary extends CommandRunner {
  number: string;
  async run(): Promise<void> {}

  @Option({
    flags: '-w,--word <word>',
    description: 'Word being searched for',
    required: true,
  })
  async searchInDic(val: string) {
    // object frames
    const cradleFrames = [
      '╔════╤╤╤╤════╗\n' +
        '║    │││ \\   ║\n' +
        '║    │││  O  ║\n' +
        '║    OOO     ║',

      '╔════╤╤╤╤════╗\n' +
        '║    ││││    ║\n' +
        '║    ││││    ║\n' +
        '║    OOOO    ║',

      '╔════╤╤╤╤════╗\n' +
        '║   / │││    ║\n' +
        '║  O  │││    ║\n' +
        '║     OOO    ║',

      '╔════╤╤╤╤════╗\n' +
        '║    ││││    ║\n' +
        '║    ││││    ║\n' +
        '║    OOOO    ║',
    ];

    const stickmanFrames = [
      `
     O
     │
    / \\`,
      `
     O
     │
     |`,
      `
     O
     │
    / \\`,
    ];

    // create animation instance
    const animation = new Animation({
      fps: 30,
      maxSize: {
        width: 80,
        height: 10,
      },
    });

    // create objects
    const cradle = animation.add({
      x: 0,
      y: 0,
      content: cradleFrames[0],
      replaceSpace: true,
      color: 'cyan',
    });

    // create content transition, can be useful
    // if the object has different frames
    // loop option means transtion will loop,
    // loop interval is the interval between loops
    const cradleFramesTransition = cradle.transition(
      [
        {
          props: { content: cradleFrames[1] },
          duration: 300,
        },
        {
          props: { content: cradleFrames[2] },
          duration: 300,
        },
        {
          props: { content: cradleFrames[3] },
          duration: 300,
        },
      ],
      { loop: true, loopInterval: 300 },
    );

    // create movement transition, check API section
    // for available transition functions. You can also
    // use any custom transition function
    // alternate means it will repeat back and forth
    const cradleMoveTransition = cradle.transition(
      [
        {
          props: { x: 60 },
          duration: 1500,
          func: 'ease',
        },
      ],
      { loop: true, alternate: true },
    );

    animation.start();

    cradleFramesTransition.run();
    cradleMoveTransition.run();

    try {
      const value: string = val;

      const response = await axios.get<DictionaryClass>(
        `https://api.api-ninjas.com/v1/dictionary?word=${value}`,
        {
          headers: {
            'X-Api-Key': process.env.API_KEY,
          },
        },
      );
      animation.end({ clear: true });

      if (response.data.valid === false) {
        console.error('Invalid');
      } else {
        console.log(response.data.definition);
      }
    } catch (error) {
      console.error('Error fetching dictionary data:', error);
    }
    //   console.log(`${} multiplied by 2 is ${result}`);
  }
}
