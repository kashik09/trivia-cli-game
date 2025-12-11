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

    // Update displayResults method
    displayResults() {
    const endTime = Date.now();
    this.totalTime = Math.floor((endTime - this.startTime) / 1000);
    const stats = this.getStatistics();
    
    console.clear();
    console.log(chalk.cyan.bold('\n🏁 GAME OVER! 🏁\n'));
    console.log(chalk.yellow('━'.repeat(40)));
    console.log(chalk.white.bold(`\n📊 Your Results:\n`));
    console.log(chalk.green(`✅ Correct Answers: ${stats.correctAnswers}`));
    console.log(chalk.red(`❌ Wrong Answers: ${stats.wrongAnswers}`));
    console.log(chalk.blue(`📝 Total Questions: ${stats.totalQuestions}`));
    console.log(chalk.magenta(`⏱️  Time Taken: ${this.formatTime(this.totalTime)}`));
    
    // Calculate percentage
    const percentage = ((this.score / questions.length) * 100).toFixed(1);
    console.log(chalk.cyan(`\n🎯 Score: ${percentage}%`));
    
    // Performance message
    if (percentage >= 80) {
        console.log(chalk.green.bold('\n🌟 Excellent work! You\'re a trivia master! 🌟\n'));
    } else if (percentage >= 60) {
        console.log(chalk.yellow.bold('\n👍 Good job! Keep practicing! 👍\n'));
    } else {
        console.log(chalk.blue.bold('\n💪 Nice try! Practice makes perfect! 💪\n'));
    }
    
    console.log(chalk.yellow('━'.repeat(40) + '\n'));
    }

    // Ask question with timer
    async askQuestionWithTimer(choices, questionIndex) {
    const answer = await select({
        message: 'Your answer:',
        choices: choices,
    });
    
    return answer;
    }

    // Add these methods to the TriviaGame class

    // Get statistics using array methods
    getStatistics() {
    const totalQuestions = questions.length;
    const correctAnswers = this.score;
    const wrongAnswers = totalQuestions - correctAnswers;
    
    // Use map to create an array of question difficulties (example)
    const questionLengths = questions.map(q => q.question.length);
    
    // Use filter to count questions with 4 options
    const standardQuestions = questions.filter(q => q.options.length === 4);
    
    // Use reduce to calculate total options
    const totalOptions = questions.reduce((sum, q) => sum + q.options.length, 0);
    
    return {
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        averageQuestionLength: questionLengths.reduce((a, b) => a + b) / totalQuestions,
        standardQuestions: standardQuestions.length,
        totalOptions,
    };
    }

    // Format time nicely
    formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    }
}

module.exports = TriviaGame;