import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findStudentQuestions,
  findStudentQuestionsVariables,
  me_me_Teacher,
} from '../../../../../../schemaTypes'
import { date } from '../../../../../../utils'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'
import { StudentQuestion } from './StudentQuestion'

export type StudentQuestionViewerProps = {}

export const FIND_STUDENT_QUESTIONS_QUERY = gql`
  query findStudentQuestions($input: FindStudentQuestionsInput!) {
    findStudentQuestions(input: $input) {
      studentQuestions {
        studentId
        question
        timeAsked
      }
    }
  }
`

export const StudentQuestionViewer: FC<StudentQuestionViewerProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const { loading, data } = useQuery<
    findStudentQuestions,
    findStudentQuestionsVariables
  >(FIND_STUDENT_QUESTIONS_QUERY, {
    variables: {
      input: { courseId: state.context.courseInfo._id!, date },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  // if (loading) return <div>Loading </div>
  return (
    <>
      <div>Student Question</div>
      {data?.findStudentQuestions.studentQuestions.map((question) => (
        <StudentQuestion question={question} />
      ))}
    </>
  )
}
