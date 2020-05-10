import React, { Dispatch, SetStateAction, FC } from 'react'
import { useMachine } from '@xstate/react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Logout } from '../Logout'
import { LessonNav } from './LessonNav'
import { teacherNavMachine } from '../../../state-charts/teacherNav'

export type TeacherNavProps = {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  toggleLogin: () => void
}

export const TeacherNav: FC<TeacherNavProps> = ({
  toggleLogin,
  setIsNavOpen,
}) => {
  const [state, send] = useMachine(teacherNavMachine)
  const { value } = state

  return (
    <>
      <motion.ul variants={ulVariants}>
        <motion.li variants={liVariants} onClick={() => send('DASHBOARD')}>
          <Link to='/dashboard'>
            {value === 'dashboard' ? 'Dashboard' : 'Back'}
          </Link>
        </motion.li>
        {value === 'dashboard' && (
          <>
            <motion.li variants={liVariants} onClick={() => send('LESSONS')}>
              <Link to='dashboard/lessons'>Lessons</Link>
            </motion.li>
            <motion.li variants={liVariants} onClick={() => send('COURSES')}>
              <Link to='dashboard/courses'>Courses</Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
            </motion.li>
          </>
        )}
        <>{value === 'lessons' && <LessonNav />}</>
      </motion.ul>
    </>
  )
}
