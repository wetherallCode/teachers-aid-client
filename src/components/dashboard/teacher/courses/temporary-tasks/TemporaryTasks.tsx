import React, { FC } from 'react'
import { useParams } from 'react-router'
import { CreateTask } from './CreateTask'
import { ReviewTasks } from './review-tasks/ReviewTasks'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import {
  MenuItems,
  TemporaryTaskDisplay,
  TemporaryTasksContainer,
  TemporaryTasksMenu,
} from './state-n-styles/temporaryTaskStyles'
import { TaskCreator } from './TaskCreator'

export type TemporaryTasksProps = {}

export const TemporaryTasks: FC<TemporaryTasksProps> = () => {
  const [state, event] = useTemporaryTasksContextProvider()
  const { course } = useParams()

  return (
    <TemporaryTasksContainer>
      <TemporaryTasksMenu>
        <MenuItems>
          <div onClick={() => event({ type: 'CREATE' })}>Create</div>
        </MenuItems>
        <MenuItems>
          <div onClick={() => event({ type: 'REVIEW' })}>Review</div>
        </MenuItems>
      </TemporaryTasksMenu>
      <>
        {state.matches('idle') && (
          <TemporaryTaskDisplay>Tasks</TemporaryTaskDisplay>
        )}
        {state.matches('create') && (
          <TaskCreator
            courseId={course}
            dateIssued={new Date().toLocaleDateString()}
          />
        )}
      </>
      {state.matches('review') && <ReviewTasks courseId={course} />}
    </TemporaryTasksContainer>
  )
}
