import React, { FC } from 'react'
import { gql, useMutation } from '@apollo/client'
import { createCourseVariables, createCourse } from '../../../../../schemaTypes'
import { useCreateCourseContextProvider } from './state/CreateCourseContext'
import { useNavigate } from 'react-router'

export type CreateTitleProps = {}

export const CREATE_COURSE_MUTATION = gql`
  mutation createCourse($input: CreateCourseInput!) {
    createCourse(input: $input) {
      course {
        _id
      }
    }
  }
`

export const CreateTitle: FC<CreateTitleProps> = () => {
  const [state, event] = useCreateCourseContextProvider()
  const navigate = useNavigate()
  const [createCourse] = useMutation<createCourse, createCourseVariables>(
    CREATE_COURSE_MUTATION,
    {
      variables: { input: state.context.courseTitle },
      onCompleted: (data) => {
        console.log(data.createCourse.course._id)
        event({
          type: 'ADD_COURSE_ID',
          payload: data.createCourse.course._id!,
        })
      },
      refetchQueries: [],
    }
  )
  return (
    <>
      <div>What is the Course's Title?</div>
      <input
        onChange={(e: any) => {
          if (e.target.value !== '') {
            event({ type: 'CREATE_TITLE', payload: e.target.value })
          }
        }}
      />
      <div>
        <button
          onClick={() => {
            createCourse()
            event({ type: 'NEXT' })
          }}
        >
          Choose this Title
        </button>
        <button onClick={() => navigate('/dashboard')}>Go to DashBoard</button>
      </div>
    </>
  )
}
