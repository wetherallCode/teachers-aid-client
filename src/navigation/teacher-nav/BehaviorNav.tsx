import React from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TeacherNavProps } from './TeacherNav'

export const BehaviorNav = ({}: TeacherNavProps) => {
  return (
    <motion.ul variants={ulVariants}>
      <motion.li variants={liVariants}>
        <Link to='dashboard/behavior/create-behavior'>Create</Link>
      </motion.li>
      <motion.li variants={liVariants}>
        <Link to='dashboard/behavior/edit-behavior'>Edit</Link>
      </motion.li>
    </motion.ul>
  )
}
