import React, { FC } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findLessonsByUnit,
  findLessonsByUnitVariables,
} from '../../../../../../schemaTypes'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import {
  ItemSelectorContainer,
  LessonInformationSelectContainer,
  SelectableItem,
  SelectButton,
  SelectButtonContainer,
  SelectorContainer,
  SelectorTitle,
} from '../state-and-styles/createAssignmentsStyles'

export type EssayLessonSelectProps = {
  courseId: string
}

export const FIND_LESSONS_BY_UNIT_QUERY = gql`
  query findLessonsByUnit($input: FindLessonsByUnitInput!) {
    findLessonsByUnit(input: $input) {
      lessons {
        _id
        lessonName
        assignedDate
        lessonType
      }
    }
  }
`

export const EssayLessonSelect: FC<EssayLessonSelectProps> = ({ courseId }) => {
  const [state, event] = useCreateAssignmentContextPovider()

  const { loading, data } = useQuery<
    findLessonsByUnit,
    findLessonsByUnitVariables
  >(FIND_LESSONS_BY_UNIT_QUERY, {
    variables: {
      input: {
        unitId: state.context.essay.unit,
        courseId,
      },
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <LessonInformationSelectContainer>
      <SelectorContainer>
        <SelectorTitle>Select Lesson</SelectorTitle>
        <ItemSelectorContainer>
          {data?.findLessonsByUnit.lessons
            .filter((lesson) => lesson.lessonType === 'REINFORCEMENT')
            .map((lesson) => (
              <SelectableItem
                key={lesson._id!}
                onClick={() => {
                  event({ type: 'SET_LESSON', payload: lesson._id! })
                  event({
                    type: 'SET_ASSIGNED_DATE',
                    payload: lesson.assignedDate!,
                  })
                  event({ type: 'ESSAY_INFO' })
                }}
              >
                {lesson.lessonName}
              </SelectableItem>
            ))}
        </ItemSelectorContainer>
      </SelectorContainer>
      <SelectButtonContainer>
        <SelectButton onClick={() => event({ type: 'ESSAY_UNIT' })}>
          Choose Different Unit
        </SelectButton>
      </SelectButtonContainer>
    </LessonInformationSelectContainer>
  )
}
