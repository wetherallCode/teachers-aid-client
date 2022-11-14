import React, { FC } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  findLessonStatus_findLessonStatus_lesson,
} from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonDetailsContainer,
  LessonDetailCenter,
  LessonDetailLeft,
  LessonMainScreen,
} from '../state-n-styles/lessonStyles'

export type LessonDetailsProps = {
  lesson: findLessonStatus_findLessonStatus_lesson
}

export const LessonDetails = ({ lesson }: LessonDetailsProps) => {
  const multiPageSection =
    lesson.pageNumbers.endingPage !== lesson.pageNumbers.startingPage
  return (
    <>
      <LessonComponentTitleContainer>
        <div>Daily Agenda</div>
      </LessonComponentTitleContainer>
      <LessonDetailsContainer>
        {/* <LessonDetailCenter>
          Lesson Name: {lesson.lessonName}
        </LessonDetailCenter> */}
        <LessonDetailCenter>
          Today's Section: Page{multiPageSection && 's'}{' '}
          {lesson.pageNumbers.startingPage}
          {multiPageSection
            ? ' - ' + lesson.pageNumbers.endingPage
            : null}: {lesson.assignedSections.startingSection}
          {lesson.assignedSections.endingSection !==
            lesson.assignedSections.startingSection &&
            ' - ' + lesson.assignedSections.endingSection}
        </LessonDetailCenter>
        <LessonDetailCenter>
          Essential Question: {lesson.essentialQuestion}
        </LessonDetailCenter>

        {lesson.lessonType === 'INTRODUCTORY' && (
          <>
            <LessonDetailCenter
              style={{ fontSize: '3vh', textDecoration: 'underline' }}
            >
              Text Analysis Instructions
            </LessonDetailCenter>
            <ol style={{ margin: 0, fontSize: '3vh' }}>
              <li>Read each paragraph in the assigned section.</li>
              <li>After each paragraph:</li>
              <ol>
                <li>Number the paragraph.</li>
                <li>Underline the actions and questions if there are any.</li>
                <li>
                  Put question marks next to things you don't understand.{' '}
                </li>
                <li>Circle words you don't know.</li>
                <li>
                  Write Main Ideas based on the text structure that each
                  paragraph presented. Use the help section if needed.
                </li>
              </ol>
              <li>Answer the essential question.</li>
            </ol>
          </>
        )}
      </LessonDetailsContainer>
    </>
  )
}
