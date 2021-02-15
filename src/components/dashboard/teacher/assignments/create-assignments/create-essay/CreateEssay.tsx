import React, { FC, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'

import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  WritingLevelEnum,
  TopicInput,
  QuestionTypeEnum,
  createEssayVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createEssay,
  me_me_Teacher,
  TimeOfDay,
  MarkingPeriodEnum,
} from '../../../../../../schemaTypes'
import { useCheckBox } from '../../../../../../hooks/useCheckBox'
import { dateConverter } from '../../../../../../utils'

export type CreateEssayProps = {
  me: me_me_Teacher
  courseIdList: string[]
}

export const CREATE_ESSAY_MUTATION = gql`
  mutation createEssay($input: CreateEssayInput!) {
    createEssay(input: $input) {
      essays {
        _id
      }
    }
  }
`

export const CreateEssay: FC<CreateEssayProps> = ({ me, courseIdList }) => {
  const [state, event] = useCreateAssignmentContextPovider()

  const {
    writingLevelEnum,
    markingPeriodEnum,
    timeOfDayEnum,
  } = useEnumContextProvider()

  const [topicQuestion, setTopicQuestion] = useState<TopicInput>({
    question: '',
    questionType: QuestionTypeEnum.WHY_CAUSE_EFFECT,
    writingLevel: WritingLevelEnum.DEVELOPING,
  })
  const [assignedCourseIds, handleChange] = useCheckBox(courseIdList)

  const [createEssay, { called, data }] = useMutation<
    createEssay,
    createEssayVariables
  >(CREATE_ESSAY_MUTATION, {
    variables: {
      input: {
        topicList: state.context.essay.topicList,
        assignedCourseId: [state.context.courseId],
        assignedDate: state.context.essay.assignedDate,
        dueDate: state.context.essay.dueDate,
        dueTime: state.context.essay.dueTime,
        associatedLessonId: state.context.essay.lesson,
        hasAssignerId: state.context.hasAssignerId,
        markingPeriod: state.context.essay.markingPeriod,
        maxPoints: 5,
        readings: state.context.essay.readings,
      },
    },
    onCompleted: (data) => {},
    onError: (error) => console.error(error),
    refetchQueries: [],
  })

  return (
    <>
      <div>Create Essay</div>
      <span>Assigned Date: </span>
      <span>
        <input
          type='date'
          onChange={(e: any) =>
            event({
              type: 'SET_ASSIGNED_DATE',
              payload: dateConverter(e.target.value),
            })
          }
        />
      </span>
      <span>Due Date: </span>
      <span>
        <input
          type='date'
          onChange={(e: any) =>
            event({
              type: 'SET_DUE_DATE',
              payload: dateConverter(e.target.value),
            })
          }
        />
      </span>
      <span>Time: </span>
      <select
        value={state.context.essay.dueTime}
        onChange={(e: any) =>
          event({
            type: 'SET_DUE_TIME',
            payload: e.target.value,
          })
        }
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
        value={state.context.essay.markingPeriod}
        onChange={(e: any) =>
          event({ type: 'SET_MARKING_PERIOD', payload: e.target.value })
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
          value={state.context.essay.maxPoints}
          onChange={(e: any) =>
            event({ type: 'SET_MAX_POINTS', payload: Number(e.target.value) })
          }
        />
      </span>
      <div>Add a Question</div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
        }}
      >
        <select
          onChange={(e: any) => {
            const arr = e.target.value.split(',')
            setTopicQuestion({
              ...topicQuestion,
              question: arr[0],
              questionType: arr[1],
            })
          }}
        >
          <option value={undefined}>Pick a Question</option>
          {state.context.essay.questionList.map((question) => (
            <option
              key={question.question!}
              value={[question.question, question.questionType]}
            >
              {question.question}
            </option>
          ))}
        </select>
        <select
          name=''
          onChange={(e: any) =>
            setTopicQuestion({ ...topicQuestion, writingLevel: e.target.value })
          }
        >
          <option value={undefined}>Pick a Level</option>
          {writingLevelEnum.map((type: string) => (
            <option key={type!} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          type='reset'
          onClick={() =>
            event({ type: 'SET_TOPIC_QUESTION_LIST', payload: topicQuestion })
          }
        >
          Select Question
        </button>
      </form>
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
      {!data ? (
        <button
          style={
            called
              ? { backgroundColor: 'var(--grey)', color: 'var(--blue)' }
              : { backgroundColor: 'var(--blue)', color: 'var(--white)' }
          }
          onClick={() => {
            if (
              assignedCourseIds.includes(state.context.courseId) &&
              state.context.essay.dueDate &&
              !called
            )
              createEssay()
          }}
        >
          {assignedCourseIds.includes(state.context.courseId) &&
          state.context.essay.dueDate
            ? 'Create Essays'
            : 'Complete Form'}
        </button>
      ) : (
        data && <div>Finished</div>
      )}
    </>
  )
}
