import React from 'react'
import { Link } from 'react-router-dom'
import { useUserContextProvider } from '../../../../contexts/UserContext'
import { useToggle } from '../../../../hooks'
import { useGetCurrentCourse } from '../../../../hooks/useGetCurrentCourse'
import { useTeacherNavContextProvider } from '../../../../navigation/teacher-nav/TeacherNavContext'
import { me_me_Teacher } from '../../../../schemaTypes'
import { capitalizer } from '../../../../utils'
import {
  CourseDirectoryContainer,
  CourseDirectoryTitleContainer,
  IndividualCourseBlockContainer,
  IndividualCourseDirectContainer,
} from './coursesStyles'

export type CourseDirectoryProps = {}

export const CourseDirectory = ({}: CourseDirectoryProps) => {
  const me: me_me_Teacher = useUserContextProvider()
  const courseToLoad = useGetCurrentCourse()
  const [navState, event] = useTeacherNavContextProvider()
  const [hiddenSwitch, toggleHiddenSwitch] = useToggle(false)

  const courseList = me.teachesCourses.filter(
    (course) => course.hasCourseInfo.isHidden === hiddenSwitch,
  )

  return (
    <CourseDirectoryContainer>
      <CourseDirectoryTitleContainer>
        <div></div>
        <div>
          {capitalizer(me.title)}. {me.lastName}'s Courses
        </div>
        <div>
          <button onClick={toggleHiddenSwitch}>Show Hidden</button>
        </div>
      </CourseDirectoryTitleContainer>

      <IndividualCourseDirectContainer>
        {courseList.map((course) => (
          <IndividualCourseBlockContainer
            to={course._id!}
            onClick={() => {
              event({ type: 'SET_COURSE', payload: course._id! })
              event({ type: 'COURSE_SELECT' })
            }}
            highlighted={courseToLoad ? course._id === courseToLoad._id : false}
          >
            <div>{course.name}</div>
          </IndividualCourseBlockContainer>
        ))}
      </IndividualCourseDirectContainer>
    </CourseDirectoryContainer>
  )
}
