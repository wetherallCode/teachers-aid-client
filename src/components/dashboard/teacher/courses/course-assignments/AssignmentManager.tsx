import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { assign } from 'xstate/lib/actionTypes'
import {
  findAssignmentsByCourseId,
  findAssignmentsByCourseIdVariables,
} from '../../../../../schemaTypes'
import { ArticleReviews } from './downloadables/article-reviews/ArticleReviews'
import { Essays } from './downloadables/essays/Essays'
import { ResponsibilityPoints } from './downloadables/responsibility-points/ResponsibilityPoints'
import { SecondaryGrades } from './downloadables/secondary-grades/SecondaryGrades'
import { useAssignmentManagerContextProvider } from './state-styles/AssignmentManagerContext'

export type AssignmentManagerProps = {
  courseId: string
}

export const FIND_ASSIGNMENTS_QUERY = gql`
  query findAssignmentsByCourseId($input: FindAssignmentsByCourseIdInput!) {
    findAssignmentsByCourseId(input: $input) {
      assignments {
        hasOwner {
          lastName
          firstName
          schoolId
          hasAssignments {
            _id
            score {
              earnedPoints
              maxPoints
            }
            readings {
              readingSections
              readingPages
            }
            missing
            markingPeriod
            late
            gradeType
            exempt
            dueTime
            assigned
          }
        }
      }
    }
  }
`

export const AssignmentManager = ({ courseId }: AssignmentManagerProps) => {
  const [state, event] = useAssignmentManagerContextProvider()
  const navigate = useNavigate()
  // const { loading, data } = useQuery<
  //   findAssignmentsByCourseId,
  //   findAssignmentsByCourseIdVariables
  // >(FIND_ASSIGNMENTS_QUERY, {
  //   variables: {
  //     input: { courseId },
  //   },
  //   // onCompleted: (data) => console.log(data),
  //   onError: (error) => console.error(error),
  // })

  // if (loading) return <div>Loading </div>
  return (
    <>
      <Link to={'/dashboard/courses/' + courseId}>Back</Link>
      <div>Assignment Manager</div>
      <div>Create Grade Download</div>
      <div>
        <div onClick={() => event({ type: 'RESPONSIBILITY_POINTS' })}>
          Responsibility Points
        </div>
        <div onClick={() => event({ type: 'ESSAYS' })}>Essays</div>
        <div onClick={() => event({ type: 'ARTICLE_REVIEW' })}>
          Article Reviews
        </div>
        <div onClick={() => event({ type: 'SECONDARY_GRADES' })}>
          Secondary Grades
        </div>
      </div>
      {state.matches('responsibilityPoints') && <ResponsibilityPoints />}
      {state.matches('essays') && <Essays />}
      {state.matches('articleReviews') && <ArticleReviews />}
      {state.matches('secondaryGrades') && <SecondaryGrades />}
    </>
  )
}
