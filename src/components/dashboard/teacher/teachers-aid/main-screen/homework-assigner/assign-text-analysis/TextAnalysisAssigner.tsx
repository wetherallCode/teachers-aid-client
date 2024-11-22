import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import {
  assignTextAnalysesVariables,
  assignTextAnalyses,
  findLessonByCourseAndDate,
  findLessonByCourseAndDateVariables,
  findLessonById,
  findLessonByIdVariables,
  findTextAnalysesByCourseIdAndDueDate,
  findTextAnalysesByCourseIdAndDueDateVariables,
  exemptTextAnalysisById,
  exemptTextAnalysisByIdVariables,
} from '../../../../../../../schemaTypes'
import { date } from '../../../../../../../utils'
import { FIND_LESSON_QUERY } from '../../../../../../lesson/LessonMainMenu'
import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'
import { FIND_LESSON_BY_ID_QUERY } from '../../../../assignments/create-assignments/create-essay/EssayLessonInfo'
import { TextAnalysisCreator } from './TextAnalysisCreator'
import {
  AssignAllQuizzesButton,
  IndividualQuizControlContainer,
  QuizControlPanelContainer,
  QuizNameContainer,
  QuizStatusIndicator,
} from '../../../styles/mainScreenStyles'
import {
  EXEMPT_TEXT_ANALYSIS_MUTATION,
  IndividualTextAnalysisButtons,
} from './IndividualTextAnalysisButtons'

export type TextAnalysisAssignerProps = {
  presentStudentList: string[]
}
export const ASSIGN_TEXTANALYSIS_QUERY = gql`
  mutation assignTextAnalyses($input: AssignTextAnalysesInput!) {
    assignTextAnalyses(input: $input) {
      assigned
    }
  }
`
// export const EXEMPT_TEXT_ANAlYSIS_MUTATION = gql`
//   mutation exemptTextAnalysisById($input: ExemptTextAnalysisByIdInput!) {
//     exemptTextAnalysisById(input: $input) {
//       updated
//     }
//   }
// `
export const FIND_TEXT_ANALYSIS_BY_COURSE_ID_QUERY = gql`
  query findTextAnalysesByCourseIdAndDueDate(
    $input: FindTextAnalysesByCourseIdAndDueDateInput!
  ) {
    findTextAnalysesByCourseIdAndDueDate(input: $input) {
      textAnalyses {
        _id
        hasOwner {
          firstName
          lastName
          _id
        }
        onTask
        workedWellWithGroup
        exempt
        startedPromptly
        textAnalysisCompletion
        assigned
        score {
          earnedPoints
          maxPoints
        }
      }
    }
  }
`

