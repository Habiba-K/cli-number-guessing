#! /usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import chalk from "chalk";
// Computer will generate Random number
//user input fo guessing number
//compare user input with computer generated number and show result
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 3000);
    });
};
async function welcome() {
    await sleep();
    neonTitle.stop();
}
let neonTitle = chalkAnimation.neon(`\nWelcome to the Number Guessing Game!\n\n --------------------------`); // Animation starts
await welcome();
async function askQuestion() {
    var randomNumber = Math.floor(Math.random() * 7 + 1);
    // console.log(randomNumber)
    let usrInput;
    do {
        let { userInput } = await inquirer.prompt([
            {
                type: 'input',
                name: 'userInput',
                message: 'Guess a number (between 1 - 7): ',
                validate: (value) => {
                    if (!isNaN(Number(value))) {
                        return true;
                    }
                    else {
                        return chalk.red('Please enter a valid number.');
                    }
                },
            },
        ]);
        usrInput = parseFloat(userInput);
        if (isNaN(usrInput)) {
            console.log(chalk.red('Error! Please enter a number.'));
        }
    } while (isNaN(usrInput));
    if (usrInput < 1) {
        console.log(chalk.red('Too low! Try again.\n'));
    }
    else if (usrInput > 7) {
        console.log(chalk.red('Too high! Try again.\n'));
    }
    else {
        if (randomNumber === usrInput) {
            chalkAnimation.rainbow(`\nCongratulations! You guessed correct number\n`); // Animation starts
            await welcome();
        }
        else {
            chalkAnimation.pulse("\nSorry! You guessed incorrect number\n");
            await welcome();
        }
    }
}
do {
    await askQuestion();
    var again = await inquirer
        .prompt({
        type: "input",
        name: "restart",
        message: "Do you want to continue? Press y: "
    });
    console.log("\n");
} while (again.restart == 'y' || again.restart == 'Y' || again.restart == 'yes' || again.restart == 'YES');
