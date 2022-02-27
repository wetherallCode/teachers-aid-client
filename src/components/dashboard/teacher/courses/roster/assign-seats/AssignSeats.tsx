import React, { FC } from 'react'
import { useQuery } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findCourseByIdForStudentRegistration,
  findCourseByIdForStudentRegistrationVariables,
} from '../../../../../../schemaTypes'
import { useParams } from 'react-router'
import { FIND_COURSE_BY_ID_QUERY } from '../add-students/AddStudents'
import { RegularSeating } from './RegularSeating'
import { AssignCohortBasedSeating } from './AssignCohortBasedSeating'

export type AssignSeatsProps = {}

export const AssignSeats = ({}: AssignSeatsProps) => {
  const { course } = useParams()

  const { loading, data } = useQuery<
    findCourseByIdForStudentRegistration,
    findCourseByIdForStudentRegistrationVariables
  >(FIND_COURSE_BY_ID_QUERY, {
    variables: {
      input: { courseId: course! },
    },
    onCompleted: (data) => {
      console.log(data.findCourseById.course)
    },
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>

  // const assignedSeats = data?.findCourseById.course.hasCourseInfo?.assignedSeats.filter(
  //   (seat) => seat.student
  // )
  // console.log(data?.findCourseById.course.hasCourseInfo?.cohortBasedSeating)
  // const unAssignSeat = (deskNumber: number) =>
  //   assignSeats({
  //     variables: {
  //       input: {
  //         cohortBasedSeating: false,
  //         courseId: course,
  //         seat: {
  //           studentId: null,
  //           deskNumber: deskNumber,
  //         },
  //       },
  //     },
  //   })

  // const assign = (deskNumber: number, studentId: string) =>
  //   assignSeats({
  //     variables: {
  //       input: {
  //         cohortBasedSeating: false,
  //         courseId: course,
  //         seat: {
  //           studentId,
  //           deskNumber,
  //         },
  //       },
  //     },
  //   })

  // const deskNumber = (
  //   student: findCourseByIdForStudentRegistration_findCourseById_course_hasStudents
  // ) => {
  //   const [
  //     deskNumber,
  //   ] = data?.findCourseById.course.hasCourseInfo?.assignedSeats
  //     .filter((seat) => seat.student?._id === student._id)
  //     .map((seat) => seat.deskNumber)
  //   return deskNumber
  // }

  return (
    <div>
      {data?.findCourseById.course.hasCourseInfo?.cohortBasedSeating ? (
        <AssignCohortBasedSeating course={data.findCourseById.course} />
      ) : (
        <RegularSeating />
      )}
    </div>
  )
}
