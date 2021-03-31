import React, { Dispatch, FC, SetStateAction } from 'react'
import {
  me_me_Teacher,
  createReadingGuideVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createReadingGuide,
  TimeOfDay,
  MarkingPeriodEnum,
  findLessonById_findLessonById_lesson,
} from '../../../../../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import { useCheckBox } from '../../../../../../hooks/useCheckBox'
import { dateConverter, sortByLetter } from '../../../../../../utils'
import {
  CoursesCheckBoxContainer,
  DateAssignContainer,
  DateAssignInput,
  DateAssignItemContainer,
  DateAssignSelect,
  EssayInformationSelectContainer,
  GeneralInput,
  LessonInformationSelectContainer,
  LinkCoursesContainer,
  LinkCoursesHeader,
  MaxPointSelectorContainer,
  MaxPointsForReadingGuideContainer,
  QuestionSelectContainer,
  QuestionSelector,
  ReadingGuideInformationSelectContainer,
  SelectButton,
  SelectButtonContainer,
  SelectorTitle,
} from '../state-and-styles/createAssignmentsStyles'
import { useNavigate } from 'react-router'
import CheckBox from '../../../../../reusable-components/CheckBox'
import { AssignedDateCheck } from './AssignedDateCheck'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'

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

export const CreateReadingGuide: FC<CreateReadingGuideProps> = ({
  me,
  courseIdList,
  courseId,
  lesson,
  setCourseId,
}) => {
  const [state, event] = useCreateAssignmentContextPovider()
  const { markingPeriodEnum, timeOfDayEnum } = useEnumContextProvider()
  const [assignedCourseIds, handleChange] = useCheckBox(courseIdList)

  const courses = me.teachesCourses.slice(1).sort(sortByLetter)
  console.log(
    state.context.readingGuide.assignedDate,
    state.context.readingGuide.dueDate
  )
  const [currentCourseInfo] = me.teachesCourses.filter(
    (course) => course._id === courseId
  )
  const sortedCourses = me.teachesCourses
    .slice(1)
    .sort(sortByLetter)
    .filter(
      (course) => course.name.charAt(0) === currentCourseInfo.name.charAt(0)
    )
  const currentCourseIndex = sortedCourses.findIndex(
    (course) => course._id === courseId
  )
  console.log(
    sortedCourses[currentCourseIndex + 1]
      ? sortedCourses[currentCourseIndex + 1].name
      : 'end'
  )
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
        event({ type: 'ESSAY' })
      }
    },
    refetchQueries: [],
  })
  // console.log(
  //   new Date(state.context.readingGuide.dueDate).toISOString().slice(0, 10)
  // )

  return (
    <LessonInformationSelectContainer>
      <AssignedDateCheck courseId={courseId} lessonId={lesson._id!} />
      <ReadingGuideInformationSelectContainer>
        <SelectorTitle>Create Reading Guide</SelectorTitle>
        <DateAssignContainer>
          <DateAssignItemContainer>
            <div>Assigned Date: </div>
            <DateAssignInput
              type='date'
              // value={new Date(state.context.readingGuide.assignedDate)
              //   .toISOString()
              //   .slice(0, 10)}
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
              // value={new Date(state.context.readingGuide.dueDate)
              //   .toISOString()
              //   .slice(0, 10)}
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
                      : time === 'AFTER_CLASS'
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
                  {mp === 'FIRST'
                    ? 'First'
                    : mp === 'SECOND'
                    ? 'Second'
                    : mp === 'THIRD'
                    ? 'Third'
                    : 'Fourth'}
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
                value={state.context.readingGuide.maxPoints}
                onChange={(e: any) =>
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
              // <label key={course._id!} style={{ width: '40%' }}>
              //   <CheckBox
              //     checked={assignedCourseIds.includes(course._id)}
              //     onChange={handleChange}
              //     value={course._id!}
              //   />
              //   <span style={{ marginLeft: '1%' }}>{course.name}</span>
              // </label>
              <CheckBox
                key={course._id}
                checked={assignedCourseIds.includes(course._id)}
                onChange={handleChange}
                value={course._id!}
                label={course.name}
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
                assignedCourseIds.includes(state.context.courseId) &&
                state.context.essay.dueDate &&
                !called
              )
                createReadingGuide()
            }}
          >
            {assignedCourseIds.includes(state.context.courseId) &&
            state.context.essay.dueDate
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
