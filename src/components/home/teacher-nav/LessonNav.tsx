import React, { FC } from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TeacherNavProps } from './TeacherNav'
import { Logout } from '../Logout'

export const LessonNav: FC<TeacherNavProps> = ({
  toggleLogin,
  setIsNavOpen,
}) => {
  return (
    <>
      <motion.ul variants={ulVariants}>
        <motion.li variants={liVariants}>
          <Link to='dashboard/lessons/lesson-planner'>Lesson Planner</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/lessons/section-builder'>Section Builder</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/lessons/section-editor'>Section Editor</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
        </motion.li>
      </motion.ul>
    </>
  )
}
