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
  return (
    <>
      <LessonComponentTitleContainer>
        <div>Lesson Details</div>
      </LessonComponentTitleContainer>
      <LessonDetailsContainer>
        {/* <LessonDetailCenter>
          Lesson Name: {lesson.lessonName}
        </LessonDetailCenter> */}
        <LessonDetailCenter>
          Read page {lesson.pageNumbers.startingPage}-
          {lesson.pageNumbers.endingPage}:{' '}
          {lesson.assignedSections.startingSection}
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
              Reading Instructions
            </LessonDetailCenter>
            <ol style={{ margin: 0 }}>
              <li>Read the assigned sections.</li>
              <li>
                Reread the assigned sections and underline the important
                information.
              </li>
              <li>Put checkmarks next to things you understand.</li>
              <li>Put question marks next to things you don't understand.</li>
              <li>Answer the essential question.</li>
            </ol>
          </>
        )}
      </LessonDetailsContainer>
    </>
  )
}
