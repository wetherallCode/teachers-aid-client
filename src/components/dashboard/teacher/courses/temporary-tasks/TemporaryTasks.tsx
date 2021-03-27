import React, { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useToggle } from '../../../../../hooks'
import { me_me, me_me_Teacher } from '../../../../../schemaTypes'
import { sortByLetter } from '../../../../../utils'
import { CreateTask } from './CreateTask'
import { LoadTasks } from './LoadTasks'
import { ReviewTasks } from './review-tasks/ReviewTasks'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import {
  MenuItems,
  TemporaryTaskDisplay,
  TemporaryTasksContainer,
  TemporaryTasksMenu,
  TemporaryTasksMenuContainer,
} from './state-n-styles/temporaryTaskStyles'
import { TaskCreator } from './TaskCreator'
import { TaskTimer } from './TaskTimer'

export type TemporaryTasksProps = {}

export const TemporaryTasks: FC<TemporaryTasksProps> = () => {
  const navigate = useNavigate()
  const [courseToNavigateTo, setcourseToNavigateTo] = useState('')
  const me: me_me_Teacher = useUserContextProvider()
  const [courseSelectorSwitch, toggleCourseSelectorSwitch] = useToggle(false)
  const [state, event] = useTemporaryTasksContextProvider()
  const { course } = useParams()

  const [courseName] = me.teachesCourses
    .filter((courseToFind) => courseToFind._id === course)
    .map((course) => course.name)

  const coursesToChoose = me.teachesCourses
    .slice(1)
    .sort(sortByLetter)
    .filter((courseToFind) => courseToFind._id !== course)

  return (
    <TemporaryTasksContainer>
      <TemporaryTasksMenuContainer>
        <TemporaryTasksMenu>
          <MenuItems>
            <div onClick={() => event({ type: 'CREATE' })}>Create</div>
          </MenuItems>
          <MenuItems>
            <div onClick={() => event({ type: 'REVIEW' })}>Review</div>
          </MenuItems>
          <MenuItems onClick={() => toggleCourseSelectorSwitch()}>
            {courseSelectorSwitch ? 'Select Course' : courseName}
          </MenuItems>
          {courseSelectorSwitch && (
            <div>
              {coursesToChoose.map((course) => (
                <MenuItems
                  onClick={() => {
                    navigate(`/dashboard/courses/${course._id}/tasks`)
                    toggleCourseSelectorSwitch()
                  }}
                  key={course._id!}
                >
                  {course.name}
                </MenuItems>
              ))}
            </div>
          )}
        </TemporaryTasksMenu>
        {state.matches('create') && <TaskTimer />}
      </TemporaryTasksMenuContainer>
      <>
        {state.matches('idle') && (
          <TemporaryTaskDisplay>{courseName} Tasks</TemporaryTaskDisplay>
        )}
        {state.matches('create') && (
          <LoadTasks
            courseId={course}
            dateIssued={new Date().toLocaleDateString()}
          />
        )}
      </>
      {state.matches('review') && <ReviewTasks courseId={course} />}
    </TemporaryTasksContainer>
  )
}
