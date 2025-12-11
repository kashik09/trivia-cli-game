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
    // Loop through all questions
    for (let i = 0; i < questions.length; i++) {
        this.currentQuestion = i;
        const question = questions[i];
        
        console.log(chalk.blue(`\n📝 Question ${i + 1} of ${questions.length}`));
        console.log(chalk.white.bold(`\n${question.question}\n`));
        
        // Create choices for inquirer
        const choices = question.options.map((option, index) => ({
        name: option,
        value: index,
        }));
        
        // Get user answer with timer
        const userAnswer = await this.askQuestionWithTimer(choices, i);
        
        // Check if answer is correct
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) {
        this.score++;
        console.log(chalk.green.bold('✅ Correct!\n'));
        } else {
        console.log(chalk.red.bold(`❌ Wrong! Correct answer: ${question.options[question.correctAnswer]}\n`));
        }
        
        // Small pause between questions
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    this.displayResults();
    }

    // Ask question with timer
    async askQuestionWithTimer(choices, questionIndex) {
    const answer = await select({
        message: 'Your answer:',
        choices: choices,
    });
    
    return answer;
    }
}

module.exports = TriviaGame;