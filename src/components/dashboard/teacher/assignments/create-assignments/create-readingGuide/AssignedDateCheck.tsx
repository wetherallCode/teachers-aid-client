import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import {
  findLessonsByCourse,
  findLessonsByCourseVariables,
  findLessonsByCourse_findLessonByCourse_lessons,
} from '../../../../../../schemaTypes'
import { FIND_LESSONS_BY_COURSE_QUERY } from '../../assign-assignments/assign-essays/assign-by-course/LessonSelect'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'

export type AssignedDateCheckProps = { courseId: string; lessonId: string }

export const AssignedDateCheck = ({
  courseId,
  lessonId,
}: AssignedDateCheckProps) => {
  const [, event] = useCreateAssignmentContextPovider()
  useQuery<findLessonsByCourse, findLessonsByCourseVariables>(
    FIND_LESSONS_BY_COURSE_QUERY,
    {
      variables: {
        input: { courseId },
      },
      onCompleted: (data) => {
        const [assignedLesson] = data?.findLessonByCourse.lessons.filter(
          (lesson) => lesson._id === lessonId
        )!

        const lessonIndex = data?.findLessonByCourse.lessons.findIndex(
          (lesson) => lesson._id === assignedLesson._id
        )!

        const sortedLessons = data?.findLessonByCourse.lessons
          .slice()
          .sort(sortByDate)!

        const previousLesson = sortedLessons[lessonIndex - 1]!

        const previousLessonDate = previousLesson
          ? previousLesson.assignedDate
          : new Date().toLocaleDateString()

        event({
          type: 'SET_READING_GUIDE_ASSIGNED_DATE',
          payload: previousLessonDate,
        })
      },
      onError: (error) => console.error(error),
    }
  )
  function sortByDate(
    a: findLessonsByCourse_findLessonByCourse_lessons,
    b: findLessonsByCourse_findLessonByCourse_lessons
  ) {
    let dateA = new Date(a.assignedDate).getTime()

    let dateB = new Date(b.assignedDate).getTime()

    return dateA > dateB ? 1 : -1
  }

  return null
}
