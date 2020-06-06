import React, { FC } from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TeacherNavProps } from './TeacherNav'
import { Logout } from '../Logout'
import { useUserContextProvider } from '../../../contexts/UserContext'
import { me_me_Teacher } from '../../../schemaTypes'
import { useTeacherNavContextProvider } from './TeacherNavContext'

export const CoursesNav: FC<TeacherNavProps> = ({
  toggleLogin,
  setIsNavOpen,
}) => {
  const me: me_me_Teacher = useUserContextProvider()
  // console.log(me)
  const [navState, event] = useTeacherNavContextProvider()
  console.log(navState.context.course)
  return (
    <>
      <motion.ul variants={ulVariants}>
        {/* <motion.li variants={liVariants}>
          <Link to='dashboard/courses/lesson-editor'>Lesson Editor</Link>
        </motion.li> */}
        {navState.matches('courses.home.idle') && (
          <>
            {me.teachesCourses.map((course) => (
              <motion.li key={course._id!} variants={liVariants}>
                <Link
                  to={`dashboard/courses/${course._id}`}
                  onClick={() => {
                    event({ type: 'SET_COURSE', payload: course._id! })
                    event({ type: 'COURSE_SELECT' })
                  }}
                >
                  {course.period}
                </Link>
              </motion.li>
            ))}
          </>
        )}
        {navState.matches('courses.home.courseSelect') && (
          <>
            <motion.li variants={liVariants}>
              <Link
                to={'dashboard/courses'}
                onClick={() => event({ type: 'COURSES' })}
              >
                Courses
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link
                to={`dashboard/courses/${navState.context.course}/lesson-editor`}
              >
                Lesson Editor
              </Link>
            </motion.li>
          </>
        )}
        <motion.li variants={liVariants}>
          <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
        </motion.li>
      </motion.ul>
    </>
  )
}
