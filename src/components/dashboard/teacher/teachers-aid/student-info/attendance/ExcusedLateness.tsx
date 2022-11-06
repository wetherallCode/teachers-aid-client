import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  MarkingPeriodEnum,
  LatenessTypeEnum,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student,
  createLateness,
  createLatenessVariables,
} from '../../../../../../schemaTypes'

import { AttendanceButton } from '../../styles/studentInfoStyles'
import {
  RemoveAbsenceType,
  RemoveLatenessType,
  UpdateResponsibilityPointsType,
} from './DailyAttendance'

export type ExcusedLatenessProps = {
  currentMarkingPeriod: MarkingPeriodEnum
  student: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student
  absent: boolean
  removeAbsence: RemoveAbsenceType
  todaysAbsenceId: string
  removeLateness: RemoveLatenessType
  unexcusedLatenessId: string
  updateResponsibilityPoints: UpdateResponsibilityPointsType
}

export const CREATE_LATENESS_QUERY = gql`
  mutation createLateness($input: CreateLatenessInput!) {
    createLateness(input: $input) {
      studentLateness {
        _id
      }
    }
  }
`

export const ExcusedLateness = ({
  currentMarkingPeriod,
  student,
  absent,
  removeAbsence,
  todaysAbsenceId,
  removeLateness,
  unexcusedLatenessId,
  updateResponsibilityPoints,
}: ExcusedLatenessProps) => {
  const [createLateness] = useMutation<createLateness, createLatenessVariables>(
    CREATE_LATENESS_QUERY,
    {
      variables: {
        input: {
          studentId: student._id!,
          markingPeriod: currentMarkingPeriod,
          dayLate: new Date().toLocaleDateString(),
          latenessType: LatenessTypeEnum.EXCUSED,
        },
      },
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findStudentByIdForTeachersAid'],
    }
  )

  const excusedLatenessCheck = student.hasLatnesses.find(
    (late) =>
      late.latenessType === LatenessTypeEnum.EXCUSED &&
      late.dayLate === new Date().toLocaleDateString()
  )

  const todaysExcusedLateness = student.hasLatnesses.find(
    (late) =>
      late.latenessType === LatenessTypeEnum.EXCUSED &&
      late.dayLate === new Date().toLocaleDateString()
  )!

  const isUnexcused = student.hasUnExcusedLatenesses.find(
    (late) =>
      late.latenessType === LatenessTypeEnum.UNEXCUSED &&
      late.dayLate === new Date().toLocaleDateString()
  )!

  return (
    <>
      {!excusedLatenessCheck ? (
        <AttendanceButton
          lateButton={true}
          created={excusedLatenessCheck !== undefined}
          onClick={() => {
            if (absent) {
              removeAbsence({ variables: { input: { _id: todaysAbsenceId } } })
            }
            if (isUnexcused) {
              removeLateness({
                variables: { input: { _id: isUnexcused._id! } },
              })
            }
            // updateResponsibilityPoints({
            //     variables: {
            //       input: {
            //         studentId: student._id!,
            //         markingPeriod: currentMarkingPeriod,
            //         points: 10,
            //       },
            //     },
            //   })
            //   removeAbsence({
            //     variables: { input: { _id: unexcusedLatenessId } },
            //   })
            // }
            createLateness()
          }}
        >
          Create Excused Lateness
        </AttendanceButton>
      ) : (
        <AttendanceButton
          lateButton={true}
          created={excusedLatenessCheck !== undefined}
          onClick={() =>
            removeLateness({
              variables: { input: { _id: todaysExcusedLateness._id! } },
            })
          }
        >
          Remove Excused Lateness
        </AttendanceButton>
      )}
    </>
  )
}
