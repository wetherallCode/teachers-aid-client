import { listenerCount } from 'process'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { findStudentsByCourseForSecondaryGradeFinder_findStudentsByCourse_students } from '../../../../../../../schemaTypes'
import { replaceAt } from '../../../../../../../utils'
import { AssignmentTypeProps } from './SecondaryGrades'

export type SecondaryGradeRowInfoProps = {
  student: findStudentsByCourseForSecondaryGradeFinder_findStudentsByCourse_students
  secondaryGradeScore: number
  setAssignmentList: Dispatch<SetStateAction<AssignmentTypeProps[]>>
  createCSVToggle: boolean
  assignmentList: AssignmentTypeProps[]
  classSize: number
}

export const SecondaryGradeRowInfo = ({
  student,
  secondaryGradeScore,
  setAssignmentList,
  createCSVToggle,
  assignmentList,
  classSize,
}: SecondaryGradeRowInfoProps) => {
  const [assignmentValues, setAssignmentValues] = useState({
    NAME: student.lastName + ', ' + student.firstName,
    STUDENTID: student.schoolId,
    GRADE: isNaN(secondaryGradeScore) ? '' : secondaryGradeScore,
    ABSENT: '',
    EXEMPT: secondaryGradeScore === 0 ? '' : secondaryGradeScore ? '' : 'Y',
    INCOMPLETE: '',
    MISSING: '',
  })

  useEffect(() => {
    // setAssignmentValues({
    //   NAME: student.lastName + ', ' + student.firstName,
    //   STUDENTID: student.schoolId,
    //   GRADE: isNaN(secondaryGradeScore) ? '' : secondaryGradeScore,
    //   ABSENT: '',
    //   EXEMPT: secondaryGradeScore === 0 ? '' : secondaryGradeScore ? '' : 'Y',
    //   INCOMPLETE: '',
    //   MISSING: '',
    // })
    if (student.schoolId !== null) {
      // const studentToFindIndex = assignmentList.findIndex(
      //   (assignment) => assignment.STUDENTID === student.schoolId
      // )
      // console.log(studentToFindIndex, student.firstName)
      // if (studentToFindIndex > -1) {
      // Object.assign([], setAssignmentList, {
      //   [studentToFindIndex]: {
      //     NAME: student.lastName + ', ' + student.firstName,
      //     STUDENTID: student.schoolId,
      //     GRADE: isNaN(secondaryGradeScore) ? '' : secondaryGradeScore,
      //     ABSENT: '',
      //     EXEMPT:
      //       secondaryGradeScore === 0 ? '' : secondaryGradeScore ? '' : 'Y',
      //     INCOMPLETE: '',
      //     MISSING: '',
      //   },
      // })
      // replaceAt(assignmentList, studentToFindIndex, {
      //   NAME: student.lastName + ', ' + student.firstName,
      //   STUDENTID: student.schoolId,
      //   GRADE: isNaN(secondaryGradeScore) ? '' : secondaryGradeScore,
      //   ABSENT: '',
      //   EXEMPT:
      //     secondaryGradeScore === 0 ? '' : secondaryGradeScore ? '' : 'Y',
      //   INCOMPLETE: '',
      //   MISSING: '',
      // // })
      // setAssignmentList((list) => [
      //   ...list.slice(0, studentToFindIndex),
      //   ...list.slice(studentToFindIndex + 1),
      // ])
      // setAssignmentList([
      //   ...assignmentList,
      //   {
      //     NAME: student.lastName + ', ' + student.firstName,
      //     STUDENTID: student.schoolId,
      //     GRADE: isNaN(secondaryGradeScore) ? '' : secondaryGradeScore,
      //     ABSENT: '',
      //     EXEMPT:
      //       secondaryGradeScore === 0 ? '' : secondaryGradeScore ? '' : 'Y',
      //     INCOMPLETE: '',
      //     MISSING: '',
      //   },
      // ])
      // } else
      setAssignmentList((list) => [
        ...list,
        {
          NAME: student.lastName + ', ' + student.firstName,
          STUDENTID: student.schoolId,
          GRADE: isNaN(secondaryGradeScore) ? '' : secondaryGradeScore,
          ABSENT: '',
          EXEMPT:
            secondaryGradeScore === 0 ? '' : secondaryGradeScore ? '' : 'Y',
          INCOMPLETE: '',
          MISSING: '',
        },
      ])
    }
  }, [secondaryGradeScore])

  return (
    <>
      <div>
        {student.lastName}, {student.firstName}:{' '}
        {isNaN(secondaryGradeScore) ? 'No Grade Yet' : secondaryGradeScore}
      </div>
    </>
  )
}
