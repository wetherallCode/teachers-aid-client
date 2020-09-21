import React, { FC, useState } from 'react'
import {
  AskAQuestionButton,
  QuestionContainer,
  QuestionInput,
  QuestionSubmitButton,
  CancelQuestion,
} from '../state/lessonStyles'
import { useToggle } from '../../../hooks'
import { gql, useMutation } from '@apollo/client'
import {
  createStudentQuestionVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createStudentQuestion,
  me_me,
  me_me_Teacher_teachesCourses,
} from '../../../schemaTypes'
import { useUserContextProvider } from '../../../contexts/UserContext'

export type StudentQuestionPromptProps = {
  courseToLoad?: me_me_Teacher_teachesCourses
  fakeCourse: me_me_Teacher_teachesCourses
}

export const CREATE_STUDENT_QUESTION_MUTATION = gql`
  mutation createStudentQuestion($input: CreateStudentQuestionInput!) {
    createStudentQuestion(input: $input) {
      studentQuestions {
        _id
        questions {
          student {
            _id
          }
          question
        }
      }
    }
  }
`

export const StudentQuestionPrompt: FC<StudentQuestionPromptProps> = ({
  courseToLoad,
  fakeCourse,
}) => {
  const me: me_me = useUserContextProvider()
  const [isQuestionVisible, toggleQuestion] = useToggle(false)
  const [question, setQuestion] = useState('')

  const [createStudentQuestion] = useMutation<
    createStudentQuestion,
    createStudentQuestionVariables
  >(CREATE_STUDENT_QUESTION_MUTATION, {
    variables: {
      input: {
        courseId: fakeCourse ? fakeCourse._id! : courseToLoad?._id!,
        question,
        studentId: me._id!,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      {!isQuestionVisible && (
        <AskAQuestionButton onClick={toggleQuestion}>
          Ask a Question
        </AskAQuestionButton>
      )}
      {isQuestionVisible && (
        <QuestionContainer>
          <QuestionInput onChange={(e: any) => setQuestion(e.target.value)} />
          <QuestionSubmitButton
            onClick={() => {
              createStudentQuestion()
              setQuestion('')
              toggleQuestion()
            }}
          >
            Ask
          </QuestionSubmitButton>
          <CancelQuestion onClick={toggleQuestion}>Cancel</CancelQuestion>
        </QuestionContainer>
      )}
    </>
  )
}
