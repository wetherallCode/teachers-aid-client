import { gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'
import {
  StudentBehaviorButton,
  StudentBehaviorButtonContainer,
} from '../../styles/studentInfoStyles'
import {
  checkTextAnalysisVariables,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis,
  checkTextAnalysis,
  TextAnalysisCompletionEnum,
} from '../../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'

export type TextAnalysisCheckProps = {
  textAnalysis: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis
}

export const CHECK_TEXT_ANALYLSIS_MUTATION = gql`
  mutation checkTextAnalysis($input: CheckTextAnalysisInput!) {
    checkTextAnalysis(input: $input) {
      checked
    }
  }
`

export const TextAnalysisCheck = ({ textAnalysis }: TextAnalysisCheckProps) => {
  const { textAnalysisCompletionEnum } = useEnumContextProvider()
  const [textAnalysisCheckState, setTextAnalysisCheckState] = useState<
    'ANALYSIS' | 'QUALITY'
  >('QUALITY')
  const [analysisInfo, setAnalysisInfo] = useState({
    textAnalysisCompletion: TextAnalysisCompletionEnum.PARTIAL_COMPLETION,
    textAnalysisId: textAnalysis._id,
    finishedEssentialQuestion: false,
    workedWellWithGroup: false,
    startedPromptly: false,
    onTask: true,
  })
  const [checkTextAnalysis] = useMutation<
    checkTextAnalysis,
    checkTextAnalysisVariables
  >(CHECK_TEXT_ANALYLSIS_MUTATION, {
    onCompleted: (data) => console.log(data),
    onError: (err) => console.log(err),
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })
  const handleClick = (state: 'ANALYSIS' | 'QUALITY') => {
    setTextAnalysisCheckState(state)
  }
  useEffect(() => {
    // checkTextAnalysis({
    //   variables: {
    //     input: {
    //       textAnalysisId: analysisInfo.textAnalysisId!,
    //       textAnalysisCompletion: analysisInfo.textAnalysisCompletion,
    //       startedPromptly: analysisInfo.startedPromptly,
    //       finishedEssentialQuestion: analysisInfo.finishedEssentialQuestion,
    //       workedWellWithGroup: analysisInfo.workedWellWithGroup,
    //       onTask: analysisInfo.onTask,
    //     },
    //   },
    // })
  }, [analysisInfo, checkTextAnalysis])
  return (
    <StudentBehaviorButtonContainer style={{ gridTemplateRows: '1fr 5fr' }}>
      {/*<div>{textAnalysis.textAnalysisCompletion}</div>*/}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          justifyItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '3vh',
            color: 'var(--blue)',
            textDecoration:
              textAnalysisCheckState === 'ANALYSIS' ? 'underline' : 'none',
          }}
          onClick={() => handleClick('ANALYSIS')}
        >
          Text Analysis
        </div>
        <div
          style={{
            fontSize: '3vh',
            color: 'var(--blue)',
            textDecoration:
              textAnalysisCheckState === 'QUALITY' ? 'underline' : 'none',
          }}
          onClick={() => handleClick('QUALITY')}
        >
          Group
        </div>
      </div>
      {textAnalysisCheckState === 'ANALYSIS' && (
        <StudentBehaviorButtonContainer
          style={{ height: '100%', width: '100%' }}
        >
          {textAnalysisCompletionEnum.map(
            (check: TextAnalysisCompletionEnum, i: number) => (
              <StudentBehaviorButton
                key={i}
                goodBehavior={check === analysisInfo.textAnalysisCompletion}
                onClick={() => {
                  setAnalysisInfo({
                    ...analysisInfo,
                    textAnalysisCompletion: check,
                  })
                }}
              >
                {underscoreEliminator(phraseCapitalizer(check))}
              </StudentBehaviorButton>
            ),
          )}
        </StudentBehaviorButtonContainer>
      )}
      {textAnalysisCheckState === 'QUALITY' && (
        <StudentBehaviorButtonContainer
          style={{ height: '100%', width: '100%' }}
        >
          <StudentBehaviorButton
            goodBehavior={analysisInfo.workedWellWithGroup}
            onClick={() => {
              setAnalysisInfo({
                ...analysisInfo,
                workedWellWithGroup: !analysisInfo.workedWellWithGroup,
              })
            }}
          >
            Worked with Group
          </StudentBehaviorButton>
          <StudentBehaviorButton
            goodBehavior={analysisInfo.onTask}
            onClick={() => {
              setAnalysisInfo({
                ...analysisInfo,
                onTask: !analysisInfo.onTask,
              })
            }}
          >
            On Task
          </StudentBehaviorButton>
          <StudentBehaviorButton
            goodBehavior={analysisInfo.startedPromptly}
            onClick={() => {
              setAnalysisInfo({
                ...analysisInfo,
                startedPromptly: !analysisInfo.startedPromptly,
              })
            }}
          >
            Started Promptly
          </StudentBehaviorButton>
          <StudentBehaviorButton
            goodBehavior={analysisInfo.finishedEssentialQuestion}
            onClick={() => {
              setAnalysisInfo({
                ...analysisInfo,
                finishedEssentialQuestion:
                  !analysisInfo.finishedEssentialQuestion,
              })
            }}
          >
            Completed EQ
          </StudentBehaviorButton>
        </StudentBehaviorButtonContainer>
      )}
    </StudentBehaviorButtonContainer>
  )
}
