import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findReadingGuidesByCourseIdAndAssignedDate,
  findReadingGuidesByCourseIdAndAssignedDateVariables,
} from '../../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'
import {
  AssignmentBlockContainer,
  TextStyle,
} from '../../../styles/mainScreenStyles'
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
          firstName
          lastName
        }
        assigned
        exempt
        graded
        dueDate
        associatedLessonId
        readings {
          readingPages
          readingSections
        }
        readingGuideFinal {
          problems
          biggestProblem
          importantPeople
          howArePeopleInvolvedInProblems
          reasonForBiggestProblem
          sectionConsequences
        }
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
        courseId: state.context.courseInfo!.course._id!,
        assignedDate: new Date().toLocaleDateString(),
      },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const dueDate =
    data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides!.map(
      (rg) => rg.dueDate
    )
  const lessonId =
    data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides!.map(
      (rg) => rg.associatedLessonId
    ) as string[]
  const studentIds =
    data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides.map(
      (rg) => rg.hasOwner._id
    ) as string[]
  const finished =
    data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides
      .map((rg) => rg.assigned === true)
      .includes(true)!
  const assignmentTitle =
    data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides.map(
      (rg) => rg.readings
    )!
  return (
    <AssignmentBlockContainer>
      {data?.findReadingGuidesByCourseIdAndAssignedDate.readingGuides.length! >
      0 ? (
        <>
          <TextStyle>Assign Todays Reading Guide</TextStyle>
          <br />
          <div>
            {assignmentTitle[0].readingPages}:{' '}
            {assignmentTitle[0].readingSections}
          </div>
          <br />
          <AssignReadingGuideForTeachersAid
            studentIds={studentIds}
            dueDate={dueDate! && dueDate![0]}
            lessonId={lessonId! && lessonId![0]}
            finished={finished}
            loading={loading}
          />
        </>
      ) : (
        <>
          {loading ? (
            <div>Loading</div>
          ) : (
            <TextStyle>No Reading Guide Assigned Today</TextStyle>
          )}
        </>
      )}
    </AssignmentBlockContainer>
  )
}
