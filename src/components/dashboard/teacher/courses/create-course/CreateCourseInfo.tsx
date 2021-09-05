import React, { useState } from 'react'

import { useCreateCourseContextProvider } from './state/CreateCourseContext'
import { gql, useMutation } from '@apollo/client'
import {
  createCourseInfoVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createCourseInfo,
  SchoolDayType,
  CourseTypeEnum,
  addCourseToTeacher,
  addCourseToTeacherVariables,
  CourseMaxSizeEnum,
  me_me_Teacher,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCourse,
  removeCourseVariables,
} from '../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useUserContextProvider } from '../../../../../contexts/UserContext'

import {
  CourseInformationColumnContainer,
  CourseInformationContainer,
  CourseTitleButton,
  CourseTitleButtonContainer,
  CreateCourseContainerTitleContainer,
  CreateCourseInfoBodyContainer,
  TimeSelectionContainer,
  TimeSelectionInput,
} from './state/createCourseStyles'
import {
  phraseCapitalizer,
  timeChanger,
  underscoreEliminator,
} from '../../../../../utils'

export type CreateCourseInfoProps = {}

export const CREATE_COURSE_INFO_MUTATION = gql`
  mutation createCourseInfo($input: CreateCourseInfoInput!) {
    createCourseInfo(input: $input) {
      courseInfo {
        _id
      }
    }
  }
`
export const ADD_COURSE_TO_TEACHER_MUTATION = gql`
  mutation addCourseToTeacher($input: AddCourseToTeacherInput!) {
    addCourseToTeacher(input: $input) {
      teacher {
        _id
      }
    }
  }
`
export const REMOVE_COURSE_MUTATION = gql`
  mutation removeCourse($input: RemoveCourseInput!) {
    removeCourse(input: $input) {
      removed
    }
  }
`

