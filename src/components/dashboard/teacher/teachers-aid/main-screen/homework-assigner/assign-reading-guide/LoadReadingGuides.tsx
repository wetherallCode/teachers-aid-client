import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findReadingGuidesByCourseIdAndAssignedDate,
  findReadingGuidesByCourseIdAndAssignedDateVariables,
} from '../../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'
import { AssignReadingGuideForTeachersAid } from './AssignReadingGuideForTeachersAid'

export type LoadReadingGuidesProps = {}

export const FIND_READING_GUIDES_BY_COURSE_ID_AND_ASSIGNED_DATE_QUERY = gql`
  query findReadingGuidesByCourseIdAndAssignedDate(
    $input: FindReadingGuidesByCourseIdAndAssignedDateInput!
  ) {
    findReadingGuidesByCourseIdAndAssignedDate(input: $input) {
      readingGuides {
        _id
        hasOwner {
          _id
        }
        assigned
        dueDate
        associatedLessonId
      }
    }
  }
`

export const LoadReadingGuides: FC<LoadReadingGuidesProps> = () => {
  const [state] = useTeachersAidContextProvider()
  const { loading, data } = useQuery<
    findReadingGuidesByCourseIdAndAssignedDate,
    findReadingGuidesByCourseIdAndAssignedDateVariables
  >(FIND_READING_GUIDES_BY_COURSE_ID_AND_ASSIGNED_DATE_QUERY, {
    variables: {
      input: {
        courseId: state.context.courseInfo.course._id!,
        assignedDate: new Date().toLocaleDateString(),
      },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const dueDate = data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides!.map(
    (rg) => rg.dueDate
  )
  const lessonId = data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides!.map(
    (rg) => rg.associatedLessonId
  ) as string[]
  const studentIds = data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides.map(
    (rg) => rg.hasOwner._id
  ) as string[]
  const finished = data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides
    .map((rg) => rg.assigned === true)
    .includes(true)!

  return (
    <>
      <div>Assign Todays Reading Guide</div>
      <AssignReadingGuideForTeachersAid
        studentIds={studentIds}
        dueDate={dueDate! && dueDate![0]}
        lessonId={lessonId! && lessonId![0]}
        finished={finished}
      />
    </>
  )
}
