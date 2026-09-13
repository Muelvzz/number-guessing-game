import askUserDifficulty from "./utils/user/askUserDifficulty.js"
import setNumOfGuess from "./utils/game/setNumOfGuess.js"

console.log("============================================")
console.log("----- NUMBER GUESSING GAME -----\n")

console.log("Welcome to the Number Guessing Game")
console.log("I'm thinking of a number between 1 and 100,")

console.log("Please select the difficulty level:")
console.log("1. Easy (10 chances)")
console.log("2. Medium (5 chances)")
console.log("3. Hard (3 chances)\n")

let gameMode: Promise<number> = askUserDifficulty()
let numOfGuess = setNumOfGuess(await gameMode)