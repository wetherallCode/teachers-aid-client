import React, { FC, useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useCreateAssignmentContextPovider } from '../CreateAssignmentContext'
import { dateConverter } from '../../../../../../utils'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  WritingLevelEnum,
  TopicInput,
  QuestionTypeEnum,
  createEssayVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createEssay,
  me_me_Teacher,
} from '../../../../../../schemaTypes'
import { useCheckBox } from '../../../../../../hooks/useCheckBox'

export type CreateEssayProps = {
  me: me_me_Teacher
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

export const CreateEssay: FC<CreateEssayProps> = ({ me }) => {
  const [state, event] = useCreateAssignmentContextPovider()
  console.log(state.context.essay.dueTime)
  const { writingLevel } = useEnumContextProvider()
  const [topicQuestion, setTopicQuestion] = useState<TopicInput>({
    question: '',
    questionType: QuestionTypeEnum.WHY_CAUSE_EFFECT,
    writingLevel: WritingLevelEnum.DEVELOPING,
  })
  const [assignedCourseIds, handleChange] = useCheckBox()

  useEffect(() => {
    event({ type: 'SET_LINKED_COURSES_IDS', payload: assignedCourseIds })
  }, [assignedCourseIds, event])

  const [createEssay] = useMutation<createEssay, createEssayVariables>(
    CREATE_ESSAY_MUTATION,
    {
      variables: {
        input: {
          topicList: state.context.essay.topicList,
          assignedCourseId: state.context.assignedCourseId,
          assignedDate: state.context.essay.assignedDate,
          dueDate: state.context.essay.dueDate,
          dueTime: state.context.essay.dueTime.toString(),
          associatedLessonId: state.context.essay.lesson,
          hasAssignerId: state.context.hasAssignerId,
          markingPeriod: state.context.essay.markingPeriod,
          maxPoints: 5,
          readings: state.context.essay.readings,
        },
      },
      onCompleted: (data) => console.log(data),
      onError: (error) => console.error(error),
      refetchQueries: [],
    }
  )

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
      <input
        type='time'
        onChange={(e: any) =>
          event({
            type: 'SET_DUE_TIME',
            payload: e.target.value,
          })
        }
      />
      <span>Max Points</span>
      <span>
        <input
          type='text'
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
          {writingLevel.map((type: string) => (
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
            checked={
              state.context.assignedCourseId.some(
                (courseId) => courseId === course._id
              )
                ? true
                : false
            }
            onChange={handleChange}
            value={course._id!}
          />
          <span>{course.name}</span>
        </div>
      ))}
      <button onClick={() => createEssay()}>Create Essay</button>
    </>
  )
}
