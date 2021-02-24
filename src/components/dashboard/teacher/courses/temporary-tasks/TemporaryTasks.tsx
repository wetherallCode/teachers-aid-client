import React, { FC } from 'react'
import { useParams } from 'react-router'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { me_me, me_me_Teacher } from '../../../../../schemaTypes'
import { CreateTask } from './CreateTask'
import { LoadTasks } from './LoadTasks'
import { ReviewTasks } from './review-tasks/ReviewTasks'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import {
  MenuItems,
  TemporaryTaskDisplay,
  TemporaryTasksContainer,
  TemporaryTasksMenu,
} from './state-n-styles/temporaryTaskStyles'
import { TaskCreator } from './TaskCreator'
import { TaskTimer } from './TaskTimer'

export type TemporaryTasksProps = {}

export const TemporaryTasks: FC<TemporaryTasksProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const [state, event] = useTemporaryTasksContextProvider()
  const { course } = useParams()

  const [courseName] = me.teachesCourses
    .filter((courseToFind) => courseToFind._id === course)
    .map((course) => course.name)

  return (
    <TemporaryTasksContainer>
      <TemporaryTasksMenu>
        <MenuItems>
          <div onClick={() => event({ type: 'CREATE' })}>Create</div>
        </MenuItems>
        <MenuItems>
          <div onClick={() => event({ type: 'REVIEW' })}>Review</div>
        </MenuItems>
        <MenuItems>{courseName}</MenuItems>
        <TaskTimer />
      </TemporaryTasksMenu>
      <>
        {state.matches('idle') && (
          <TemporaryTaskDisplay>Tasks</TemporaryTaskDisplay>
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
