import React from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const LessonNav = () => {
  return (
    <>
      <motion.ul variants={ulVariants}>
        <motion.li variants={liVariants}>
          <Link to='dashboard/lessons/section-builder'>Section Builder</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/lessons/section-builder'>Lesson Planner</Link>
        </motion.li>
      </motion.ul>
    </>
  )
}
