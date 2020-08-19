import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useMutation } from '@apollo/client'
import {
  updateCourseInfoVariables,
  updateCourseInfo,
} from '../../../../../schemaTypes'

export type EditCourseProps = {}

export const UPDATE_COURSE_INFO_MUTATION = gql`
  mutation updateCourseInfo($input: UpdateCourseInfoInput!) {
    updateCourseInfo(input: $input) {
      courseInfo {
        course {
          _id
          hasCourseInfo {
            _id
          }
        }
      }
    }
  }
`

export const EditCourse: FC<EditCourseProps> = () => {
  const { course } = useParams()
  const [updateCourseInfo] = useMutation<
    updateCourseInfo,
    updateCourseInfoVariables
  >(UPDATE_COURSE_INFO_MUTATION, {
    // variables: { input: {} },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <div>Edit Course</div>
    </>
  )
}
