import React, { FC } from 'react'
import { findStudentQuestions_findStudentQuestions_studentQuestions } from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'

export type StudentQuestionProps = {
  question: findStudentQuestions_findStudentQuestions_studentQuestions
}

export const StudentQuestion: FC<StudentQuestionProps> = ({ question }) => {
  const [state] = useTeachersAidContextProvider()
  const [student] = state.context.courseInfo.course.hasStudents.filter(
    (student) => student._id === question.studentId
  )

  return (
    <>
      <span>{student} </span>
      <span>
        {question.timeAsked}: {question.question}
      </span>
    </>
  )
}
