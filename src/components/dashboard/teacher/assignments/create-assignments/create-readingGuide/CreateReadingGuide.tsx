import React, { Dispatch, SetStateAction } from 'react'
import {
  me_me_Teacher,
  createReadingGuideVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createReadingGuide,
  TimeOfDay,
  MarkingPeriodEnum,
  findLessonById_findLessonById_lesson,
  checkQuizQuestionsForTextSections,
  checkQuizQuestionsForTextSectionsVariables,
} from '../../../../../../schemaTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useCheckBox } from '../../../../../../hooks/useCheckBox'
import {
  dateConverter,
  dateInputConverter,
  phraseCapitalizer,
  sortByLetter,
} from '../../../../../../utils'
import {
  CoursesCheckBoxContainer,
  DateAssignContainer,
  DateAssignInput,
  DateAssignItemContainer,
  DateAssignSelect,
  GeneralInput,
  LessonInformationSelectContainer,
  LinkCoursesContainer,
  LinkCoursesHeader,
  MaxPointSelectorContainer,
  MaxPointsForReadingGuideContainer,
  QuestionSelector,
  ReadingGuideInformationSelectContainer,
  SelectButton,
  SelectButtonContainer,
  SelectorTitle,
} from '../state-and-styles/createAssignmentsStyles'
import { useNavigate } from 'react-router'
import CheckBox from '../../../../../reusable-components/CheckBox'
import { AssignedDateCheck } from './AssignedDateCheck'

