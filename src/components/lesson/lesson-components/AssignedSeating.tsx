import React from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo_assignedSeats,
  me_me_Teacher_teachesCourses,
} from '../../../schemaTypes'
import {
  AssignedSeatsContainer,
  AssignedSeatsStudentListContainer,
  AssignedSeatsStudentListItem,
  AssignedSeatsStudentListItemHeaders,
  AssignedSeatsTitleContainer,
} from '../state-n-styles/lessonStyles'

export type AssignedSeatingProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
}

export const AssignedSeating = ({ lesson }: AssignedSeatingProps) => {
  const assignedSeats =
    lesson.assignedCourses[0].hasCourseInfo?.assignedSeats.map((seat) => seat)
  const sortAssignedSeats = (
    a: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo_assignedSeats,
    b: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_assignedCourses_hasCourseInfo_assignedSeats,
  ) => {
    let aName = a.student?.lastName.toUpperCase()!
    let bName = b.student?.lastName.toUpperCase()!
    if (aName < bName) {
      return -1
    }
    if (aName > bName) {
      return 1
    }

    return 0
  }
  return (
    <AssignedSeatsContainer>
      <AssignedSeatsTitleContainer>Assigned Seats</AssignedSeatsTitleContainer>
      <AssignedSeatsStudentListContainer>
        <AssignedSeatsStudentListItemHeaders>
          <div>Student Name</div>
          <div>Seat Number</div>
        </AssignedSeatsStudentListItemHeaders>
        <div style={{ height: '73.5vh', overflow: 'scroll' }}>
          {assignedSeats!
            .filter((seat) => seat.student)
            .sort(sortAssignedSeats)
            .map((seat, i) => (
              <AssignedSeatsStudentListItem
                key={seat.deskNumber}
                indexNumber={i}
              >
                <div>
                  {seat.student?.lastName}, {seat.student?.firstName}
                </div>
                <div>{seat.deskNumber}</div>
              </AssignedSeatsStudentListItem>
            ))}
        </div>
      </AssignedSeatsStudentListContainer>
    </AssignedSeatsContainer>
  )
}
