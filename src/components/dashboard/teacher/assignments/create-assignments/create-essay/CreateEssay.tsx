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
  findLessonById_findLessonById_lesson,
} from '../../../../../../schemaTypes'
import { useCheckBox } from '../../../../../../hooks/useCheckBox'
import {
  dateConverter,
  dateInputConverter,
  phraseCapitalizer,
  sortByLetter,
} from '../../../../../../utils'
import {
  AddQuestionForm,
  AddQuestionLevelSelect,
  AddQuestionSelect,
  AddQuestionTitle,
  CoursesCheckBoxContainer,
  DateAssignContainer,
  DateAssignInput,
  DateAssignItemContainer,
  DateAssignSelect,
  DisplayedQuestions,
  DisplayedQuestionWritingLevelContainer,
  EssayInformationSelectContainer,
  GeneralInput,
  LessonInformationSelectContainer,
  LinkCoursesContainer,
  LinkCoursesHeader,
  MaxPointSelectorContainer,
  Question,
  QuestionSelectContainer,
  QuestionSelector,
  SelectButton,
  SelectButtonContainer,
  SelectedQuestionContainer,
  SelectedQuestionsDisplay,
  SelectedQuestionTitle,
  SelectorTitle,
  WritingLevelTitleContainer,
} from '../state-and-styles/createAssignmentsStyles'
import CheckBox from '../../../../../reusable-components/CheckBox'
import { DueDateCheck } from './DueDateCheck'

