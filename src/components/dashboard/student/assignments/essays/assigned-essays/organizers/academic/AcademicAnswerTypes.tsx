import React, { useEffect } from 'react'
// import { useStudentEssayContextProvider } from '../../StudentEssayContext'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAnswerType,
  setAnswerTypeVariables,
  QuestionTypeEnum,
  findEssayById_findEssayById_essay_workingDraft_organizer,
  findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts,
  findEssayById_findEssayById_essay_topic,
} from '../../../../../../../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { AcademicProblemSolution } from './AcademicProblemSolution'
import { AcademicHowCauseEffect } from './AcademicHowCauseEffect'
import { AcademicWhyCauseEffect } from './AcademicWhyCauseEffect'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'
import { useStudentEssayContextProvider } from '../../state-and-styles/StudentEssayContext'
import {
  AcademicQuestionTypeContainer,
  OrganizerControlButtonContainer,
  OrganizerControlButton,
  AcademicRestatementTitle,
  AcademicQuestionTypeSelect,
  AcademicRestatementContainer,
  AcademicRestatementInput,
  RestatementOutput,
} from '../../state-and-styles/assignedEssayStyles'
import { UpdateAcademicOrganizerType } from './AcademicOrganizer'

export type AcademicAnswerTypesProps = {
  organizer: findEssayById_findEssayById_essay_workingDraft_organizer
  updateAcademicOrganizer: UpdateAcademicOrganizerType
  questionParts: findEssayQuestionById_findEssayQuestionById_essayQuestion_questionParts
  auxilaryVerbCheck: boolean
  topic: findEssayById_findEssayById_essay_topic
}

export const SET_ANSWER_TYPE_MUTATION = gql`
  mutation setAnswerType($input: SetAnswerTypeInput!) {
    setAnswerType(input: $input) {
      essay {
        _id
        workingDraft {
          organizer {
            ... on AcademicOrganizer {
              questionType
            }
          }
        }
      }
    }
  }
`

export const AcademicAnswerTypes = ({
  organizer,
  updateAcademicOrganizer,
  questionParts,
  topic,
}: AcademicAnswerTypesProps) => {
  const [state, event] = useStudentEssayContextProvider()
  const { questionTypeEnum } = useEnumContextProvider()

  const [setAnswerType] = useMutation<setAnswerType, setAnswerTypeVariables>(
    SET_ANSWER_TYPE_MUTATION,
    {
      variables: {
        input: {
          essayId: state.context.essayId,
          questionType: state.context.academicOrganizer.questionType!,
        },
      },
      onCompleted: (data) => console.log(data),
      refetchQueries: [''],
    }
  )

  useEffect(() => {
    if (!state.context.academicOrganizer.answer.preLoaded) {
      // setAnswerType()
      console.log('setting')
    }
  }, [
    setAnswerType,
    state.context.academicOrganizer.answer.preLoaded,
    state.context.academicOrganizer.questionType,
  ])

  useEffect(() => {
    if (state.context.academicOrganizer.answer.preLoaded) {
      // event({ type: 'NEXT' })
    }
  }, [event, state.context.academicOrganizer.answer.preLoaded])

  useEffect(() => {
    updateAcademicOrganizer()
  }, [
    state.context.academicOrganizer.restatement,
    // state.context.academicOrganizer.academicSentenceStructure,
    updateAcademicOrganizer,
  ])
  console.log(state.value)
  return (
    <>
      {state.matches('organizers.academicOrganizer.answer.questionType') && (
        <>
          <AcademicQuestionTypeContainer>
            <AcademicRestatementTitle>
              <div>What is the Question Type: </div>
            </AcademicRestatementTitle>
            <AcademicQuestionTypeContainer>
              <AcademicQuestionTypeSelect
                value={state.context.academicOrganizer.questionType}
                onChange={(e: any) => {
                  if (e.target.value !== 'none' || e.target.value !== null) {
                    event({
                      type: 'SET_FULL_QUESTION_TYPE',
                      payload: e.target.value,
                    })
                    setAnswerType({
                      variables: {
                        input: {
                          essayId: state.context.essayId,
                          questionType: e.target.value,
                        },
                      },
                    })
                  }
                }}
              >
                <option value={'none'}>Pick a Question Type</option>
                {questionTypeEnum.map((question: QuestionTypeEnum) => (
                  <option key={question} value={question}>
                    {question === 'HOW_PROBLEM_SOLUTION'
                      ? 'How: Problem and Solution'
                      : question === 'HOW_CAUSE_EFFECT'
                      ? 'How: Cause and Effect'
                      : 'Why: Cause and Effect'}
                  </option>
                ))}
              </AcademicQuestionTypeSelect>
            </AcademicQuestionTypeContainer>
            <AcademicRestatementContainer>
              <AcademicRestatementTitle>
                <div>Restatement</div>
              </AcademicRestatementTitle>
              <AcademicRestatementInput
                type='text'
                value={state.context.academicOrganizer.restatement}
                onChange={(e: any) =>
                  event({
                    type: 'SET_RESTATEMENT',
                    payload: e.target.value,
                  })
                }
              />
              <RestatementOutput>
                <div> {state.context.academicOrganizer.restatement}</div>
              </RestatementOutput>
            </AcademicRestatementContainer>
          </AcademicQuestionTypeContainer>
          <OrganizerControlButtonContainer>
            <OrganizerControlButton
              onClick={() => {
                event({ type: 'PREVIOUS' })
              }}
            >
              Back
            </OrganizerControlButton>
            <OrganizerControlButton
              onClick={() => {
                if (
                  organizer.__typename === 'AcademicOrganizer' &&
                  organizer.answerType !== null
                )
                  event({ type: 'NEXT' })
              }}
            >
              Next
            </OrganizerControlButton>
          </OrganizerControlButtonContainer>
        </>
      )}

      {state.matches('organizers.academicOrganizer.answer.problemSolution') &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.HOW_PROBLEM_SOLUTION && (
          <AcademicProblemSolution questionParts={questionParts} />
        )}
      {state.matches('organizers.academicOrganizer.answer.howCauseEffect') &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.HOW_CAUSE_EFFECT && (
          <AcademicHowCauseEffect questionParts={questionParts} />
        )}
      {state.matches('organizers.academicOrganizer.answer.whyCauseEffect') &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.WHY_CAUSE_EFFECT && (
          <AcademicWhyCauseEffect
            questionParts={questionParts}
            topic={topic}
            organizer={organizer}
          />
        )}
    </>
  )
}
