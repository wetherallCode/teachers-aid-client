import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findTemporaryTasksToReview,
  findTemporaryTasksToReviewVariables,
} from '../../../../../../schemaTypes'
import { useTemporaryTasksContextProvider } from '../state-n-styles/TemporaryTasksContext'
import {
  ReviewTasksContainer,
  TasksToSelectContainer,
} from '../state-n-styles/temporaryTaskStyles'

export type ReviewTasksProps = {
  courseId: string
}

export const FIND_TEMPORARY_TASKS_TO_REVIEW_QUERY = gql`
  query findTemporaryTasksToReview($input: FindTemporaryTasksInput!) {
    findTemporaryTasks(input: $input) {
      temporaryTasks {
        _id
        dateIssued
        student {
          _id
          firstName
          lastName
        }
        studentPresent
        taskNumber
        answered
      }
    }
  }
`

export const ReviewTasks: FC<ReviewTasksProps> = ({ courseId }) => {
  const [state, event] = useTemporaryTasksContextProvider()

  const { loading, data } = useQuery<
    findTemporaryTasksToReview,
    findTemporaryTasksToReviewVariables
  >(FIND_TEMPORARY_TASKS_TO_REVIEW_QUERY, {
    variables: {
      input: { courseId, dateIssued: state.context.dateToReview },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <ReviewTasksContainer>
      <TasksToSelectContainer>
        <input
          type='date'
          value={state.context.dateToReview}
          onChange={(e: any) =>
            event({ type: 'SET_DATE_TO_REVIEW', payload: e.target.value })
          }
        />
      </TasksToSelectContainer>
    </ReviewTasksContainer>
  )
}
