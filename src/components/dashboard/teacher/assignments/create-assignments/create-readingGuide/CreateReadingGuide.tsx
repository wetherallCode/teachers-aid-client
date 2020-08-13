import React, { FC } from 'react'
import {
  me_me_Teacher,
  createReadingGuideVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createReadingGuide,
  TimeOfDay,
  MarkingPeriodEnum,
} from '../../../../../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { useCreateAssignmentContextPovider } from '../CreateAssignmentContext'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useCheckBox } from '../../../../../../hooks/useCheckBox'
import { dateConverter } from '../../../../../../utils'

export type CreateReadingGuideProps = {
  me: me_me_Teacher
  courseIdList: string[]
}

export const CREATE_READING_GUIDE_MUTATION = gql`
  mutation createReadingGuide($input: CreateReadingGuideInput!) {
    createReadingGuide(input: $input) {
      readingGuides {
        _id
      }
    }
  }
`

export const CreateReadingGuide: FC<CreateReadingGuideProps> = ({
  me,
  courseIdList,
}) => {
  const [state, event] = useCreateAssignmentContextPovider()
  const { markingPeriodEnum, timeOfDayEnum } = useEnumContextProvider()
  const [assignedCourseIds, handleChange] = useCheckBox(courseIdList)

  const [createReadingGuide] = useMutation<
    createReadingGuide,
    createReadingGuideVariables
  >(CREATE_READING_GUIDE_MUTATION, {
    variables: {
      input: {
        assignedCourseIds: assignedCourseIds,
        assignedDate: state.context.readingGuide.assignedDate,
        associatedLessonId: state.context.readingGuide.lesson,
        dueDate: state.context.readingGuide.dueDate,
        dueTime: state.context.readingGuide.dueTime,
        hasAssignerId: me._id!,
        markingPeriod: state.context.readingGuide.markingPeriod,
        maxPoints: state.context.readingGuide.maxPoints,
        readings: state.context.readingGuide.readings,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })

  return (
    <>
      <div>Create Reading Guide</div>
      <span>Assigned Date: </span>
      <span>
        <input
          type='date'
          onChange={(e: any) => {
            event({
              type: 'SET_READING_GUIDE_ASSIGNED_DATE',
              payload: dateConverter(e.target.value),
            })
          }}
        />
      </span>
      <span>Due Date: </span>
      <span>
        <input
          type='date'
          onChange={(e: any) =>
            event({
              type: 'SET_READING_GUIDE_DUE_DATE',
              payload: dateConverter(e.target.value),
            })
          }
        />
      </span>
      <span>Time: </span>
      <select
        value={state.context.readingGuide.dueTime}
        onChange={(e: any) => {
          event({
            type: 'SET_READING_GUIDE_DUE_TIME',
            payload: e.target.value,
          })
        }}
      >
        {timeOfDayEnum.map((time: TimeOfDay) => (
          <option key={time!} value={time!}>
            {time === 'BEFORE_SCHOOL'
              ? 'Before School'
              : time === 'BEFORE_CLASS'
              ? 'Before Class'
              : time === 'AFTER_CLASS'
              ? 'After Class'
              : 'After School'}
          </option>
        ))}
      </select>
      <div>Marking Period</div>
      <select
        value={state.context.readingGuide.markingPeriod}
        onChange={(e: any) =>
          event({
            type: 'SET_READING_GUIDE_MARKING_PERIOD',
            payload: e.target.value,
          })
        }
      >
        {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
          <option key={mp} value={mp}>
            {mp === 'FIRST'
              ? 'First'
              : mp === 'SECOND'
              ? 'Second'
              : mp === 'THIRD'
              ? 'Third'
              : 'Fourth'}
          </option>
        ))}
      </select>
      <span>Max Points</span>
      <span>
        <input
          type='text'
          value={state.context.readingGuide.maxPoints}
          onChange={(e: any) =>
            event({
              type: 'SET_READING_GUIDE_MAX_POINTS',
              payload: Number(e.target.value),
            })
          }
        />
      </span>
      <div>Add or Delete Linked Courses</div>
      {me.teachesCourses.map((course) => (
        <div key={course._id!}>
          <input
            type='checkbox'
            checked={assignedCourseIds.includes(course._id)}
            onChange={handleChange}
            value={course._id!}
          />
          <span>{course.name}</span>
        </div>
      ))}
      <button
        onClick={() => {
          if (
            assignedCourseIds.includes(state.context.courseId) &&
            state.context.readingGuide.dueDate
          )
            createReadingGuide()
        }}
      >
        {assignedCourseIds.includes(state.context.courseId) &&
        state.context.readingGuide.dueDate
          ? 'Create Reading Guides'
          : 'Complete Form'}
      </button>
    </>
  )
}
