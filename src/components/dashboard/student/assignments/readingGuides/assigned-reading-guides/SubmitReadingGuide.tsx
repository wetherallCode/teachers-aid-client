import React from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  findReadingGuideById_findReadingGuideById_readingGuide,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  submitReadingGuide,
  submitReadingGuideVariables,
} from '../../../../../../schemaTypes'
import { useNavigate } from 'react-router'
import { useReadingGuideToCompleteContextProvider } from '../state-and-styles/ReadingGuideToCompleteContext'
import {
  ReadingGuideAnswerBlock,
  ReadingGuideQuestionReview,
  ReadingGuideQuestionReviewAnswer,
  ReadingGuideQuestionReviewTitle,
  SmallNextButton,
  SubmitReadingGuideContainer,
} from '../state-and-styles/readingGuideStyles'
import { responsibilityPointConverter } from '../../../../../../utils'
import { useCalculateGrades } from '../../../../../../hooks/useCalculateGrades'
import {
  ReadingGuideQuestionState,
  readingGuideQuestions,
} from '../state-and-styles/RadingGuideQuestionState'

export type SubmitReadingGuideProps = {
  readingGuideInfo: findReadingGuideById_findReadingGuideById_readingGuide
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  readingGuideLevel: ReadingGuideQuestionState[]
}

export const SUBMIT_READING_GUIDE_MUTATION = gql`
  mutation submitReadingGuide($input: SubmitReadingGuideInput!) {
    submitReadingGuide(input: $input) {
      readingGuide {
        _id
      }
    }
  }
`

export const SubmitReadingGuide = ({
  readingGuideInfo,
  setCurrentIndex,
  readingGuideLevel,
}: SubmitReadingGuideProps) => {
  const navigate = useNavigate()
  const [state] = useReadingGuideToCompleteContextProvider()

  const { grade, loading: gradeLoading } = useCalculateGrades({
    studentId: readingGuideInfo.hasOwner._id!,
    markingPeriod: readingGuideInfo.markingPeriod,
    polling: false,
  })

  const [submitReadingGuide] = useMutation<
    submitReadingGuide,
    submitReadingGuideVariables
  >(SUBMIT_READING_GUIDE_MUTATION, {
    onCompleted: () => {
      navigate('/dashboard/assignments')
    },
    refetchQueries: ['findReadingGuidesToComplete', 'findReadingGuideById'],
  })

  return (
    <SubmitReadingGuideContainer>
      <div style={{ width: '100%' }}>
        <ReadingGuideQuestionReviewTitle>
          Review Answers - Click on Answer to Change
        </ReadingGuideQuestionReviewTitle>
        <br />
        <ReadingGuideQuestionReview>
          {readingGuideInfo.readingGuideFinal?.readingGuideQuestions!.map(
            (q) => {
              const [question] = readingGuideQuestions.filter(
                (question) => question.questionType === q.questionType
              )
              const index = readingGuideLevel.findIndex(
                (i) => i === question.questionType
              )

              return (
                <ReadingGuideAnswerBlock
                  key={q.questionType}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div>{question.question}</div>
                  <br />
                  <ReadingGuideQuestionReviewAnswer key={q.answer}>
                    {q.answer}
                  </ReadingGuideQuestionReviewAnswer>
                </ReadingGuideAnswerBlock>
              )
            }
          )}
        </ReadingGuideQuestionReview>
      </div>
      <SmallNextButton
        onClick={() =>
          submitReadingGuide({
            variables: {
              input: {
                // ...state.context.submitReadingGuideInputs,
                readingGuideId:
                  state.context.updateReadingGuideInputs.readingGuideId,
                completeReadingGuide: true,
                paperBased: false,
                late: false,
                submitTime: new Date().toLocaleString(),
                responsibilityPoints: responsibilityPointConverter(grade, 5),
              },
            },
          })
        }
      >
        Submit
      </SmallNextButton>
    </SubmitReadingGuideContainer>
  )
}
