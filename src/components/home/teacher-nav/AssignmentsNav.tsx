import React, { FC } from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TeacherNavProps } from './TeacherNav'
import { Logout } from '../Logout'

export const AssignmentNav: FC<TeacherNavProps> = ({
  toggleLogin,
  setIsNavOpen,
}) => {
  return (
    <>
      <motion.ul variants={ulVariants}>
        <motion.li variants={liVariants}>
          <Link to='dashboard/assignments/create'>Create</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/assignments/edit'>Edit</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/assignments/grade'>Grade</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/assignments/assign'>Assign</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/assignments/article-reviews'>
            Article Reviews
          </Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
        </motion.li>
      </motion.ul>
    </>
  )
}