export type CreateReadingGuideProps = {
  me: me_me_Teacher
  courseIdList: string[]
  courseId: string
  setCourseId: Dispatch<SetStateAction<string>>
  lesson: findLessonById_findLessonById_lesson
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
export const CHECK_QUIZ_QUESTIONS_QUERY = gql`
  query checkQuizQuestionsForTextSections(
    $input: CheckQuizQuestionsForTextSectionsInput!
  ) {
    checkQuizQuestionsForTextSections(input: $input) {
      textSectionIds
    }
  }
`
export const CreateReadingGuide = ({
  me,
  courseIdList,
  courseId,
  lesson,
  setCourseId,
}: CreateReadingGuideProps) => {
  const [state, event] = useCreateAssignmentContextPovider()
  const { markingPeriodEnum, timeOfDayEnum } = useEnumContextProvider()
  const [assignedCourseIds, handleChange] = useCheckBox([courseId])
  const navigate = useNavigate()

  const courses = me.teachesCourses
    .slice(0)
    .sort(sortByLetter)
    .filter((c) => c.name !== 'Unenrolled')

  const [currentCourseInfo] = me.teachesCourses.filter(
    (course) => course._id === courseId
  )

  const sortedCourses = me.teachesCourses.slice(2)
  console.log()
  const currentCourseIndex = sortedCourses.findIndex(
    (course) => course._id === courseId
  )

  const { loading, data: quizQuestionIdData } = useQuery<
    checkQuizQuestionsForTextSections,
    checkQuizQuestionsForTextSectionsVariables
  >(CHECK_QUIZ_QUESTIONS_QUERY, {
    variables: {
      input: { textSectionIds: lesson.assignedSectionIdList },
    },
    onCompleted: (data) =>
      event({
        type: 'SET_READING_GUIDE_MAX_POINTS',
        payload: data.checkQuizQuestionsForTextSections.textSectionIds.length,
      }),
    onError: (error) => console.error(error),
  })

  const [createReadingGuide, { data, called }] = useMutation<
    createReadingGuide,
    createReadingGuideVariables
  >(CREATE_READING_GUIDE_MUTATION, {
    variables: {
      input: {
        assignedCourseIds: [courseId],
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
    onCompleted: (data) => {
      if (sortedCourses[currentCourseIndex + 1]) {
        setCourseId(sortedCourses[currentCourseIndex + 1]._id!)
        event({ type: 'IDLE' })
      } else navigate('/dashboard')
    },
    refetchQueries: [],
  })

  return (
    <LessonInformationSelectContainer>
      <AssignedDateCheck courseId={courseId} lessonId={lesson._id!} />
      <ReadingGuideInformationSelectContainer>
        <SelectorTitle>
          <div style={{ textAlign: 'center' }}>Create Reading Guide</div>
          <div>
            {lesson.assignedSections.startingSection}-
            {lesson.assignedSections.endingSection}
          </div>
        </SelectorTitle>
        <DateAssignContainer>
          <DateAssignItemContainer>
            <div>Assigned Date: </div>
            <DateAssignInput
              type='date'
              value={dateInputConverter(
                state.context.readingGuide.assignedDate
              )}
              onChange={(e: any) => {
                event({
                  type: 'SET_READING_GUIDE_ASSIGNED_DATE',
                  payload: dateConverter(e.target.value),
                })
              }}
            />
          </DateAssignItemContainer>

          <DateAssignItemContainer>
            <div>Due Date: </div>
            <DateAssignInput
              type='date'
              value={dateInputConverter(state.context.readingGuide.dueDate)}
              onChange={(e: any) => {
                event({
                  type: 'SET_READING_GUIDE_DUE_DATE',
                  payload: dateConverter(e.target.value),
                })
              }}
            />
          </DateAssignItemContainer>

          <DateAssignItemContainer>
            <div>Time: </div>
            <DateAssignSelect
              value={state.context.readingGuide.dueTime}
              onChange={(e: any) => {
                event({
                  type: 'SET_READING_GUIDE_DUE_TIME',
                  payload: e.target.value,
                })
              }}
            >
              {timeOfDayEnum.map((time: TimeOfDay) => {
                return (
                  <option key={time!} value={time!}>
                    {time === 'BEFORE_SCHOOL'
                      ? 'Before School'
                      : time === 'BEFORE_CLASS'
                      ? 'Before Class'
                      : time === 'END_OF_CLASS'
                      ? 'After Class'
                      : 'After School'}
                  </option>
                )
              })}
            </DateAssignSelect>
          </DateAssignItemContainer>
          <DateAssignItemContainer>
            <div>Marking Period</div>
            <DateAssignSelect
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
                  {phraseCapitalizer(mp)}
                </option>
              ))}
            </DateAssignSelect>
          </DateAssignItemContainer>
        </DateAssignContainer>
        <MaxPointsForReadingGuideContainer>
          <QuestionSelector>
            <MaxPointSelectorContainer>
              <div>Max Points</div>
              <GeneralInput
                type='text'
                value={
                  loading ? 'loading' : state.context.readingGuide.maxPoints
                }
                onChange={(e: any) =>
                  // quizQuestionIdData?.checkQuizQuestionsForTextSections.textSectionIds.length
                  event({
                    type: 'SET_READING_GUIDE_MAX_POINTS',
                    payload: Number(e.target.value),
                  })
                }
              />
            </MaxPointSelectorContainer>
          </QuestionSelector>
        </MaxPointsForReadingGuideContainer>
        <LinkCoursesContainer>
          <LinkCoursesHeader>Add or Delete Linked Courses</LinkCoursesHeader>
          <CoursesCheckBoxContainer>
            {courses.map((course) => (
              <CheckBox
                key={course._id}
                checked={assignedCourseIds.includes(course._id)}
                onChange={handleChange}
                value={course._id!}
                label={course.name}
                labelWidth={40}
                boxHeight={10}
                boxWidth={10}
              />
            ))}
          </CoursesCheckBoxContainer>
        </LinkCoursesContainer>
      </ReadingGuideInformationSelectContainer>
      {!data ? (
        <SelectButtonContainer>
          <SelectButton onClick={() => event({ type: 'PREVIOUS' })}>
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
                state.context.readingGuide.dueDate &&
                !called
              )
                createReadingGuide()
            }}
          >
            {assignedCourseIds.includes(courseId) &&
            state.context.readingGuide.dueDate
              ? 'Create Reading Guide'
              : 'Complete Form'}
          </SelectButton>
        </SelectButtonContainer>
      ) : (
        data && <div>Finished</div>
      )}
    </LessonInformationSelectContainer>
  )
}
