import React, { FC, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  findLessonByIdForLessonEditor,
  findLessonByIdForLessonEditorVariables,
} from '../../../../../schemaTypes'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { updateLessonType } from './LessonEditor'
import { AssignedDate } from './AssignedDate'
import { InUnit } from './InUnit'
import { MarkingPeriod } from './MarkingPeriod'
import { SetSections } from './SetSections'
import { ActivitiesEditor } from './ActivitiesEditor'
import { CourseLink } from './CourseLink'

export type LessonEditorInfoProps = {
  updateLesson: updateLessonType
}

export const FIND_LESSON_FOR_LESSON_EDITOR_QUERY = gql`
  query findLessonByIdForLessonEditor($input: FindLessonByIdInput!) {
    findLessonById(input: $input) {
      lesson {
        _id
        assignedDate
        inUnit {
          _id
          unitName
        }
        assignedMarkingPeriod
        assignedCourse {
          _id
          period
        }
        linkedCourseIds
        assignedSections {
          startingSection
          endingSection
        }
        pageNumbers {
          startingPage
          endingPage
        }
        assignedSectionIdList
        vocabList {
          word
          definition
        }
        beforeActivity {
          academicOutcomeTypes
          activityType
          task
        }
        duringActivities {
          academicOutcomeTypes
          activityType
          task
        }
        afterActivity {
          academicOutcomeTypes
          activityType
          task
        }
        questionList {
          question
          questionType
        }
        essentialQuestion
        lessonName
      }
    }
    MarkingPeriod: __type(name: "MarkingPeriodEnum") {
      enumValues {
        name
      }
    }
  }
`

export const LessonEditorInfo: FC<LessonEditorInfoProps> = ({
  updateLesson,
}) => {
  const [state, event] = useLessonEditorContextProvider()

  useEffect(() => {
    updateLesson()
  }, [state.context, updateLesson])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, error, data } = useQuery<
    findLessonByIdForLessonEditor,
    findLessonByIdForLessonEditorVariables
  >(FIND_LESSON_FOR_LESSON_EDITOR_QUERY, {
    variables: {
      input: { _id: state.context.lessonId },
    },
    onCompleted: (data) => {
      const {
        assignedDate,
        lessonName,
        inUnit,
        assignedMarkingPeriod,
        assignedSectionIdList,
        linkedCourseIds,
        assignedSections,
        vocabList,
        beforeActivity,
        duringActivities,
        afterActivity,
        questionList,
        essentialQuestion,
        pageNumbers,
      } = data.findLessonById.lesson
      event({ type: 'SET_ASSIGNED_DATE', payload: assignedDate })
      event({ type: 'SET_LESSON_NAME', payload: lessonName })
      event({ type: 'SET_UNIT', payload: inUnit._id! })
      event({ type: 'SET_MARKING_PERIOD', payload: assignedMarkingPeriod })
      event({ type: 'SET_SECTION_ID_LIST', payload: assignedSectionIdList })
      event({
        type: 'SET_STARTING_SECTION',
        payload: assignedSections.startingSection,
      })
      event({
        type: 'SET_ENDING_SECTION',
        payload: assignedSections.endingSection,
      })
      event({ type: 'SET_STARTING_PAGE', payload: pageNumbers.startingPage })
      event({ type: 'SET_ENDING_PAGE', payload: pageNumbers.endingPage })
      event({ type: 'ASSIGN_TO_COURSES', payload: linkedCourseIds })
      const modifiedVocabList = vocabList.map((word) => ({
        word: word.word,
        definition: word.definition,
      }))
      event({ type: 'SET_VOCAB_LIST', payload: modifiedVocabList })

      const modifiedBeforeActivity = {
        academicOutcomeTypes: beforeActivity.academicOutcomeTypes,
        activityType: beforeActivity.activityType,
        task: beforeActivity.task,
      }
      event({ type: 'SET_BEFORE_ACTIVITY', payload: modifiedBeforeActivity })
      const modifiedDuringActivity = duringActivities.map((activity) => ({
        academicOutcomeTypes: activity.academicOutcomeTypes,
        activityType: activity.activityType,
        task: activity.task,
      }))
      event({ type: 'SET_DURING_ACTIVITY', payload: modifiedDuringActivity })
      const modifiedAfterActivity = {
        academicOutcomeTypes: afterActivity.academicOutcomeTypes,
        activityType: afterActivity.activityType,
        task: afterActivity.task,
      }
      event({ type: 'SET_AFTER_ACTIVITY', payload: modifiedAfterActivity })
      const modifiedQuestionList = questionList.map((question) => ({
        question: question.question,
        questionType: question.questionType,
      }))
      event({ type: 'SET_QUESTION_LIST', payload: modifiedQuestionList })
      event({ type: 'SET_ESSENTIAL_QUESTION', payload: essentialQuestion })
    },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)
  console.log(data?.findLessonById.lesson.linkedCourseIds)
  const markingPeriodList = data?.MarkingPeriod?.enumValues

  return (
    <>
      <button onClick={() => event({ type: 'PREVIOUS' })}>Previous</button>
      {state.matches('editor.info') && (
        <>
          <div>Lesson Plan</div>
          <AssignedDate
            date={data?.findLessonById.lesson.assignedDate}
            updateLesson={updateLesson}
          />
          <InUnit
            unit={data?.findLessonById.lesson.inUnit!}
            updateLesson={updateLesson}
          />
          <MarkingPeriod
            markingPeriodList={markingPeriodList?.map((value) => value.name)!}
          />
        </>
      )}
      <button onClick={() => event({ type: 'SECTION_SELECT' })}>
        Add/Delete Sections
      </button>
      {state.matches('editor.sectionSelect') && (
        <SetSections updateLesson={updateLesson} />
      )}
      <ActivitiesEditor />
      <CourseLink />
    </>
  )
}
