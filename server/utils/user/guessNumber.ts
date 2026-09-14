import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function guessNumber(secretNumber: number, numOfGuess: number): Promise<void> {
  const rl = readline.createInterface({ input, output })
  const initNumOfGuess = numOfGuess

  try {

    while(true) {
      if (numOfGuess === 0) {
        console.log(`You have run out of guesses, the secret number was ${secretNumber}\n`)
        break
      }

      let userInput: number = parseInt(await rl.question("Enter the number: "))

      if (userInput < secretNumber) {
        console.log(`Incorrect, the number is greater than ${userInput}`)
        numOfGuess -= 1
      } else if (userInput > secretNumber) {
        console.log(`Incorrect, the number is less than ${userInput}`)
        numOfGuess -= 1
      } else {
        console.log(`Congratulations! You have guessed the right number in ${initNumOfGuess - numOfGuess} attempts.\n`)
        break
      }
    }
  } finally {
    rl.close()
  }
}