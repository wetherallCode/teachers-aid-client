import React, { FC, useEffect } from 'react'
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
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const LessonDetails = ({ lesson, setPolling }: LessonDetailsProps) => {
  const multiPageSection =
    lesson.pageNumbers.endingPage !== lesson.pageNumbers.startingPage
  useEffect(() => {
    setPolling(2000)
  })
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
        <br />
        <div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '2.5vh',
              textDecoration: 'underline',
            }}
          >
            Today's Activities
          </div>
        </div>

        {lesson.lessonType === 'INTRODUCTORY' ? (
          <>
            <LessonDetailCenter style={{ fontSize: '3vh' }}>
              Questioning and Thinking Practice
            </LessonDetailCenter>
            <div
              style={{
                textAlign: 'center',
                fontSize: '2.5vh',
              }}
            >
              Instructions
            </div>

            <ol style={{ margin: 0, fontSize: '2.5vh' }}>
              <li>
                Number each paragraph before reading. Indentations start new
                paragraphs.
              </li>

              <li>Read each paragraph in the assigned section.</li>

              <li>After each paragraph: </li>
              <ol>
                <li>
                  Underline all the actions that happen and all questions in the
                  paragraph if there are any.
                </li>
                <li>Put question marks next to things you don't understand.</li>
                <li>
                  Circle words you don't know and use the vocab to assist you.
                </li>
                <li>
                  Write Main Ideas based on the text structure that each
                  paragraph presented. Use the help section if needed.
                </li>
                <li>
                  Main ideas need to be finished at home if we run out of time
                  in class and should be used to answer reading guide/essay
                  questions.
                </li>
              </ol>
              {/* <li>Answer the essential question.</li> */}
            </ol>
          </>
        ) : (
          <>
            <LessonDetailCenter style={{ fontSize: '3vh' }}>
              Questioning and Thinking Practice
            </LessonDetailCenter>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              Instructions
            </div>

            <ol style={{ margin: 0, fontSize: '2.5vh' }}>
              <li>
                Today we will reinforce what we analyzed last time by thinking
                in multiple ways and answering and asking questions to help
                understand the content at a deeper level. You will need your
                Daily Agenda from last time.
              </li>
              <br />
              <li>
                Be prepared to work with your partners to discuss answers to
                questions.
              </li>
              <br />
              <li>
                All answers submitted on the website must be your version of the
                answer not a word for word copy of your partners work.
              </li>
              <br />
              <li>
                Be prepared to answer questions I ask you at random for bonus
                points.
              </li>
              <br />
              <li>Feel free to ask questions for bonus points.</li>
            </ol>
          </>
        )}
      </LessonDetailsContainer>
    </>
  )
}
