import { gql, useQuery } from '@apollo/client'
import React, { FC, useState } from 'react'
import {
  findQuizzesForCourseByAssignedDate,
  findQuizzesForCourseByAssignedDateVariables,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  AssignmentControlItem,
  AssignmentControlPanelContainer,
  AssignmentControlSelector,
  HomeworkAssignerTitleContainer,
  HomeworkAssingerContainer,
} from '../../styles/mainScreenStyles'
import { LoadEssays } from './assign-essay/LoadEssays'
import { QuizControlPanel } from './assign-quizzes/QuizControlPanel'
import { LoadReadingGuides } from './assign-reading-guide/LoadReadingGuides'

export type HomeworkAssignerProps = { presentStudentList: string[] }

export const FIND_QUIZZES_BY_ASSIGNED_DATE_QUERY = gql`
  query findQuizzesForCourseByAssignedDate(
    $input: FindQuizzesForCourseByAssignedDateInput!
  ) {
    findQuizzesForCourseByAssignedDate(input: $input) {
      quizzes {
        _id
        hasOwner {
          firstName
          lastName
          _id
        }
        assigned
        markingPeriod
        assignedDate
        isActive
        finishedQuiz
      }
    }
  }
`

export const HomeworkAssigner = ({
  presentStudentList,
}: HomeworkAssignerProps) => {
  const [state, event] = useTeachersAidContextProvider()
  const { loading, data } = useQuery<
    findQuizzesForCourseByAssignedDate,
    findQuizzesForCourseByAssignedDateVariables
  >(FIND_QUIZZES_BY_ASSIGNED_DATE_QUERY, {
    variables: {
      input: {
        courseId: state.context.courseInfo?.course._id!,
        // assignedDate: new Date().toLocaleDateString(),
        assignedDate: '10/12/2021',
      },
    },
    pollInterval: 1000,
    onCompleted: (data) =>
      console.log(data?.findQuizzesForCourseByAssignedDate.quizzes),
    onError: (error) => console.error(error),
  })

  const [assignmentControlState, setAssignmentControlState] = useState<
    'quiz' | 'homework'
  >(
    data?.findQuizzesForCourseByAssignedDate.quizzes.length! > 0
      ? 'quiz'
      : 'homework'
  )

  if (loading) return <div>Loading </div>
  return (
    <AssignmentControlPanelContainer>
      {/* <HomeworkAssignerTitleContainer>
        Assignments
      </HomeworkAssignerTitleContainer> */}
      <AssignmentControlSelector>
        <AssignmentControlItem
          onClick={() => setAssignmentControlState('quiz')}
        >
          Quizzes
        </AssignmentControlItem>
        <AssignmentControlItem
          onClick={() => setAssignmentControlState('homework')}
        >
          Homework
        </AssignmentControlItem>
      </AssignmentControlSelector>
      {assignmentControlState === 'homework' && (
        <HomeworkAssingerContainer>
          <LoadEssays />
          <LoadReadingGuides />
        </HomeworkAssingerContainer>
      )}
      {assignmentControlState === 'quiz' && (
        <QuizControlPanel
          quizzes={data?.findQuizzesForCourseByAssignedDate.quizzes!}
          presentStudentList={presentStudentList}
        />
      )}
    </AssignmentControlPanelContainer>
  )
}
