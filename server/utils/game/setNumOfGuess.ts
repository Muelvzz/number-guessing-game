export default function setNumOfGuess(gameMode: number): number {
  let numOfGuesses

  switch (gameMode) {
    case 1:
      numOfGuesses = 10
      console.log(`You have ${numOfGuesses} chances to guess the correct number\n`)
      return numOfGuesses
      
    case 2:
      numOfGuesses = 5
      console.log(`You have ${numOfGuesses} chances to guess the correct number\n`)
      return numOfGuesses
      
    case 3:
      numOfGuesses = 3
      console.log(`You have ${numOfGuesses} chances to guess the correct number\n`)
      return numOfGuesses

    default:
      numOfGuesses = 10
      console.log(`Difficulty is defaulted into Easy. You now have ${numOfGuesses} to guess the correct answer.\n`)
      return numOfGuesses
  }
}