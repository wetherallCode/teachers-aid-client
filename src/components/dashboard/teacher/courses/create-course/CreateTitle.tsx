import React, { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  createCourseVariables,
  createCourse,
  findAllCourseTitles,
} from '../../../../../schemaTypes'
import { useCreateCourseContextProvider } from './state/CreateCourseContext'
import { useNavigate } from 'react-router'
import {
  CourseTitleButton,
  CourseTitleButtonContainer,
  CourseTitleContainer,
  CourseTitleInput,
  CreateCourseBodyContainer,
} from './state/createCourseStyles'

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

export const FIND_ALL_COURSE_TITLES_QUERY = gql`
  query findAllCourseTitles {
    findAllCourseTitles {
      courses {
        _id
        name
      }
    }
  }
`

export const CreateTitle = ({}: CreateTitleProps) => {
  const [state, event] = useCreateCourseContextProvider()
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const { loading, data } = useQuery<findAllCourseTitles>(
    FIND_ALL_COURSE_TITLES_QUERY,
    {
      onCompleted: (data) => console.log(data),
      onError: (error) => console.error(error),
    },
  )

  const [createCourse, { error }] = useMutation<
    createCourse,
    createCourseVariables
  >(CREATE_COURSE_MUTATION, {
    variables: { input: state.context.courseTitle },
    onCompleted: (data) => {
      event({
        type: 'ADD_COURSE_ID',
        payload: data.createCourse.course._id!,
      })
      event({ type: 'NEXT' })
    },
    onError: () => {
      setErrorMessage('Course name already in use.')
      handleError()
    },
    refetchQueries: [],
  })

  const handleClick = () => {
    createCourse()
  }
  const handleError = () => {
    const timer = setTimeout(() => {
      event({ type: 'CREATE_TITLE', payload: '' })
      setErrorMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }

  return (
    <CreateCourseBodyContainer onChange={(e) => e.preventDefault()}>
      <CourseTitleContainer>
        <div>What is the Course's Title?</div>
        <div>
          <CourseTitleInput
            autoFocus={true}
            onChange={(e: any) => {
              if (e.target.value !== '') {
                event({ type: 'CREATE_TITLE', payload: e.target.value })
              }
            }}
          />
        </div>
      </CourseTitleContainer>
      {!errorMessage ? (
        <CourseTitleButtonContainer>
          <CourseTitleButton onClick={() => navigate('/dashboard')}>
            Back
          </CourseTitleButton>
          {state.context.courseTitle.name !== '' && (
            <CourseTitleButton
              type={state.context.courseTitle.name ? 'reset' : 'button'}
              onClick={handleClick}
            >
              Choose this Title
            </CourseTitleButton>
          )}
        </CourseTitleButtonContainer>
      ) : (
        <CourseTitleButtonContainer>{errorMessage}</CourseTitleButtonContainer>
      )}
    </CreateCourseBodyContainer>
  )
}
