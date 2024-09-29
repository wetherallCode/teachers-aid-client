import React, { FC, useEffect } from 'react'
import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  findLessonStatus_findLessonStatus_lesson,
  findParagraphCountByTextSectionId,
  findParagraphCountByTextSectionIdVariables,
} from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonDetailsContainer,
  LessonDetailCenter,
  LessonDetailLeft,
  LessonMainScreen,
  LessonInstrcutionContainer,
} from '../state-n-styles/lessonStyles'
import { gql, useQuery } from '@apollo/client'

export type LessonDetailsProps = {
  lesson: findLessonStatus_findLessonStatus_lesson
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const FIND_PARAGRAPH_NUMBERS_QUERY = gql`
  query findParagraphCountByTextSectionId(
    $input: FindParagraphCountByTextSectionIdInput!
  ) {
    findParagraphCountByTextSectionId(input: $input) {
      paragraphCount
    }
  }
`
export const LessonDetails = ({ lesson, setPolling }: LessonDetailsProps) => {
  const multiPageSection =
    lesson.pageNumbers.endingPage !== lesson.pageNumbers.startingPage
  useEffect(() => {
    setPolling(2000)
  })
  const { loading, data } = useQuery<
    findParagraphCountByTextSectionId,
    findParagraphCountByTextSectionIdVariables
  >(FIND_PARAGRAPH_NUMBERS_QUERY, {
    variables: {
      input: { sectionIds: lesson.assignedSectionIdList },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  return (
    <>
      <LessonComponentTitleContainer>
        <div
          style={{
            textAlign: 'center',
            fontSize: '6vh',
            textDecoration: 'underline',
          }}
        >
          Today's Lesson
        </div>
      </LessonComponentTitleContainer>
      <LessonDetailsContainer>
        <LessonDetailCenter>
          <div>
            <div
              style={{
                fontSize: '2vw',
                textAlign: 'center',
                textDecoration: 'underline',
              }}
            >
              Today's Section
            </div>{' '}
            Page{multiPageSection && 's'} {lesson.pageNumbers.startingPage}
            {multiPageSection
              ? ' - ' + lesson.pageNumbers.endingPage
              : null}: {lesson.assignedSections.startingSection}
            {lesson.assignedSections.endingSection !==
              lesson.assignedSections.startingSection &&
              ' - ' + lesson.assignedSections.endingSection}
          </div>
          <br />
          <div style={{ fontSize: '2vw', textAlign: 'center' }}>
            <div
              style={{
                fontSize: '2vw',
                textAlign: 'center',
                textDecoration: 'underline',
              }}
            >
              Number of Paragraphs
            </div>
            {loading ? (
              <div>Loading</div>
            ) : (
              <div style={{ fontSize: '3vw' }}>
                {data?.findParagraphCountByTextSectionId.paragraphCount}
              </div>
            )}
          </div>
        </LessonDetailCenter>
        <LessonDetailCenter style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '2vw',
              textAlign: 'center',
              textDecoration: 'underline',
            }}
          >
            Essential Question
          </div>{' '}
          <div> {lesson.essentialQuestion}</div>
        </LessonDetailCenter>
        <div>
          <div
            style={{
              textAlign: 'center',
              fontSize: '2vw',
              textDecoration: 'underline',
            }}
          >
            Today's Activities
          </div>
        </div>
        <div>
          {lesson.lessonType === 'INTRODUCTORY' ? (
            <LessonDetailCenter
              style={{ fontSize: '2vw', textAlign: 'center' }}
            >
              Text Analysis
            </LessonDetailCenter>
          ) : (
            <LessonDetailCenter
              style={{ fontSize: '2vw', textAlign: 'center' }}
            >
              Questioning and Thinking Practice
            </LessonDetailCenter>
          )}
        </div>
        {/* <div
          style={{
            textAlign: 'center',
            fontSize: '2vw',
            textDecoration: 'underline',
          }}
        >
          Homework
        </div>
        <LessonDetailCenter style={{ fontSize: '2vw', textAlign: 'center' }}>
          Essay
        </LessonDetailCenter>*/}
      </LessonDetailsContainer>
    </>
  )
}
