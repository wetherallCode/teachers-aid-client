import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findAssignmentByIdVariables,
  findAssignmentById,
  findAssignmentById_findAssignmentById_assignment,
} from '../../../../../../schemaTypes'
import { usePaperBasedContextProvider } from './state/PaperBasedContext'
import { SubmitEssay } from './essay/SubmitEssay'
import { SetLateness } from './SetLateness'
import { SubmitReadingGuide } from './reading-guide/SubmitReadingGuide'

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
        ... on ReadingGuide {
          paperBased
          graded
          completed
          readingGuideFinal {
            submitted
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
      if (data.findAssignmentById.assignment.__typename === 'ReadingGuide') {
        // event({type: SET_, payload: })
      }
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const assignment: findAssignmentById_findAssignmentById_assignment = data
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
      {assignment.__typename === 'Essay' &&
        data?.findAssignmentById.assignment.late && (
          <SetLateness essay={assignment} />
        )}
      {assignment.__typename === 'Essay' &&
        state.matches('assignmentSelect.essay') && (
          <>
            <div>{assignment.topic.question}</div>
            <SubmitEssay essay={assignment} />
          </>
        )}
      {assignment.__typename === 'ReadingGuide' &&
      state.matches('assignmentSelect.readingGuide') &&
      !assignment.graded ? (
        <SubmitReadingGuide
          readingGuideId={assignmentId}
          readingGuide={assignment}
        />
      ) : (
        <>
          {assignment.__typename === 'ReadingGuide' && (
            <div>{assignment.completed ? 'Complete' : 'Incomplete'}</div>
          )}
        </>
      )}
    </>
  )
}

// export type ReadingGuideCom[let]

// export const ReadingGuideComplete
