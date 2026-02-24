import { WORD_LENGTH } from "./play";

export function evaluateGuess(guess, answer) {
  const result = Array(WORD_LENGTH).fill("gray");
  const answerLetters = answer.split("");

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "green";
      answerLetters[i] = null;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "gray" && answerLetters.includes(guess[i])) {
      result[i] = "yellow";
      answerLetters[answerLetters.indexOf(guess[i])] = null;
    }
  }

  return result;
}