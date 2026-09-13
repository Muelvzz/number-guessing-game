import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

enum gameDifficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3
}

export default async function askUserDifficulty(): Promise<number> {
  const rl = readline.createInterface({ input, output })
  
  try {
    while (true) {
      let gameMode: number = parseInt(await rl.question("Enter your choice: "))
      if (gameMode in gameDifficulty) {
        console.log(`Great! You have selected ${gameDifficulty[gameMode]} Difficulty.`)
        return gameMode
      }
      console.log("\nInvalid input, please try again.")
    }
  } finally {
    rl.close()
  }
}