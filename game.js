import chalk from 'chalk';
import { select } from '@inquirer/prompts';
const questions = require('./questions.js');

class TriviaGame {
  constructor() {
    this.score = 0;
    this.currentQuestion = 0;
    this.totalTime = 0;
    this.startTime = null;
  }

  // Start the game
  async start() {
    console.clear();
    console.log(chalk.cyan.bold('\n🎮 WELCOME TO TRIVIA CHALLENGE! 🎮\n'));
    console.log(chalk.yellow(`Total Questions: ${questions.length}`));
    console.log(chalk.yellow('Answer as many as you can!\n'));
    
    this.startTime = Date.now();
    await this.playGame();
  }

  // Main game loop
  async playGame() {
    // We'll build this next!
  }

  // Display final results
  displayResults() {
    // We'll build this next!
  }
}

module.exports = TriviaGame;