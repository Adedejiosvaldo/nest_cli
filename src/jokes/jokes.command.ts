// export class JokesCommand {}

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

@Command({ name: 'joke' })
export class JokesCommand extends CommandRunner {
  number: string;
  async run(): Promise<void> {
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

    let stickman = animation.add({
      x: -20,
      y: 0,
      content: stickmanFrames[0],
      replaceSpace: true,
      color: 'green',
    });

    // create content transition, can be useful
    // if the object has different frames
    // loop option means transtion will loop,
    // loop interval is the interval between loops

    const stickmanFramesTransition = stickman.transition(
      [
        {
          props: { content: stickmanFrames[1] },
          duration: 100,
        },
        {
          props: { content: stickmanFrames[2] },
          duration: 100,
        },
      ],
      { loop: true, loopInterval: 100 },
    );

    // create movement transition, check API section
    // for available transition functions. You can also
    // use any custom transition function
    // alternate means it will repeat back and forth

    const stickmanMoveTransition = stickman.transition(
      [
        {
          props: { x: 80 },
          duration: 5000,
          func: 'linear',
        },
      ],
      { loop: true },
    );

    // start renering frames
    animation.start();

    // run transitions, this will return a promis that resolves
    // when transition is completed
    // cradleFramesTransition.run();
    // cradleMoveTransition.run();

    // set stickman object props
    stickman.update({ x: 0, y: 0 });
    // start stickman transitions
    stickmanMoveTransition.run();

    // setTimeout(() => animation.end(), 20000);

    try {
      const { data } = await axios.get(
        `https://api.api-ninjas.com/v1/jokes?limit=${1}`,
        {
          headers: {
            'X-Api-Key': process.env.API_KEY,
          },
        },
      );
      animation.end({ clear: true });

      console.log(data[0].joke);
    } catch (error) {
      console.error('Error fetching dictionary data:', error);
    }
    //   console.log(`${} multiplied by 2 is ${result}`);
  }
}
