import React, { FC, useEffect } from 'react'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'
import {
  me_me_Teacher,
  findCoursesById_findCoursesById_courses,
} from '../../../../../schemaTypes'
import { useLessonEditorContextProvider } from './LessonEditorContext'

export type CourseLinkSelectProps = {
  linkedCourses: findCoursesById_findCoursesById_courses['_id'][]
}

export const CourseLinkSelect: FC<CourseLinkSelectProps> = ({
  linkedCourses,
}) => {
  const me: me_me_Teacher = useUserContextProvider()
  const [, event] = useLessonEditorContextProvider()
  const [courseList, handleChange] = useCheckBox([])
  useEffect(() => {
    if (courseList.length > 0) {
      event({ type: 'ASSIGN_TO_COURSES', payload: courseList })
    }
  }, [courseList])
  console.log(courseList)
  return (
    <>
      <div>
        {me.teachesCourses.map((course) => {
          return (
            <span key={course._id!}>
              <input
                type='checkbox'
                value={course._id!}
                checked={linkedCourses.includes(course._id)}
                onChange={handleChange}
              />
              <span>{course.name}</span>
            </span>
          )
        })}
      </div>
    </>
  )
}
