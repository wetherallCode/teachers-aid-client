import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  MarkingPeriodEnum,
  createLateness,
  LatenessTypeEnum,
  findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student,
  createLatenessVariables,
} from '../../../../../../schemaTypes'
import { AttendanceButton } from '../../styles/studentInfoStyles'
import {
  RemoveAbsenceType,
  RemoveLatenessType,
  UpdateResponsibilityPointsType,
} from './DailyAttendance'
import { CREATE_LATENESS_QUERY } from './ExcusedLateness'

export type UnexcusedLatnessProps = {
  currentMarkingPeriod: MarkingPeriodEnum
  student: findStudentByIdForTeachersAid_findStudentByIdForTeachersAid_student
  absent?: boolean
  removeAbsence: RemoveAbsenceType
  todaysAbsenceId: string
  removeLateness: RemoveLatenessType
  excusedLatenessId: string
  updateResponsibilityPoints: UpdateResponsibilityPointsType
}

export const CREATE_UNEXCUSED_LATENESS_QUERY = gql`
  mutation createUnexcusedLateness($input: CreateUnexcusedLatenessInput!) {
    createUnexcusedLateness(input: $input) {
      unexcusedLateness {
        _id
      }
    }
  }
`

export const UnexcusedLatness = ({
  currentMarkingPeriod,
  student,
  absent,
  removeAbsence,
  removeLateness,
  todaysAbsenceId,
  excusedLatenessId,
  updateResponsibilityPoints,
}: UnexcusedLatnessProps) => {
  const [createLateness] = useMutation<createLateness, createLatenessVariables>(
    CREATE_LATENESS_QUERY,
    {
      variables: {
        input: {
          studentId: student._id!,
          markingPeriod: currentMarkingPeriod,
          dayLate: new Date().toLocaleDateString(),
          latenessType: LatenessTypeEnum.UNEXCUSED,
        },
      },
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findStudentByIdForTeachersAid'],
    }
  )
  const unexcusedLatenessCheck = student.hasLatnesses.find(
    (late) => late.latenessType === LatenessTypeEnum.UNEXCUSED
  )

  const isExcused = student.hasLatnesses.find(
    (late) => late.latenessType === LatenessTypeEnum.EXCUSED
  )!
  console.log(unexcusedLatenessCheck === undefined)
  return (
    <>
      {!unexcusedLatenessCheck ? (
        <AttendanceButton
          lateButton={true}
          created={unexcusedLatenessCheck !== undefined}
          onClick={() => {
            if (absent) {
              removeAbsence({ variables: { input: { _id: todaysAbsenceId } } })
            }
            if (isExcused) {
              removeLateness({
                variables: { input: { _id: isExcused._id! } },
              })
            }
            createLateness()
            // updateResponsibilityPoints({
            //   variables: {
            //     input: {
            //       studentId: student._id!,
            //       markingPeriod: currentMarkingPeriod,
            //       points: -10,
            //     },
            //   },
            // })
          }}
        >
          Create Unexcused Lateness
        </AttendanceButton>
      ) : (
        <AttendanceButton
          lateButton={true}
          created={unexcusedLatenessCheck !== undefined}
          onClick={() => {
            removeLateness({
              variables: { input: { _id: unexcusedLatenessCheck._id! } },
            })
          }}
        >
          Remove Unexecused Lateness
        </AttendanceButton>
      )}
    </>
  )
}
