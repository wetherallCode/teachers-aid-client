import { gql, useMutation } from '@apollo/client'
import React, { FC } from 'react'
import {
  assignReadingGuidesForTeachersAid,
  assignReadingGuidesForTeachersAidVariables,
} from '../../../../../../../schemaTypes'
import { AssignButton } from '../../../styles/mainScreenStyles'

export type AssignReadingGuideForTeachersAidProps = {
  lessonId: string
  dueDate: string
  studentIds: string[]
  finished: boolean
  loading: boolean
}

export const ASSIGN_READING_GUIDE_FOR_TEACHERS_AID_MUTATION = gql`
  mutation assignReadingGuidesForTeachersAid(
    $input: AssignReadingGuidesInput!
  ) {
    assignReadingGuides(input: $input) {
      readingGuides {
        _id
      }
    }
  }
`

export const AssignReadingGuideForTeachersAid: FC<
  AssignReadingGuideForTeachersAidProps
> = ({ lessonId, dueDate, studentIds, finished, loading }) => {
  const [assignReadingGuide, { called, data }] = useMutation<
    assignReadingGuidesForTeachersAid,
    assignReadingGuidesForTeachersAidVariables
  >(ASSIGN_READING_GUIDE_FOR_TEACHERS_AID_MUTATION, {
    variables: {
      input: {
        assignedDate: new Date().toLocaleDateString(),
        associatedLessonId: lessonId,
        dueDate,
        studentIds,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          {data || finished ? (
            <div>Finished</div>
          ) : (
            <AssignButton called={called} onClick={() => assignReadingGuide()}>
              Assign
            </AssignButton>
          )}
        </>
      )}
    </>
  )
}
