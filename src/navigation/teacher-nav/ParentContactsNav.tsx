import { motion } from 'framer-motion'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '../../components/home/Logout'
import { ulVariants, liVariants } from '../Nav'

export type ParentContactsNavProps = {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  toggleLogin: () => void
}

export const ParentContactsNav: FC<ParentContactsNavProps> = ({
  toggleLogin,
  setIsNavOpen,
}) => {
  return (
    <>
      <motion.ul variants={ulVariants}>
        <motion.li variants={liVariants}>
          <Link to="dashboard/parentContacts/create-contact">
            Create Contact
          </Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Link to="dashboard/parentContacts/contacts">Contacts</Link>
        </motion.li>
        <motion.li variants={liVariants}>
          <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
        </motion.li>
      </motion.ul>
    </>
  )
}
