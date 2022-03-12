#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import rainbow from "chalk-animation";
import { createSpinner } from "nanospinner";

// console.log(chalk.bgGreen(('hi mum')) + chalk.bgRed(('hi dad'))); 

let playerName;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be a Javascript Millionaire? \n"
    );

    await sleep();
    rainbowTitle.stop();
    
    console.log(`
      ${chalk.bgBlue('HOW TO PLAY')}
      I am a process on your computer.
      If you get any questions wrong I will be ${chalk.bgRed('KILLED')}


    `);
}

async function askName() {

  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    },
  });

  playerName = answers.player_name
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question1',
    type: 'list',
    message: 'How many days did it take to create JavaScript? \n',
    choices: [
      '10 Hours',
      '10 Days',
      '10 Weeks',
      '10 Months',
      '10 Years'
      ],
  });

  return handleAnswer(answers.question1 == '10 Days');
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner ('Checking answer...').start();
  await sleep(1000);

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}, that is correct!`});
  } else {
    spinner.error({ text: `Sorry ${playerName}, that is incorrect!`});
    process.exit(1);
  }
}

async function winner() {
  console.clear();
  const msg = `Congrats ${playerName} ! \n £ 1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}






// await welcome();
// await askName();
// await question1();
await winner();