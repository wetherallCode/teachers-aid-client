import React, { FC, useEffect } from 'react'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { gql, useLazyQuery } from '@apollo/client'
import {
  findStudentInfoByStudentId,
  findStudentInfoByStudentIdVariables,
} from '../../../../../schemaTypes'
import {
  StudentInfoDisplay,
  StudentControlPanel,
  StudentNameContainer,
} from '../styles/studentInfoStyles'

export type StudentInfoProps = {}
export const FIND_STUDENT_INFORMATION_QUERY = gql`
  query findStudentInfoByStudentId($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        _id
        firstName
        lastName
        hasAbsences {
          dayAbsent
        }
        hasAssignments {
          ... on ReadingGuide {
            dueDate
            readingGuideFinal {
              clarifyingQuestions
              howIsSectionOrganized
              majorIssue
              majorIssueSolved
              majorSolution
            }
          }
        }
        hasResponsibilityPoints {
          markingPeriod
          responsibilityPoints
        }
      }
    }
  }
`

export const StudentInfo: FC<StudentInfoProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const [loadStudentInfo, { loading, data }] = useLazyQuery<
    findStudentInfoByStudentId,
    findStudentInfoByStudentIdVariables
  >(FIND_STUDENT_INFORMATION_QUERY, {
    variables: {
      input: { studentId: state.context.studentId },
    },
    // onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  useEffect(() => {
    if (state.context.studentId) loadStudentInfo()
  }, [loadStudentInfo, state.context.studentId])

  if (loading)
    return (
      <>
        <StudentInfoDisplay>
          <StudentNameContainer></StudentNameContainer>
        </StudentInfoDisplay>
        <StudentControlPanel></StudentControlPanel>
      </>
    )

  return (
    <>
      <StudentInfoDisplay>
        <StudentNameContainer>
          {data?.findStudentById.student.firstName}{' '}
          {data?.findStudentById.student.lastName}
        </StudentNameContainer>
      </StudentInfoDisplay>
      <StudentControlPanel>
        <div>Control Panel</div>
      </StudentControlPanel>
    </>
  )
}
