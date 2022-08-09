import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  MarkingPeriodEnum,
  findStudentInfoByStudentId_findStudentById_student,
  createExcusedLatenessVariables,
  createExcusedLateness,
} from '../../../../../../schemaTypes'

import { AttendanceButton } from '../../styles/studentInfoStyles'
import {
  RemoveAbsenceType,
  RemoveLatenessType,
  UpdateResponsibilityPointsType,
} from './DailyAttendance'

export type ExcusedLatenessProps = {
  currentMarkingPeriod: MarkingPeriodEnum
  student: findStudentInfoByStudentId_findStudentById_student
  absent: boolean
  removeAbsence: RemoveAbsenceType
  todaysAbsenceId: string
  removeLateness: RemoveLatenessType
  unexcusedLatenessId: string
  updateResponsibilityPoints: UpdateResponsibilityPointsType
}

export const CREATE_EXCUSED_LATENESS_QUERY = gql`
  mutation createExcusedLateness($input: CreateExcusedLatenessInput!) {
    createExcusedLateness(input: $input) {
      excusedLateness {
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
  const [createExcusedLateness] = useMutation<
    createExcusedLateness,
    createExcusedLatenessVariables
  >(CREATE_EXCUSED_LATENESS_QUERY, {
    variables: {
      input: {
        studentId: student._id!,
        markingPeriod: currentMarkingPeriod,
        dayLateExcused: new Date().toLocaleDateString(),
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentInfoByStudentId'],
  })

  const excusedLatenessCheck = student.hasExcusedLatenesses.find(
    (late) => late.dayLateExcused === new Date().toLocaleDateString()
  )

  const todaysExcusedLateness = student.hasExcusedLatenesses.filter(
    (late) => late.dayLateExcused === new Date().toLocaleDateString()
  )
  const isUnexcused = student.hasUnExcusedLatenesses.some(
    (l) => l.dayLate === new Date().toLocaleDateString()
  )

  return (
    <>
      {!excusedLatenessCheck ? (
        <AttendanceButton
          lateButton={true}
          created={false}
          onClick={() => {
            if (absent) {
              removeAbsence({ variables: { input: { _id: todaysAbsenceId } } })
            }
            if (isUnexcused) {
              updateResponsibilityPoints({
                variables: {
                  input: {
                    studentId: student._id!,
                    markingPeriod: currentMarkingPeriod,
                    points: 10,
                  },
                },
              })
              removeAbsence({
                variables: { input: { _id: unexcusedLatenessId } },
              })
            }
            createExcusedLateness()
          }}
        >
          Create Excused Lateness
        </AttendanceButton>
      ) : (
        <AttendanceButton
          lateButton={true}
          created={true}
          onClick={() =>
            removeLateness({
              variables: { input: { _id: todaysExcusedLateness[0]._id! } },
            })
          }
        >
          Remove Excused Lateness
        </AttendanceButton>
      )}
    </>
  )
}