export type CreateEssayProps = {
  me: me_me_Teacher
  courseIdList: string[]
  courseId: string
  lesson: findLessonById_findLessonById_lesson
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

export const CreateEssay = ({
  me,
  courseIdList,
  courseId,
  lesson,
}: CreateEssayProps) => {
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
        assignedCourseId: [courseId],
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
    onCompleted: () => event({ type: 'READING_GUIDE' }),
    onError: (error) => console.error(error),
    refetchQueries: [],
  })
  const courses = me.teachesCourses.slice(1).sort(sortByLetter)

  const selectedDevelopingEssays = state.context.essay.topicList.filter(
    (essay) => essay.writingLevel === 'DEVELOPING'
  )
  const selectedAcademicEssays = state.context.essay.topicList.filter(
    (essay) => essay.writingLevel === 'ACADEMIC'
  )
  const selectedAdvancedEssays = state.context.essay.topicList.filter(
    (essay) => essay.writingLevel === 'ADVANCED'
  )

  return (
    <LessonInformationSelectContainer>
      {courseId && <DueDateCheck lessonId={lesson._id!} courseId={courseId} />}
      <EssayInformationSelectContainer>
        <SelectorTitle>Create Essay</SelectorTitle>
        <DateAssignContainer>
          <DateAssignItemContainer>
            <div>Assigned Date: </div>
            <DateAssignInput
              type='date'
              value={dateInputConverter(state.context.essay.assignedDate)}
              onChange={(e: any) =>
                event({
                  type: 'SET_ASSIGNED_DATE',
                  payload: dateConverter(e.target.value),
                })
              }
            />
          </DateAssignItemContainer>
          <DateAssignItemContainer>
            <div>Due Date: </div>
            <DateAssignInput
              type='date'
              value={
                state.context.essay.dueDate
                  ? dateInputConverter(state.context.essay.dueDate)
                  : ''
              }
              onChange={(e: any) =>
                event({
                  type: 'SET_DUE_DATE',
                  payload: dateConverter(e.target.value),
                })
              }
            />
          </DateAssignItemContainer>
          <DateAssignItemContainer>
            <div>Time: </div>
            <DateAssignSelect
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
            </DateAssignSelect>
          </DateAssignItemContainer>
          <DateAssignItemContainer>
            <div>Marking Period</div>
            <DateAssignSelect
              value={state.context.essay.markingPeriod}
              onChange={(e: any) =>
                event({ type: 'SET_MARKING_PERIOD', payload: e.target.value })
              }
            >
              {markingPeriodEnum.map((mp: MarkingPeriodEnum) => (
                <option key={mp} value={mp}>
                  {phraseCapitalizer(mp)}
                </option>
              ))}
            </DateAssignSelect>
          </DateAssignItemContainer>
        </DateAssignContainer>
        <QuestionSelectContainer>
          <QuestionSelector>
            <MaxPointSelectorContainer>
              <div>Max Points</div>
              <GeneralInput
                type='text'
                value={state.context.essay.maxPoints}
                onChange={(e: any) =>
                  event({
                    type: 'SET_MAX_POINTS',
                    payload: Number(e.target.value),
                  })
                }
              />
            </MaxPointSelectorContainer>
            <AddQuestionForm
              onSubmit={(e: any) => {
                e.preventDefault()
              }}
            >
              <AddQuestionTitle>Add a Question</AddQuestionTitle>
              <AddQuestionSelect
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
              </AddQuestionSelect>
              <AddQuestionLevelSelect
                onChange={(e: any) =>
                  setTopicQuestion({
                    ...topicQuestion,
                    writingLevel: e.target.value,
                  })
                }
              >
                <option value={undefined}>Pick a Level</option>
                {writingLevelEnum.map((type: string) => (
                  <option key={type!} value={type}>
                    {phraseCapitalizer(type)}
                  </option>
                ))}
              </AddQuestionLevelSelect>
              <SelectButton
                style={{ fontSize: '2vh', height: '65%' }}
                type='reset'
                onClick={() =>
                  event({
                    type: 'SET_TOPIC_QUESTION_LIST',
                    payload: topicQuestion,
                  })
                }
              >
                Select Question
              </SelectButton>
            </AddQuestionForm>
          </QuestionSelector>
          <SelectedQuestionContainer>
            <SelectedQuestionTitle>
              <div>Selected Questions</div>
            </SelectedQuestionTitle>
            <SelectedQuestionsDisplay>
              <DisplayedQuestionWritingLevelContainer>
                <WritingLevelTitleContainer bottom={false}>
                  Developing
                </WritingLevelTitleContainer>
                <DisplayedQuestions bottom={false}>
                  {selectedDevelopingEssays.map((question, i: number) => (
                    <Question
                      key={i}
                      onClick={() => {
                        const topicIndex = state.context.essay.topicList.findIndex(
                          (topic) => topic.question === question.question
                        )

                        event({
                          type: 'DELETE_TOPIC_QUESTION',
                          payload: topicIndex,
                        })
                      }}
                    >
                      {question.question}
                    </Question>
                  ))}
                </DisplayedQuestions>
              </DisplayedQuestionWritingLevelContainer>
              <DisplayedQuestionWritingLevelContainer>
                <WritingLevelTitleContainer bottom={false}>
                  Academic
                </WritingLevelTitleContainer>
                <DisplayedQuestions bottom={false}>
                  {selectedAcademicEssays.map((question, i: number) => (
                    <Question
                      key={i}
                      onClick={() => {
                        const topicIndex = state.context.essay.topicList.findIndex(
                          (topic) => topic.question === question.question
                        )

                        event({
                          type: 'DELETE_TOPIC_QUESTION',
                          payload: topicIndex,
                        })
                      }}
                    >
                      {question.question}
                    </Question>
                  ))}
                </DisplayedQuestions>
              </DisplayedQuestionWritingLevelContainer>
              <DisplayedQuestionWritingLevelContainer>
                <WritingLevelTitleContainer bottom={true}>
                  Advanced
                </WritingLevelTitleContainer>
                <DisplayedQuestions bottom={true}>
                  {selectedAdvancedEssays.map((question, i: number) => (
                    <Question
                      key={i}
                      onClick={() => {
                        const topicIndex = state.context.essay.topicList.findIndex(
                          (topic) => topic.question === question.question
                        )

                        event({
                          type: 'DELETE_TOPIC_QUESTION',
                          payload: topicIndex,
                        })
                      }}
                    >
                      {question.question}
                    </Question>
                  ))}
                </DisplayedQuestions>
              </DisplayedQuestionWritingLevelContainer>
            </SelectedQuestionsDisplay>
          </SelectedQuestionContainer>
        </QuestionSelectContainer>
        <LinkCoursesContainer>
          <LinkCoursesHeader>Add or Delete Linked Courses</LinkCoursesHeader>
          <CoursesCheckBoxContainer>
            {courses.map((course) => (
              <CheckBox
                checked={assignedCourseIds.includes(course._id)}
                onChange={handleChange}
                value={course._id}
                label={course.name}
                key={course._id}
              />
            ))}
          </CoursesCheckBoxContainer>
        </LinkCoursesContainer>
      </EssayInformationSelectContainer>
      {!data ? (
        <SelectButtonContainer>
          <SelectButton onClick={() => event({ type: 'ESSAY_LESSON' })}>
            Pick Different Lesson
          </SelectButton>
          <SelectButton
            style={
              called
                ? { backgroundColor: 'var(--grey)', color: 'var(--blue)' }
                : { backgroundColor: 'var(--blue)', color: 'var(--white)' }
            }
            onClick={() => {
              if (
                assignedCourseIds.includes(courseId) &&
                state.context.essay.dueDate &&
                !called
              )
                createEssay()
            }}
          >
            {assignedCourseIds.includes(courseId) && state.context.essay.dueDate
              ? 'Create Essays'
              : 'Complete Form'}
          </SelectButton>
        </SelectButtonContainer>
      ) : (
        data && <div>Finished</div>
      )}
    </LessonInformationSelectContainer>
  )
}
