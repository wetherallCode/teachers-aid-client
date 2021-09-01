type EndingPhraseGraderProps = {
  correctQuestionWord: string
  givenQuestionWord: string
}

export function endingPhraseGrader({
  correctQuestionWord,
  givenQuestionWord,
}: EndingPhraseGraderProps) {
  console.log(givenQuestionWord === correctQuestionWord)

  if (givenQuestionWord !== correctQuestionWord) {
    console.log('incorrect')
    if (correctQuestionWord === 'how') {
      return {
        correct: false,
        message: `Incorrect. Try Again.`,
        waitTime: 5,
        ending: 'in a certain way.',
      }
    } else {
      return {
        correct: false,
        message: `Incorrect. Try Again.`,
        waitTime: 5,
        ending: 'for a certain reason.',
      }
    }
  } else {
    console.log('correct')
    if (correctQuestionWord === 'how')
      return {
        correct: true,
        message: `Correct.`,
        waitTime: 2,
        ending: 'in a certain way.',
      }
    else {
      return {
        correct: true,
        message: `You got it.`,
        waitTime: 2,
        ending: 'for a certain reason.',
      }
    }
  }
}
