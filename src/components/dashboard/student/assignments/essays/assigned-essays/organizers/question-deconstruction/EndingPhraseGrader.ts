import {
  QuestionTypeEnum,
  WritingLevelEnum,
} from '../../../../../../../../schemaTypes'
import { EndingPhraseAnswerTypes } from './EndingPhrase'

type EndingPhraseGraderProps = {
  correctQuestionWord: string
  givenQuestionWord: string
  writingLevel: WritingLevelEnum
  correctQuestionType?: QuestionTypeEnum
}

export function endingPhraseGrader({
  correctQuestionWord,
  givenQuestionWord,
  writingLevel,
  correctQuestionType,
}: EndingPhraseGraderProps) {
  if (writingLevel === 'DEVELOPING') {
    if (givenQuestionWord !== correctQuestionWord) {
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
  } else {
    if (correctQuestionType === 'HOW_PROBLEM_SOLUTION') {
      if (givenQuestionWord === 'toSolveAProblem')
        return {
          correct: true,
          message: `You got it.`,
          waitTime: 2,
          ending: 'to solve a problem',
        }
      if (givenQuestionWord === 'inACertainWay')
        return {
          correct: true,
          message: `You got it.`,
          waitTime: 2,
          ending: 'in a certain way',
        }
      else
        return {
          correct: false,
          message: `Incorrect. Try Again.`,
          waitTime: 5,
        }
    }
    if (correctQuestionType === 'HOW_CAUSE_EFFECT') {
      if (givenQuestionWord === 'inACertainWay')
        return {
          correct: true,
          message: `You got it.`,
          waitTime: 2,
          ending: 'in a certain way',
        }
      else
        return {
          correct: false,
          message: `Incorrect. Since the question is a cause and effect question, you need to select "...in a certain way"`,
          waitTime: 5,
        }
    } else {
      if (givenQuestionWord === 'forACertainReason')
        return {
          correct: true,
          message: `You got it.`,
          waitTime: 2,
          ending: 'for a certain reason.',
        }
      else
        return {
          correct: false,
          message: `Incorrect. Try Again.`,
          waitTime: 5,
        }
    }
  }
}
