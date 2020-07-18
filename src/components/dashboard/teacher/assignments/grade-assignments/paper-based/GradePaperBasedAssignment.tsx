import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findAssignmentByIdVariables,
  findAssignmentById,
  submitEssayFinalDraft,
  SubmittedFinalDraftsInput,
  findAssignmentById_findAssignmentById_assignment_Essay,
  findAssignmentById_findAssignmentById_assignment,
} from '../../../../../../schemaTypes'
import { SubmitEssayFinalDraftInput } from '../../../../student/assignments/essays/completed-essays/SubmitRedoneEssay'
import { usePaperBasedContextProvider } from './PaperBasedContext'
import { SubmitEssay } from './essay/SubmitEssay'
import { GradeEssay } from './essay/GradeEssay'
import { SetLateness } from './SetLateness'

export type GradePaperBasedAssignmentProps = {}

export const FIND_ASSIGNMENT_BY_ID_QUERY = gql`
  query findAssignmentById($input: FindAssignmentByIdInput!) {
    findAssignmentById(input: $input) {
      assignment {
        _id
        hasOwner {
          firstName
          lastName
        }
        late
        readings {
          readingPages
          readingSections
        }
        ... on Essay {
          workingDraft {
            draft
          }
          topic {
            writingLevel
            question
          }
          finalDraft {
            submitTime
            submitted
            returned
            submittedFinalDraft {
              draft
              gradingDraft
              draftNumber
              graded
              score
              additionalComments
              rubricEntries {
                _id
                entry
                score
                rubricSection
              }
            }
          }
        }
      }
    }
  }
`

export const GradePaperBasedAssignment: FC<GradePaperBasedAssignmentProps> = () => {
  const [state, event] = usePaperBasedContextProvider()

  const { assignmentId } = useParams()
  const { loading, data } = useQuery<
    findAssignmentById,
    findAssignmentByIdVariables
  >(FIND_ASSIGNMENT_BY_ID_QUERY, {
    variables: {
      input: { assignmentId },
    },
    onCompleted: (data) => {
      event({ type: 'SET_ASSIGNMENT_ID', payload: assignmentId })
      event({
        type: 'SET_ASSIGNMENT_TYPE',
        payload: data.findAssignmentById.assignment.__typename,
      })
      event({
        type: 'SET_LATE',
        payload: data.findAssignmentById.assignment.late,
      })
      event({ type: 'NEXT' })
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const essay: findAssignmentById_findAssignmentById_assignment = data
    ?.findAssignmentById.assignment!

  return (
    <>
      <>
        <span>{data?.findAssignmentById.assignment.hasOwner.firstName} </span>
        <span>{data?.findAssignmentById.assignment.hasOwner.lastName}</span>
      </>
      <>
        <div>
          Pages: {data?.findAssignmentById.assignment.readings.readingPages}:{' '}
          {data?.findAssignmentById.assignment.readings.readingSections}
        </div>
      </>
      {data?.findAssignmentById.assignment.late && (
        <SetLateness essay={essay} />
      )}
      {essay.__typename === 'Essay' && state.matches('assignmentSelect.essay') && (
        <>
          <div>{essay.topic.question}</div>
          <SubmitEssay essay={essay} />
          {/* <GradeEssay essay={essay} /> */}
        </>
      )}
    </>
  )
}