export const TextAnalysisAssigner = ({
  presentStudentList,
}: TextAnalysisAssignerProps) => {
  const [state, event] = useTeachersAidContextProvider()

  const { loading, data } = useQuery<findLessonById, findLessonByIdVariables>(
    FIND_LESSON_BY_ID_QUERY,
    {
      variables: {
        input: { _id: state.context.associatedLessonId },
      },
      onCompleted: (data) => console.log(data),
      onError: (error) => console.error(error),
    },
  )
  const { loading: textAnalysisLoading, data: textAnalysisData } = useQuery<
    findTextAnalysesByCourseIdAndDueDate,
    findTextAnalysesByCourseIdAndDueDateVariables
  >(FIND_TEXT_ANALYSIS_BY_COURSE_ID_QUERY, {
    variables: {
      input: {
        courseId: state.context.courseInfo?.course._id!,
        dueDate: new Date().toLocaleDateString(),
      },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  const [assignTextAnalyses] = useMutation<
    assignTextAnalyses,
    assignTextAnalysesVariables
  >(ASSIGN_TEXTANALYSIS_QUERY, {
    variables: {
      input: {
        assignedDate: new Date().toLocaleString(),
        studentIds: presentStudentList,
        associatedLessonId: data?.findLessonById.lesson?._id!,
        dueDate: new Date().toLocaleString(),
        readingSection:
          data?.findLessonById.lesson?.assignedSections.startingSection +
          ' - ' +
          data?.findLessonById.lesson?.assignedSections.endingSection,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findTextAnalysesByCourseIdAndDueDate'],
  })
  const [exemptTextAnalysis] = useMutation<
    exemptTextAnalysisById,
    exemptTextAnalysisByIdVariables
  >(EXEMPT_TEXT_ANALYSIS_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findTextAnalysesByCourseIdAndDueDate'],
  })
  if (loading || textAnalysisLoading) return <div>Loading </div>
  const bAreTextAnalysesCreated =
    textAnalysisData!.findTextAnalysesByCourseIdAndDueDate.textAnalyses
      .length !== 0

  if (!data?.findLessonById.lesson) {
    return <div>No Lesson for today</div>
  }

  if (!bAreTextAnalysesCreated) {
    return (
      <div>
        <TextAnalysisCreator
          presentStudentList={presentStudentList}
          lesson={data?.findLessonById.lesson!}
        ></TextAnalysisCreator>
      </div>
    )
  } else
    return (
      <QuizControlPanelContainer>
        <QuizNameContainer>
          <div>Text Analysis Assigner</div>
          <AssignAllQuizzesButton onClick={() => assignTextAnalyses({})}>
            Assign
          </AssignAllQuizzesButton>
        </QuizNameContainer>
        <IndividualQuizControlContainer>
          <div style={{ overflow: 'scroll' }}>
            {textAnalysisData?.findTextAnalysesByCourseIdAndDueDate.textAnalyses.map(
              (textAnalyses, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      backgroundColor:
                        i % 2 === 0 ? 'var(--grey)' : 'var(--white)',
                      display: 'grid',
                      gridTemplateColumns: '3fr 1fr',
                      height: '8%',
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ justifySelf: 'left' }}>
                      {textAnalyses.hasOwner.lastName},{' '}
                      {textAnalyses.hasOwner.firstName}
                    </div>
                    {textAnalyses.assigned ? (
                      <IndividualTextAnalysisButtons
                        textAnalysisId={textAnalyses._id!}
                        exempt={textAnalyses.exempt}
                      />
                    ) : (
                      <div
                        style={{
                          display: 'grid',
                          gridAutoFlow: 'column',
                          columnGap: '2vh',
                          justifyItems: 'center',
                        }}
                      >
                        <button
                          style={
                            textAnalyses.assigned
                              ? {
                                  backgroundColor: 'var(--red)',
                                  color: 'var(--white)',
                                  borderRadius: '5px',
                                  width: '100%',
                                }
                              : {
                                  backgroundColor: 'var(--blue)',
                                  color: 'var(--white)',
                                  borderRadius: '5px',
                                  width: '100%',
                                }
                          }
                          onClick={
                            () => {}
                            // assignQuizzes({
                            //   variables: {
                            //     input: {
                            //       assignedDate: new Date().toLocaleDateString(),
                            //       // assignedDate: '10/17/2021',
                            //       studentIds: [quiz.hasOwner._id!],
                            //       assign: true,
                            //     },
                            //   },
                            // })
                          }
                        >
                          Assign
                        </button>
                        <button
                          style={
                            textAnalyses.assigned
                              ? {
                                  backgroundColor: 'var(--red)',
                                  color: 'var(--white)',
                                  borderRadius: '5px',
                                  width: '100%',
                                }
                              : {
                                  backgroundColor: 'var(--blue)',
                                  color: 'var(--white)',
                                  borderRadius: '5px',
                                  width: '100%',
                                }
                          }
                          onClick={() => {
                            exemptTextAnalysis({
                              variables: {
                                input: {
                                  textAnalysisId: textAnalyses._id!,
                                },
                              },
                            })
                          }}
                        >
                          {!textAnalyses.exempt ? 'Not Exempt' : 'Exempt'}
                        </button>
                      </div>
                    )}
                  </div>
                )
              },
            )}
          </div>
        </IndividualQuizControlContainer>
      </QuizControlPanelContainer>
    )
}
