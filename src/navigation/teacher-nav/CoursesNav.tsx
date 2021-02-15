import React, { FC } from 'react'
import { liVariants, ulVariants } from '../Nav'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TeacherNavProps } from './TeacherNav'
import { Logout } from '../../components/home/Logout'
import { useUserContextProvider } from '../../contexts/UserContext'
import { me_me_Teacher } from '../../schemaTypes'
import { useTeacherNavContextProvider } from './TeacherNavContext'
import { sortByLetter } from '../../utils'

export const CoursesNav: FC<TeacherNavProps> = ({ toggleLogin, setIsNavOpen }) => {
	const me: me_me_Teacher = useUserContextProvider()
	// console.log(me)
	const [navState, event] = useTeacherNavContextProvider()

	const coursesToNavigate = me.teachesCourses.slice(1).sort(sortByLetter)

	return (
		<>
			<motion.ul variants={ulVariants}>
				{/* <motion.li variants={liVariants}>
          <Link to='dashboard/courses/lesson-editor'>Lesson Editor</Link>
        </motion.li> */}
<<<<<<< HEAD
        {navState.matches('courses.home.idle') && (
          <>
            {me.teachesCourses.map((course) => (
              <motion.li key={course._id!} variants={liVariants}>
                <Link
                  to={`dashboard/courses/${course._id}`}
                  onClick={() => {
                    event({ type: 'SET_COURSE', payload: course._id! })
                    event({ type: 'COURSE_SELECT' })
                  }}
                >
                  {course.name}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={liVariants}>
              <Link to={`dashboard/courses/create-course`}>New Course</Link>
            </motion.li>
          </>
        )}
        {navState.matches('courses.home.courseSelect') && (
          <>
            <motion.li variants={liVariants}>
              <Link
                to={'dashboard/courses'}
                onClick={() => event({ type: 'COURSES' })}
              >
                Courses
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link
                to={`dashboard/courses/${navState.context.course}/lesson-editor`}
              >
                Lesson Editor
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link
                to={`dashboard/courses/${navState.context.course}/assign-assignments`}
              >
                Assign Work
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link
                to={`dashboard/courses/${navState.context.course}/assignment-manager`}
              >
                Assignments
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link to={`dashboard/courses/${navState.context.course}/tasks`}>
                Tasks
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link to={`dashboard/courses/${navState.context.course}/roster`}>
                Roster
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link
                to={`dashboard/courses/${navState.context.course}/view-reading-guide-data`}
              >
                ReadingGuide Data
              </Link>
            </motion.li>
            <motion.li variants={liVariants}>
              <Link
                to={`dashboard/courses/${navState.context.course}/edit-course`}
              >
                Edit Course
              </Link>
            </motion.li>
          </>
        )}
        <motion.li variants={liVariants}>
          <Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
        </motion.li>
      </motion.ul>
    </>
  )
=======
				{navState.matches('courses.home.idle') && (
					<>
						{coursesToNavigate.map((course) => (
							<motion.li key={course._id!} variants={liVariants}>
								<Link
									to={`dashboard/courses/${course._id}`}
									onClick={() => {
										event({ type: 'SET_COURSE', payload: course._id! })
										event({ type: 'COURSE_SELECT' })
									}}>
									{course.name}
								</Link>
							</motion.li>
						))}
						<motion.li variants={liVariants}>
							<Link to={`dashboard/courses/create-course`}>New Course</Link>
						</motion.li>
					</>
				)}
				{navState.matches('courses.home.courseSelect') && (
					<>
						<motion.li variants={liVariants}>
							<Link to={'dashboard/courses'} onClick={() => event({ type: 'COURSES' })}>
								Courses
							</Link>
						</motion.li>
						<motion.li variants={liVariants}>
							<Link to={`dashboard/courses/${navState.context.course}/lesson-editor`}>
								Lesson Editor
							</Link>
						</motion.li>
						<motion.li variants={liVariants}>
							<Link to={`dashboard/courses/${navState.context.course}/assign-assignments`}>
								Assign Work
							</Link>
						</motion.li>
						<motion.li variants={liVariants}>
							<Link to={`dashboard/courses/${navState.context.course}/assignment-manager`}>
								Assignments
							</Link>
						</motion.li>
						<motion.li variants={liVariants}>
							<Link to={`dashboard/courses/${navState.context.course}/roster`}>Roster</Link>
						</motion.li>
						<motion.li variants={liVariants}>
							<Link to={`dashboard/courses/${navState.context.course}/view-reading-guide-data`}>
								ReadingGuide Data
							</Link>
						</motion.li>
						<motion.li variants={liVariants}>
							<Link to={`dashboard/courses/${navState.context.course}/edit-course`}>
								Edit Course
							</Link>
						</motion.li>
					</>
				)}
				<motion.li variants={liVariants}>
					<Logout toggleLogin={toggleLogin} setIsNavOpen={setIsNavOpen} />
				</motion.li>
			</motion.ul>
		</>
	)
>>>>>>> 7dac1573e5f6b2f259cbb701e5f43f494f34f25c
}
