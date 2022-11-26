import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useToggle } from '../../../../../hooks'
import {
  me_me_Teacher,
  switchToNewCourseVariables,
  switchToNewCourse,
  me_me_Teacher_teachesCourses,
  findAllStudentsForStudentInformation_findAllStudents_students,
  me_me_Teacher_teachesCourses_hasCourseInfo,
} from '../../../../../schemaTypes'
import { useStudentInformationContextProvider } from '../state-n-styles/StudentInformationContext'

export type SwitchCourseProps = {
  student: findAllStudentsForStudentInformation_findAllStudents_students
}

export const SWITCH_TO_NEW_COURSE_MUTATION = gql`
  mutation switchToNewCourse($input: SwitchToNewCourseInput!) {
    switchToNewCourse(input: $input) {
      student {
        _id
        firstName
        lastName
        userName
        inCourses {
          name
          _id
        }
      }
    }
  }
`

export const SwitchCourse = ({ student }: SwitchCourseProps) => {
  const me: me_me_Teacher = useUserContextProvider()
  const [state, event] = useStudentInformationContextProvider()
  const [confirmChangeToggle, toggleConfirm] = useToggle(false)
  const [courseToChangeTo, setCourseToChangeTo] = useState<string>('none')

  const [switchToNewCourse] = useMutation<
    switchToNewCourse,
    switchToNewCourseVariables
  >(SWITCH_TO_NEW_COURSE_MUTATION, {
    variables: {
      input: {
        newCourseId: courseToChangeTo!,
        studentId: student._id!,
        oldCourseId: student.inCourses[0]._id!,
      },
    },
    onCompleted: (data) => {
      event({ type: 'UPDATE_STUDENT', payload: data.switchToNewCourse.student })
      toggleConfirm()
    },
    refetchQueries: ['findAllStudentsForStudentInformation'],
  })
  const handleChange = (e: any) => {
    setCourseToChangeTo(e.target.value)
    toggleConfirm()
  }
  console.log(state.context.student)
  return (
    <>
      <div>Switch Course</div>
      {!confirmChangeToggle ? (
        <select onChange={(e: any) => handleChange(e)}>
          <option value={'none'}>Select Course</option>
          {me.teachesCourses.map((course) => (
            <option key={course._id} value={course._id!}>
              {course.name}
            </option>
          ))}
        </select>
      ) : (
        <div>
          <button onClick={() => switchToNewCourse()}>Change</button>
          <button onClick={() => toggleConfirm()}>Cancel</button>
        </div>
      )}
    </>
  )
}
