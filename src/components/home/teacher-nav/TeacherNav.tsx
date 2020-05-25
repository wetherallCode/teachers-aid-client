import React, { Dispatch, SetStateAction, FC } from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Logout } from '../Logout'
import { LessonNav } from './LessonNav'
import { useTeacherNavContextProvider } from './TeacerNavContext'

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
        <motion.li variants={liVariants} onClick={() => event('DASHBOARD')}>
          <Link to='/dashboard'>
            {state.matches('dashboard') ? 'Dashboard' : 'Back'}
          </Link>
        </motion.li>
        {state.matches('dashboard') && (
          <>
            <motion.li variants={liVariants} onClick={() => event('LESSONS')}>
              <Link to='dashboard/lessons'>Lessons</Link>
            </motion.li>
            <motion.li variants={liVariants} onClick={() => event('COURSES')}>
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
        </>
      </motion.ul>
    </>
  )
}
