import React, { FC } from 'react'
import { useAssignReadingGuideByCourseContextProvider } from './state/AssignReadingGuideByCourseContext'
import { gql, useMutation } from '@apollo/client'
import {
  assignReadingGuidesVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assignReadingGuides,
} from '../../../../../../../schemaTypes'

export type AssignReadingGuideProps = {}

export const ASSIGN_READING_GUIDE_MUTATION = gql`
  mutation assignReadingGuides($input: AssignReadingGuidesInput!) {
    assignReadingGuides(input: $input) {
      readingGuides {
        _id
      }
    }
  }
`

export const AssignReadingGuide: FC<AssignReadingGuideProps> = () => {
  const [state] = useAssignReadingGuideByCourseContextProvider()
  const [assignReadingGuides] = useMutation<
    assignReadingGuides,
    assignReadingGuidesVariables
  >(ASSIGN_READING_GUIDE_MUTATION, {
    variables: {
      input: {
        assignedDate: state.context.assignedDate,
        dueDate: state.context.dueDate,
        associatedLessonId: state.context.associatedLessonId,
        studentIds: state.context.studentIds,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      <button onClick={() => assignReadingGuides()}>Assign</button>
    </>
  )
}
