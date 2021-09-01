import { AnswerProps } from './MultipleChoice'

type multipleChoiceGraderProps = {
  answer: AnswerProps | null
  difficultyLevel: number
}

export const multipleChoiceGrader = ({
  answer,
  difficultyLevel,
}: multipleChoiceGraderProps) => {
  if (answer?.correct) {
    return { points: difficultyLevel }
  }
  if (answer?.partiallyCorrect) {
    return { points: difficultyLevel / 2 }
  }
  return { points: 0 }
}
