import React, { Dispatch, SetStateAction, FC } from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Logout } from '../Logout'
import { LessonNav } from './LessonNav'
import { useTeacherNavContextProvider } from './TeacherNavContext'
import { AssignmentNav } from './AssignmentsNav'
import { CoursesNav } from './CoursesNav'
import { RubricsNav } from './RubricsNav'

export type TeacherNavProps = {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  toggleLogin: () => void
}

export const TeacherNav: FC<TeacherNavProps> = ({
  toggleLogin,
  setIsNavOpen,
}) => {
  const [state, event] = useTeacherNavContextProvider()

  return (
    <>
      <motion.ul variants={ulVariants}>
        <motion.li
          variants={liVariants}
          onClick={() => event({ type: 'DASHBOARD' })}
        >
          <Link to='/dashboard'>Dashboard</Link>
        </motion.li>
        {state.matches('dashboard') && (
          <>
            <motion.li
              variants={liVariants}
              onClick={() => event({ type: 'LESSONS' })}
            >
              <Link to='dashboard/lessons'>Lessons</Link>
            </motion.li>
            <motion.li
              variants={liVariants}
              onClick={() => event({ type: 'ASSIGNMENTS' })}
            >
              <Link to='dashboard/assignments'>Assignments</Link>
            </motion.li>
            <motion.li
              variants={liVariants}
              onClick={() => event({ type: 'RUBRICS' })}
            >
              <Link to='dashboard/rubrics'>Rubrics</Link>
            </motion.li>
            <motion.li
              variants={liVariants}
              onClick={() => event({ type: 'COURSES' })}
            >
              <Link to='dashboard/courses'>Courses</Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
            </motion.li>
          </>
        )}
        <>
          {state.matches('lessons') && (
            <LessonNav toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
          )}
          {state.matches('assignments') && (
            <AssignmentNav
              toggleLogin={toggleLogin}
              setIsNavOpen={setIsNavOpen}
            />
          )}
          {state.matches('rubrics') && (
            <RubricsNav toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
          )}
          {state.matches('courses.home') && (
            <CoursesNav toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
          )}
        </>
      </motion.ul>
    </>
  )
}
