import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  CheckTextAnalysisInput,
  checkTextAnalysisVariables,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments,
  TextAnalysisCompletionEnum,
  checkTextAnalysis,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis,
  findParagraphCountByTextSectionId,
  findParagraphCountByTextSectionIdVariables,
} from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'
import {
  StudentBehaviorButton,
  StudentBehaviorButtonContainer,
} from '../../styles/studentInfoStyles'
import { FIND_PARAGRAPH_NUMBERS_QUERY } from '../../../../../lesson/lesson-components/LessonDetails'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { GradeDisplay } from '../../../../../home/homeStyles'

export type TextAnalysisCheckProps = {
  textAnalysis: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis
}

export const CHECK_TEXT_ANAYLSIS_MUTATION = gql`
  mutation checkTextAnalysis($input: CheckTextAnalysisInput!) {
    checkTextAnalysis(input: $input) {
      checked
    }
  }
`

export const TextAnalysisCheck = ({ textAnalysis }: TextAnalysisCheckProps) => {
  const [state, event] = useTeachersAidContextProvider()
  const { textAnalysisCompletionEnum } = useEnumContextProvider()
  const [textAnalysisState, setTextAnalysisState] =
    useState<CheckTextAnalysisInput>({
      finishedEssentialQuestion: false,
      onTask: textAnalysis.onTask,
      paragraphCount: 0,
      startedPromptly: textAnalysis.startedPromptly,
      textAnalysisCompletion: textAnalysis.textAnalysisCompletion,
      textAnalysisId: textAnalysis._id!,
      workedWellWithGroup: textAnalysis.workedWellWithGroup,
    })

  const [checkTextAnalysis] = useMutation<
    checkTextAnalysis,
    checkTextAnalysisVariables
  >(CHECK_TEXT_ANAYLSIS_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })

  useEffect(() => {
    checkTextAnalysis({
      variables: { input: textAnalysisState },
    })
    console.log('updated')
  }, [textAnalysisState])

  const score =
    (textAnalysis.score.earnedPoints / textAnalysis.score.maxPoints) * 100

  return (
    <StudentBehaviorButtonContainer
      style={{ gridTemplateRows: '1fr 5fr 1fr 5fr' }}
    >
      <div style={{ color: 'var(--blue)', fontSize: '2vh' }}>
        Text Analysis: {Math.round(score)}%
      </div>
      <div style={{ display: 'grid', height: '100%', width: '100%' }}>
        <StudentBehaviorButtonContainer>
          {textAnalysisCompletionEnum.map(
            (check: TextAnalysisCompletionEnum, i: number) => {
              return (
                <StudentBehaviorButton
                  key={i}
                  goodBehavior={check !== 'NO_ATTEMPT'}
                  style={
                    textAnalysis.textAnalysisCompletion === check
                      ? { background: 'var(--blue)' }
                      : { background: 'var(--white)', color: 'var(--blue)' }
                  }
                  onClick={() =>
                    setTextAnalysisState({
                      ...textAnalysisState,
                      textAnalysisCompletion: check,
                    })
                  }
                >
                  {underscoreEliminator(phraseCapitalizer(check))}
                </StudentBehaviorButton>
              )
            },
          )}
        </StudentBehaviorButtonContainer>
      </div>
      <div style={{ color: 'var(--blue)', fontSize: '2vh' }}>
        ______________________________
      </div>
      <div style={{ display: 'grid', height: '100%', width: '100%' }}>
        <StudentBehaviorButtonContainer>
          <StudentBehaviorButton
            goodBehavior={textAnalysis.onTask === true}
            onClick={() =>
              setTextAnalysisState({
                ...textAnalysisState,
                onTask: !textAnalysisState.onTask,
              })
            }
          >
            On Task
          </StudentBehaviorButton>
          <StudentBehaviorButton
            goodBehavior={textAnalysis.startedPromptly === true}
            onClick={() => {
              setTextAnalysisState({
                ...textAnalysisState,
                startedPromptly: !textAnalysisState.startedPromptly,
              })
            }}
          >
            Started Promptly
          </StudentBehaviorButton>
          <StudentBehaviorButton
            goodBehavior={textAnalysis.workedWellWithGroup === true}
            onClick={() =>
              setTextAnalysisState({
                ...textAnalysisState,
                workedWellWithGroup: !textAnalysisState.workedWellWithGroup,
              })
            }
          >
            Worked with Group
          </StudentBehaviorButton>
        </StudentBehaviorButtonContainer>
      </div>
    </StudentBehaviorButtonContainer>
  )
}
