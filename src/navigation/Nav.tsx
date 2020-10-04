import React, { useRef, FC, Dispatch, SetStateAction } from 'react'
import { MenuNav } from '../components/home/navStyles'
import { useClickOutside } from '../hooks'
import { me_me } from '../schemaTypes'
import { TeacherNav } from './teacher-nav/TeacherNav'
import { StudentNav } from './student-nav/StudentNav'
import { TeacherNavContextProvider } from './teacher-nav/TeacherNavContext'

type NavProps = {
  isNavOpen: boolean
  setIsNavOpen: Dispatch<SetStateAction<boolean>>
  toggleLogin: () => void
  me: me_me
}

export const variants = {
  open: { x: '85vw' },
  closed: { x: '1000%', transition: { delay: 0.1 } },
}

export const moblieVariants = {
  open: { x: '70vw' },
  closed: { x: '1000%', transition: { delay: 0.1 } },
}

export const ulVariants = {
  open: {
    scale: 1.02,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      staggerDirection: -1,
      when: 'afterchildren',
    },
  },
  closed: { scale: 1 },
}

export const liVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -20 },
}

export const Nav: FC<NavProps> = ({
  isNavOpen,
  setIsNavOpen,
  toggleLogin,
  me,
}) => {
  const ref = useRef(null!)
  useClickOutside(ref, () => setIsNavOpen(false))
  return (
    <MenuNav
      variants={window.screen.width < 700 ? moblieVariants : variants}
      initial='closed'
      animate={isNavOpen ? 'open' : 'closed'}
      transition={{ damping: 500 }}
      ref={ref}
    >
      {me.__typename === 'Teacher' && (
        <TeacherNavContextProvider>
          <TeacherNav setIsNavOpen={setIsNavOpen} toggleLogin={toggleLogin} />
        </TeacherNavContextProvider>
      )}
      {me.__typename === 'Student' && (
        <StudentNav setIsNavOpen={setIsNavOpen} toggleLogin={toggleLogin} />
      )}
    </MenuNav>
  )
}
