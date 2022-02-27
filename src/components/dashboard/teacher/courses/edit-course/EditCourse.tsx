import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  updateCourseInfoVariables,
  updateCourseInfo,
  findCourseByIdForCourseEditor,
  findCourseByIdForCourseEditorVariables,
  CourseMaxSizeEnum,
} from '../../../../../schemaTypes'
import { useEditCourseContextProvider } from './state-n-styles/EditCourseContext'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'

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

export const FIND_COURSE_INFO_FOR_COURSE_EDITOR_QUERY = gql`
  query findCourseByIdForCourseEditor($input: FindCourseByIdInput!) {
    findCourseById(input: $input) {
      course {
        _id
        name
        hasCourseInfo {
          courseType
          endsAt
          halfDayEndsAt
          halfDayStartsAt
          schoolDayType
          startsAt
          assignedSeats {
            student {
              _id
            }
          }
          cohortBasedSeating
        }
      }
    }
  }
`

export const EditCourse: FC<EditCourseProps> = () => {
  const { course } = useParams()
  const [state, event] = useEditCourseContextProvider()

  const { courseMaxSizeEnum, courseTypeEnum, schoolDayType } =
    useEnumContextProvider()

  const { loading, data } = useQuery<
    findCourseByIdForCourseEditor,
    findCourseByIdForCourseEditorVariables
  >(FIND_COURSE_INFO_FOR_COURSE_EDITOR_QUERY, {
    variables: {
      input: { courseId: course! },
    },
    onCompleted: (data) => {
      const { name, hasCourseInfo } = data.findCourseById.course
      const {
        courseType,
        endsAt,
        startsAt,
        halfDayEndsAt,
        halfDayStartsAt,
        schoolDayType,
        assignedSeats,
        cohortBasedSeating,
      } = hasCourseInfo!

      event({
        type: 'LOAD_COURSE_DATA',
        payload: {
          courseId: course!,
          name,
          courseType,
          endsAt,
          halfDayEndsAt,
          halfDayStartsAt,
          schoolDayType,
          startsAt,
          cohortBasedSeating,
          courseMaxSize:
            assignedSeats.length === 12
              ? CourseMaxSizeEnum.TWELVE
              : assignedSeats.length === 24
              ? CourseMaxSizeEnum.TWENTY_FOUR
              : assignedSeats.length === 30
              ? CourseMaxSizeEnum.THIRTY
              : CourseMaxSizeEnum.THIRTY_SIX,
        },
      })
    },
    onError: (error) => console.error(error),
  })

  const [updateCourseInfo] = useMutation<
    updateCourseInfo,
    updateCourseInfoVariables
  >(UPDATE_COURSE_INFO_MUTATION, {
    variables: { input: state.context.updateCourseInfo },

    refetchQueries: [],
  })

  if (loading) return <div>Loading </div>
  return (
    <>
      <div>Edit Course</div>

      <div>
        Name:{' '}
        <span>
          <input
            value={state.context.updateCourseInfo.name}
            onChange={(e: any) =>
              event({ type: 'UPDATE_COURSE_NAME', payload: e.target.value })
            }
          />
          <>
            <div>Course's Max Size</div>
            <select
              onChange={(e: any) => {
                if (e.target.value !== 'none') {
                  event({
                    type: 'UPDATE_COURSE_SIZE',
                    payload: e.target.value,
                  })
                }
              }}
            >
              <option value={'none'}>Select a Class Size</option>
              {courseMaxSizeEnum.map((courseSize: CourseMaxSizeEnum) => (
                <option key={courseSize!} value={courseSize}>
                  {courseSize}
                </option>
              ))}
            </select>
          </>
        </span>
      </div>
    </>
  )
}
