import React, { Dispatch, SetStateAction, FC } from 'react'
import { liVariants, ulVariants } from './Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Logout } from './Logout'

export type StudentNavProps = {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  toggleLogin: () => void
}

export const StudentNav: FC<StudentNavProps> = ({
  toggleLogin,
  setIsNavOpen,
}) => {
  return (
    <>
      <motion.ul variants={ulVariants}>
        <motion.li variants={liVariants}>
          <Link to='/dashboard'>Dashboard</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/assignments'>Assignments</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to='dashboard/grades'>Grades</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
        </motion.li>
      </motion.ul>
    </>
  )
}
