import React, { FC, useState, useEffect } from 'react'

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
import { TimeSelector } from '../../../../home/TimeSelector'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { Modal } from '../../../../../animations'
import { NextStepsModal } from './NextStepsModal'

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

export const CreateCourseInfo: FC<CreateCourseInfoProps> = () => {
  const [state, event] = useCreateCourseContextProvider()
  const me: me_me_Teacher = useUserContextProvider()
  const [isToggled, setIsToggled] = useState(false)

  const {
    courseMaxSizeEnum,
    courseTypeEnum,
    schoolDayType,
  } = useEnumContextProvider()
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

  return (
    <>
      <div>{state.context.courseTitle.name}</div>
      <button
        onClick={() => {
          removeCourse()
          event({ type: 'ADD_ANOTHER_COURSE' })
        }}
      >
        Remove Course
      </button>
      <div>Complete Course Details</div>
      <div>Add Starting Time</div>

      <input
        onChange={(e: any) => {
          event({ type: 'ADD_STARTING_TIME', payload: e.target.value })
        }}
      />
      <div>Add Ending Time</div>
      <input
        onChange={(e: any) => {
          event({ type: 'ADD_ENDING_TIME', payload: e.target.value })
        }}
      />
      <div>Add Half-Day Starting Time</div>
      <input
        onChange={(e: any) => {
          event({ type: 'ADD_STARTING_HALFDAY_TIME', payload: e.target.value })
        }}
      />
      <div>Add Half-Day Ending Time</div>
      <input
        onChange={(e: any) => {
          event({ type: 'ADD_ENDING_HALFDAY_TIME', payload: e.target.value })
        }}
      />
      <div>A Day or B Day</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            event({ type: 'ADD_SCHOOL_DAY_TYPE', payload: e.target.value })
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
      <div>What type of Course is it?</div>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            event({ type: 'ADD_COURSE_TYPE', payload: e.target.value })
          }
        }}
      >
        <option value={'none'}>Select a Course Type</option>
        {courseTypeEnum.map((courseType: CourseTypeEnum) => (
          <option key={courseType!} value={courseType}>
            {courseType}
          </option>
        ))}
      </select>
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

      {/* {!state.context.courseInfo.cohortBasedSeating && ( */}
      <>
        <div>Course's Max Size</div>
        <select
          onChange={(e: any) => {
            if (e.target.value !== 'none') {
              event({ type: 'ADD_COURSE_MAX_SIZE', payload: e.target.value })
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
      {/* )} */}
      <button
        onClick={() => {
          createCourseInfo()
          setIsToggled(true)
        }}
      >
        Create Course
      </button>
      <Modal isToggled={isToggled} setIsToggled={setIsToggled}>
        <NextStepsModal setIsToggled={setIsToggled} />
      </Modal>
    </>
  )
}
