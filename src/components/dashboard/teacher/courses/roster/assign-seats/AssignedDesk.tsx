import { MutationFunctionOptions } from '@apollo/client'
import React from 'react'
import {
  assignRegularSeats,
  assignRegularSeatsVariables,
  findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats,
  findCourseByIdForStudentRegistration_findCourseById_course_hasStudents,
} from '../../../../../../schemaTypes'
import {
  AssignedDeskNumber,
  AssignedSeat,
  DeleteSelector,
  NameContainer,
  StudentSelector,
  UnassignedDeskNumber,
  UnassignedSeat,
} from './state/assignedSeatStyles'

export type AssignedDeskProps = {
  course: string
  desk: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats
  assignSeats: (
    options?:
      | MutationFunctionOptions<assignRegularSeats, assignRegularSeatsVariables>
      | undefined
  ) => void
  studentsInCourse: findCourseByIdForStudentRegistration_findCourseById_course_hasStudents[]
  assignedSeats: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats[]
}

export const AssignedDesk = ({
  desk,
  assignSeats,
  studentsInCourse,
  assignedSeats,
  course,
}: AssignedDeskProps) => {
  const unAssignSeat = (deskNumber: number) =>
    assignSeats({
      variables: {
        input: {
          cohortBasedSeating: false,
          courseId: course,
          seat: {
            studentId: null,
            deskNumber: deskNumber,
          },
        },
      },
    })

  const assign = (deskNumber: number, studentId: string) =>
    assignSeats({
      variables: {
        input: {
          cohortBasedSeating: false,
          courseId: course,
          seat: {
            studentId,
            deskNumber,
          },
        },
      },
    })
  return (
    <>
      {desk.student ? (
        <AssignedSeat>
          <AssignedDeskNumber>{desk.deskNumber}</AssignedDeskNumber>
          <NameContainer>
            <div>{desk.student?.firstName}</div>
            <div> {desk.student.lastName}</div>
          </NameContainer>
          <DeleteSelector>
            {desk.student && (
              <div onClick={() => unAssignSeat(desk.deskNumber)}>Delete</div>
            )}
          </DeleteSelector>
        </AssignedSeat>
      ) : (
        <UnassignedSeat>
          <UnassignedDeskNumber>{desk.deskNumber}</UnassignedDeskNumber>
          <StudentSelector
            onChange={(e: any) => {
              if (e.target.value !== 'none') {
                assign(desk.deskNumber, e.target.value)
              }
            }}
          >
            <option value={'none'}>Select</option>
            {studentsInCourse
              .filter((student) => {
                return !assignedSeats
                  .map((assignedStudent) => assignedStudent.student?._id)
                  .includes(student._id)
              })
              .map((student) => (
                <option key={student._id!} value={student._id!}>
                  {student.lastName}, {student.firstName}
                </option>
              ))}
          </StudentSelector>
        </UnassignedSeat>
      )}
    </>
  )
}
