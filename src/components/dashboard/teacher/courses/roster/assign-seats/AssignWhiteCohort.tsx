import React, { FC, Fragment } from 'react'
import {
  findCourseByIdForStudentRegistration_findCourseById_course,
  StudentCohortEnum,
  assignCohortBasedSeats,
  assignCohortBasedSeatsVariables,
  findCourseByIdForStudentRegistration_findCourseById_course_hasStudents,
} from '../../../../../../schemaTypes'
import { MutationFunctionOptions } from '@apollo/client'
import {
  AssignSeatType,
  RemoveAssignedSeatType,
} from './AssignCohortBasedSeating'

export type AssignWhiteCohortProps = {
  course: findCourseByIdForStudentRegistration_findCourseById_course
  assignSeats: AssignSeatType
  removeAssignedSeat: RemoveAssignedSeatType
}

export const AssignWhiteCohort: FC<AssignWhiteCohortProps> = ({
  course,
  assignSeats,
  removeAssignedSeat,
}) => {
  const assignedSeats = course.hasCourseInfo?.assignedSeats.filter(
    (seat) => seat.whiteCohortStudent?._id
  )
  console.log(assignedSeats)

  const assign = (deskNumber: number, studentId: string) =>
    assignSeats({
      variables: {
        input: {
          cohortBasedSeating: true,
          courseId: course._id!,
          seat: {
            whiteCohortStudentId: studentId,
            deskNumber,
          },
        },
      },
    })

  const unAssignSeat = (deskNumber: number) =>
    removeAssignedSeat({
      variables: {
        input: {
          // cohortBasedSeating: true,
          cohortBased: true,
          courseId: course._id!,
          // seat: {
          //   whiteCohortStudentId: null,
          //   deskNumber,
          // },
          deskNumber,
          cohortType: StudentCohortEnum.WHITE,
        },
      },
    })

  const deskNumber = (
    student: findCourseByIdForStudentRegistration_findCourseById_course_hasStudents
  ) => {
    const [deskNumber] = course.hasCourseInfo?.assignedSeats
      .filter(
        (seat) =>
          seat.whiteCohortStudent?._id === student._id &&
          seat.whiteCohortStudent?._id
      )
      .map((seat) => seat.deskNumber)
    return deskNumber
  }

  return (
    <>
      <div>Assign Red Cohort Seats</div>
      {course.hasStudents
        .filter((student) => student.cohort === StudentCohortEnum.WHITE)
        .map((student) => {
          return (
            <div key={student._id!}>
              <span
                style={
                  assignedSeats
                    ?.map((seat) => seat.whiteCohortStudent?._id)
                    .includes(student._id)
                    ? { color: 'var(--blue)' }
                    : { color: 'var(--grey)' }
                }
                onClick={() => {
                  if (deskNumber(student)) {
                    unAssignSeat(deskNumber(student))
                  }
                }}
              >
                {student.lastName}, {student.firstName} {deskNumber(student)}
              </span>
            </div>
          )
        })}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
        }}
      >
        {course.hasCourseInfo?.assignedSeats.map((desk) => (
          <Fragment key={desk.deskNumber}>
            {desk.whiteCohortStudent ? (
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  border: '1px solid var(--blue)',
                }}
              >
                {desk.deskNumber}
                {desk.whiteCohortStudent?.firstName}
                {desk.whiteCohortStudent && (
                  <div onClick={() => unAssignSeat(desk.deskNumber)}>
                    Delete
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  border: '1px solid var(--blue)',
                }}
              >
                {desk.deskNumber}
                <select
                  style={{ width: '60%' }}
                  onChange={(e: any) => {
                    if (e.target.value !== 'none') {
                      assign(desk.deskNumber, e.target.value)
                    }
                  }}
                >
                  <option value={'none'}>Select</option>
                  {course.hasStudents
                    .filter((student) => {
                      return (
                        !course.hasCourseInfo?.assignedSeats
                          .map((assignedStudent) => {
                            return assignedStudent.whiteCohortStudent?._id
                          })
                          .includes(student._id) &&
                        student.cohort === StudentCohortEnum.WHITE
                      )
                    })
                    .map((student) => (
                      <option key={student._id!} value={student._id!}>
                        {student.lastName}, {student.firstName}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  )
}
