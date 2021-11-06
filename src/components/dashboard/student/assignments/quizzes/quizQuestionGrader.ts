import { findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList } from '../../../../../schemaTypes'

type multipleChoiceGraderProps = {
  answer: null | findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList
  difficultyLevel: number
}

export const multipleChoiceGrader = ({
  answer,
  difficultyLevel,
}: multipleChoiceGraderProps) => {
  if (answer?.correct) {
    return {
      points: difficultyLevel,
      earnedPoints:
        difficultyLevel === 3 ? 1 : difficultyLevel === 2 ? 0.8 : 0.6,
    }
  }
  if (answer?.partiallyCorrect) {
    return { points: difficultyLevel / 2, earnedPoints: 0 }
  }

  return { points: 0, earnedPoints: 0 }
}

type trueFalseGraderProps = {
  answer: null | findQuizQuestionsByQuizzableSections_findQuizQuestionsByQuizzableSections_quizQuestions_answerList
  difficultyLevel: number
}

export const trueFalseGrader = ({
  answer,
  difficultyLevel,
}: trueFalseGraderProps) => {
  if (answer?.correct) {
    return {
      points: difficultyLevel,
      earnedPoints:
        difficultyLevel === 3 ? 1 : difficultyLevel === 2 ? 0.8 : 0.6,
    }
  } else return { points: 0, earnedPoints: 0 }
}
