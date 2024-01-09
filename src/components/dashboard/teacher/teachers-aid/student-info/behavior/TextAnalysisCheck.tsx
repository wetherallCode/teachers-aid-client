import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  CheckTextAnalysisInput,
  checkTextAnalysisVariables,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments,
  TextAnalysisCompletionEnum,
  checkTextAnalysis,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student_hasAssignments_TextAnalysis,
} from '../../../../../../schemaTypes'
import {
  phraseCapitalizer,
  underscoreEliminator,
} from '../../../../../../utils'
import {
  StudentBehaviorButton,
  StudentBehaviorButtonContainer,
} from '../../styles/studentInfoStyles'

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
  const { TextAnalysisCompletionEnum } = useEnumContextProvider()

  const [checkTextAnalysis] = useMutation<
    checkTextAnalysis,
    checkTextAnalysisVariables
  >(CHECK_TEXT_ANAYLSIS_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentByIdForTeachersAid'],
  })
  return (
    <StudentBehaviorButtonContainer style={{ gridTemplateRows: '1fr 5fr' }}>
      <div>{textAnalysis.textAnalysisCompletion}</div>
      <StudentBehaviorButtonContainer style={{ height: '100%', width: '100%' }}>
        {TextAnalysisCompletionEnum.map(
          (check: TextAnalysisCompletionEnum, i: number) => (
            <StudentBehaviorButton
              key={i}
              goodBehavior={check !== 'NOT_COMPLETE'}
              onClick={() =>
                checkTextAnalysis({
                  variables: {
                    input: {
                      textAnalysisCompletion: check,
                      textAnalysisId: textAnalysis._id!,
                    },
                  },
                })
              }
            >
              {underscoreEliminator(phraseCapitalizer(check))}
            </StudentBehaviorButton>
          ),
        )}
      </StudentBehaviorButtonContainer>
    </StudentBehaviorButtonContainer>
  )
}
