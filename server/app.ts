import askUserDifficulty from "./utils/user/askUserDifficulty.js"
import { setNumOfGuess } from "./utils/game/setNumOfGuess.js"
import { getRandomInt } from "./utils/game/randomNum.js"
import { guessNumber } from "./utils/user/guessNumber.js"

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

let anotherGame = true

console.log("============================================")
console.log("----- NUMBER GUESSING GAME -----\n")

console.log("Welcome to the Number Guessing Game")
console.log("I'm thinking of a number between 1 and 100,")

do {
  console.log("Please select the difficulty level:")
  console.log("1. Easy (10 chances)")
  console.log("2. Medium (5 chances)")
  console.log("3. Hard (3 chances)\n")

  let gameMode = await askUserDifficulty()
  let numOfGuess = setNumOfGuess(gameMode)
  console.log("Let's start the game!\n")
  
  let randomNum = getRandomInt(1, 100)

  await guessNumber(randomNum, numOfGuess)

  const rl = readline.createInterface({ input, output })
  let userInput = await rl.question("Would you like to play another game (y/n)?: ")
  
  const formattedInput = userInput.trim().toLowerCase()
  if (formattedInput !== "y" && formattedInput !== "yes") {
    anotherGame = false
  }
  rl.close()

} while (anotherGame)