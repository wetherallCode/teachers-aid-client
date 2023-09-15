import React from 'react'
import { LessonTypeEnum } from '../../../../../schemaTypes'
import { phraseCapitalizer } from '../../../../../utils'
import { MarkLessonForSGO } from './MarkLessonForSGO'
import { useLessonFinderContextProvider } from './state-n-styles/LessonFinderContext'
import { LessonPlanSectionTitles } from './state-n-styles/lessonFinderStyles'

export type LessonDetailsProps = {}

export const LessonDetails = ({}: LessonDetailsProps) => {
  const [state, event] = useLessonFinderContextProvider()
  const {
    lessonName,
    essentialQuestion,
    beforeActivity,
    pageNumbers,
    assignedSections,
    afterActivity,
    duringActivities,
    questionList,
    lessonType,
    assignedSectionIdList,
  } = state.context.lesson!

  const readings =
    pageNumbers.endingPage !== pageNumbers.startingPage
      ? pageNumbers.startingPage + ' - ' + pageNumbers.endingPage
      : pageNumbers.startingPage

  const lessonTitle =
    assignedSections.startingSection + ' - ' + assignedSections.endingSection
  console.log(assignedSectionIdList)
  return (
    <>
      <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
      <LessonPlanSectionTitles>
        {state.context.lesson && (
          <>
            <div>{lessonTitle}</div>
            <div>{phraseCapitalizer(lessonType)} Lesson</div>
          </>
        )}
      </LessonPlanSectionTitles>
      <div>
        <div>Grouping: individual/whole</div>{' '}
        <div>Depth of Knowledge: Levels 3 </div>
        <br />
        <LessonPlanSectionTitles>Essential Question</LessonPlanSectionTitles>
        <div>{essentialQuestion}</div>
        <br />
        <LessonPlanSectionTitles>
          Activating Strategy
        </LessonPlanSectionTitles>{' '}
        {lessonType === 'INTRODUCTORY' ? (
          <div>
            Students will start off with a quiz to determine the level of
            content aquisition each student achieved.
          </div>
        ) : (
          <>
            <div>
              Students will start with a critical thinking question or be asked
              to think of questions to ask to engage student's thinking about
              the lesson.
            </div>
            <ul>
              <li>Task: {beforeActivity.task}</li>
            </ul>
          </>
        )}
        <br />
        <LessonPlanSectionTitles>Teaching Strategy</LessonPlanSectionTitles>
        <div>
          Read Page {readings}: {lessonTitle}
        </div>
        {lessonType === 'INTRODUCTORY' ? (
          <div>
            Students will work individually on annotating text and finding the
            main ideas presented in the material in the aforementioned sections.
            The main ideas and annotations will be used as a way to
            independently introduce themselves to the text and prepare for going
            in depth for the next day's lesson.
          </div>
        ) : (
          <div>
            Students will read a paragraph and respond to a critical thinking
            question that will help them strengthen their schemas, have them
            think logically, ask them to evaluate decisions made in the past, or
            think of possible consequences to the actions of the people we
            discuss with a brief class dicussion for most paragraphs in the
            reading.
          </div>
        )}
        <br />
        {lessonType === 'INTRODUCTORY' ? (
          <LessonPlanSectionTitles></LessonPlanSectionTitles>
        ) : (
          <>
            <LessonPlanSectionTitles>
              Deep Thinking Questions
            </LessonPlanSectionTitles>
            <ul>
              {duringActivities.map((question, i: number) => (
                <li key={i}>{question.task}</li>
              ))}
            </ul>
          </>
        )}
        <br />
        <LessonPlanSectionTitles>
          Summarization Strategy
        </LessonPlanSectionTitles>
        {lessonType === 'INTRODUCTORY' ? (
          <div>
            Students will take the information they've learned in class and use
            their text and notes to complete a reading guide. If time runs short
            the reading guide can be completed at home.
          </div>
        ) : (
          <>
            <div>Exit ticket</div>
            <ul>
              <li>
                Students will respond to a prompt that will ask them to
                summarize what was covered in the lesson.
              </li>
            </ul>
          </>
        )}
        <br />
        <LessonPlanSectionTitles>Modifications</LessonPlanSectionTitles>
        <div>
          Every student will get a chance to read, write, think, and discuss.
          For visual learners there will be a chance to read everyday. For audio
          learners there will be a chance to be read aloud and have discussion.
          For tactile learners, there are graphic organizers to aid them in
          constructing their writing.
        </div>
      </div>
      <MarkLessonForSGO sectionIds={assignedSectionIdList} />
    </>
  )
}
