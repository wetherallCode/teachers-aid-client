import { gql, useQuery } from '@apollo/client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  findAssignmentByStudentIdForSecondary,
  findAssignmentByStudentIdForSecondaryVariables,
  findAssignmentByStudentIdForSecondary_findAssignmentByStudentId_assignments,
  findStudentsByCourseForSecondaryGradeFinder_findStudentsByCourse_students,
  MarkingPeriodEnum,
} from '../../../../../../../schemaTypes'
import { SecondaryGradeRowInfo } from './SecondaryGradeRowInfo'
import { AssignmentTypeProps } from './SecondaryGrades'

export type SecondaryGradeRowsProps = {
  student: findStudentsByCourseForSecondaryGradeFinder_findStudentsByCourse_students
  markingPeriodSelect: MarkingPeriodEnum | ''
  setAssignmentList: Dispatch<SetStateAction<AssignmentTypeProps[]>>
  assignmentList: AssignmentTypeProps[]
  createCSVToggle: boolean
  classSize: number
}

export const FIND_ASSIGNMENTS_FOR_SECONDARY_QUERY = gql`
  query findAssignmentByStudentIdForSecondary(
    $input: FindAssignmentByStudentIdInput!
  ) {
    findAssignmentByStudentId(input: $input) {
      assignments {
        _id
        assigned
        missing
        score {
          earnedPoints
          maxPoints
        }
        gradeType
        dueDate
        dueTime
        exempt
        markingPeriod
      }
    }
  }
`

export const SecondaryGradeRows = ({
  student,
  markingPeriodSelect,
  setAssignmentList,
  assignmentList,
  createCSVToggle,
  classSize,
}: SecondaryGradeRowsProps) => {
  const { loading, data } = useQuery<
    findAssignmentByStudentIdForSecondary,
    findAssignmentByStudentIdForSecondaryVariables
  >(FIND_ASSIGNMENTS_FOR_SECONDARY_QUERY, {
    variables: {
      input: { studentId: student._id! },
    },
    onCompleted: (data) => console.log(),
    onError: (error) => console.error(error),
  })
  const secondaryGrades = data?.findAssignmentByStudentId.assignments
    .filter((a) => a.gradeType === 'SECONDARY')
    // .filter((a) => a.__typename !== 'TextAnalysis')
    .filter(
      (grade) =>
        Date.parse(new Date().toLocaleString()) >
        Date.parse(grade.dueDate + ', ' + grade.dueTime),
    )
    .filter((a) => !a.exempt)
    .filter((a) => a.markingPeriod === markingPeriodSelect)!

  const totalMaxPoints = secondaryGrades?.reduce(
    (
      arr: number,
      i: findAssignmentByStudentIdForSecondary_findAssignmentByStudentId_assignments,
    ) => i.score.maxPoints + arr,
    0,
  )
  const totalEarnedPoints = secondaryGrades?.reduce(
    (
      arr: number,
      i: findAssignmentByStudentIdForSecondary_findAssignmentByStudentId_assignments,
    ) => i.score.earnedPoints + arr,
    0,
  )
  const secondaryGradeScore = (totalEarnedPoints / totalMaxPoints) * 100

  if (loading) return <div>Loading </div>

  return (
    <SecondaryGradeRowInfo
      student={student}
      classSize={classSize}
      secondaryGradeScore={secondaryGradeScore}
      setAssignmentList={setAssignmentList}
      createCSVToggle={createCSVToggle}
      assignmentList={assignmentList}
    />
  )
}