export const CreateCourseInfo = ({}: CreateCourseInfoProps) => {
  const [state, event] = useCreateCourseContextProvider()
  const me: me_me_Teacher = useUserContextProvider()
  const [isToggled, setIsToggled] = useState(false)
  console.log(isToggled)
  const { courseMaxSizeEnum, courseTypeEnum, schoolDayType } =
    useEnumContextProvider()

  const [addToTeachersRoster] = useMutation<
    addCourseToTeacher,
    addCourseToTeacherVariables
  >(ADD_COURSE_TO_TEACHER_MUTATION, {
    variables: {
      input: {
        courseId: state.context.courseInfo.courseId,
        teacherId: me._id!,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['me'],
  })

  const [createCourseInfo] = useMutation<
    createCourseInfo,
    createCourseInfoVariables
  >(CREATE_COURSE_INFO_MUTATION, {
    variables: { input: state.context.courseInfo },
    onCompleted: () => addToTeachersRoster(),
    refetchQueries: [],
  })

  const [removeCourse] = useMutation<removeCourse, removeCourseVariables>(
    REMOVE_COURSE_MUTATION,
    {
      variables: { input: { courseId: state.context.courseInfo.courseId } },
      onCompleted: (data) => console.log(data),
      refetchQueries: [],
    }
  )
  const handleCreate = () => {
    createCourseInfo()
    event({ type: 'NEXT_STEP' })
  }
  return (
    <CreateCourseInfoBodyContainer>
      <CreateCourseContainerTitleContainer>
        Complete Course Details
      </CreateCourseContainerTitleContainer>
      <CourseInformationContainer>
        <CourseInformationColumnContainer>
          <TimeSelectionContainer>
            <div>Add Starting Time</div>

            <TimeSelectionInput
              type='time'
              onChange={(e: any) => {
                event({
                  type: 'ADD_STARTING_TIME',
                  payload: timeChanger(e.target.value),
                })
              }}
            />
          </TimeSelectionContainer>
          <TimeSelectionContainer>
            <div>Add Ending Time</div>
            <TimeSelectionInput
              type='time'
              onChange={(e: any) => {
                event({
                  type: 'ADD_ENDING_TIME',
                  payload: timeChanger(e.target.value),
                })
              }}
            />
          </TimeSelectionContainer>
          <TimeSelectionContainer>
            <div>Add Half-Day Starting Time</div>
            <TimeSelectionInput
              type='time'
              onChange={(e: any) => {
                event({
                  type: 'ADD_STARTING_HALFDAY_TIME',
                  payload: timeChanger(e.target.value),
                })
              }}
            />
          </TimeSelectionContainer>
          <TimeSelectionContainer>
            <div>Add Half-Day Ending Time</div>
            <TimeSelectionInput
              type='time'
              onChange={(e: any) => {
                event({
                  type: 'ADD_ENDING_HALFDAY_TIME',
                  payload: timeChanger(e.target.value),
                })
              }}
            />
          </TimeSelectionContainer>
        </CourseInformationColumnContainer>
        <CourseInformationColumnContainer>
          <TimeSelectionContainer>
            <div>AB Day Selection</div>
            <select
              value={state.context.courseInfo.schoolDayType}
              onChange={(e: any) => {
                if (e.target.value !== 'none') {
                  event({
                    type: 'ADD_SCHOOL_DAY_TYPE',
                    payload: e.target.value,
                  })
                }
              }}
            >
              <option value={'none'}>Select a Day Type</option>
              {schoolDayType.map((dayType: SchoolDayType) => (
                <option key={dayType!} value={dayType}>
                  {dayType}
                </option>
              ))}
            </select>
          </TimeSelectionContainer>
          <TimeSelectionContainer>
            <div>What type of Course is it?</div>
            <select
              value={state.context.courseInfo.courseType}
              onChange={(e: any) => {
                if (e.target.value !== 'none') {
                  event({ type: 'ADD_COURSE_TYPE', payload: e.target.value })
                }
              }}
            >
              <option value={'none'}>Select a Course Type</option>
              {courseTypeEnum.map((courseType: CourseTypeEnum) => (
                <option key={courseType!} value={courseType}>
                  {phraseCapitalizer(underscoreEliminator(courseType))}
                </option>
              ))}
            </select>
          </TimeSelectionContainer>
          <TimeSelectionContainer>
            <div>Is there Cohort Seating?</div>
            <div>
              <button
                onClick={() => event({ type: 'COHORT_BASED', payload: false })}
                style={
                  state.context.courseInfo.cohortBasedSeating
                    ? { backgroundColor: 'var(--blue)', color: 'var(--white)' }
                    : { backgroundColor: 'var(--red)', color: 'var(--white)' }
                }
              >
                No
              </button>
              <button
                onClick={() => event({ type: 'COHORT_BASED', payload: true })}
                style={
                  state.context.courseInfo.cohortBasedSeating
                    ? { backgroundColor: 'var(--red)', color: 'var(--white)' }
                    : { backgroundColor: 'var(--blue)', color: 'var(--white)' }
                }
              >
                Yes
              </button>
            </div>
          </TimeSelectionContainer>
          <TimeSelectionContainer>
            <div>Course's Max Size</div>
            <select
              value={state.context.courseInfo.courseMaxSize}
              onChange={(e: any) => {
                if (e.target.value !== 'none') {
                  event({
                    type: 'ADD_COURSE_MAX_SIZE',
                    payload: e.target.value,
                  })
                }
              }}
            >
              <option value={'none'}>Select a Class Size</option>
              {courseMaxSizeEnum.map((courseSize: CourseMaxSizeEnum) => (
                <option key={courseSize!} value={courseSize}>
                  {phraseCapitalizer(underscoreEliminator(courseSize))}
                </option>
              ))}
            </select>
          </TimeSelectionContainer>
        </CourseInformationColumnContainer>
      </CourseInformationContainer>
      <CourseTitleButtonContainer>
        <CourseTitleButton
          onClick={() => {
            removeCourse()
            event({ type: 'ADD_ANOTHER_COURSE' })
          }}
        >
          Remove Course
        </CourseTitleButton>
        <CourseTitleButton onClick={handleCreate}>
          Create Course
        </CourseTitleButton>
      </CourseTitleButtonContainer>
    </CreateCourseInfoBodyContainer>
  )
}
