import React, { FC, Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { ulVariants, liVariants } from '../Nav'
import { Link } from 'react-router-dom'
import { Logout } from '../Logout'

export type RubricsNavProps = {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  toggleLogin: () => void
}

export const RubricsNav: FC<RubricsNavProps> = ({
  setIsNavOpen,
  toggleLogin,
}) => {
  return (
    <>
      <>
        <motion.ul variants={ulVariants}>
          <motion.li variants={liVariants}>
            <Link to='dashboard/rubrics/create'>Create</Link>
          </motion.li>
          <motion.li variants={liVariants}>
            <Link to='dashboard/rubrics/edit'>Edit</Link>
          </motion.li>
          <motion.li variants={liVariants}>
            <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
          </motion.li>
        </motion.ul>
      </>
    </>
  )
}
