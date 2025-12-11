#!/usr/bin/env node

import chalk from 'chalk';
const TriviaGame = require('./game.js');

async function main() {
  try {
    const game = new TriviaGame();
    await game.start();
  } catch (error) {
    if (error.message === 'User force closed the prompt') {
      console.log(chalk.yellow('\n\nGame cancelled. Thanks for playing! 👋\n'));
    } else {
      console.error(chalk.red('\n❌ An error occurred:'), error.message);
    }
    process.exit(0);
  }
}

main();