import setNumOfGuess from "../../../server/utils/game/setNumOfGuess.js";

import { describe, it } from "node:test";
import assert from "node:assert/strict";

export function runSetNumOfGuessTest() {

  describe ("Set the difficulty of the Game", () => {

    it("Correct values should result to the proper test case", () => {
      const result = setNumOfGuess(2)
      assert.strictEqual(result, 5)
    })

    it("Incorrect values should make the userGuess default to Easy Difficulty", () => {
      const result = setNumOfGuess(10)
      assert.strictEqual(result, 10)
    })

  })

}