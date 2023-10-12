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
        <div>Grouping: Small Groups & Whole Class</div>
        <ul>
          <li>
            Small groups are grouped by students participation to match students
            who aren't normal participators with students who are more likely to
            participate.
          </li>
        </ul>
        <div>Depth of Knowledge: Levels 2 and 3</div>
        <br />
        <LessonPlanSectionTitles>Essential Question</LessonPlanSectionTitles>
        <div>{essentialQuestion}</div>
        <br />
        <LessonPlanSectionTitles>
          Activating Strategy
        </LessonPlanSectionTitles>{' '}
        {lessonType === 'INTRODUCTORY' ? (
          <div>
            <div>
              Students will start off with a quiz to determine the level of
              content aquisition each student achieved.
            </div>
            <div>Students will complete a SEL Check in on PBIS</div>
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
              <div>Students will complete a SEL Check in on PBIS</div>
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
            {' '}
            <div>
              Students will work in small groups to annotate text and find the
              main ideas presented in the material in the aforementioned
              sections. The main ideas and annotations will be used as a way to
              introduce themselves to the text and prepare for going in depth
              for the next day's lesson. Students will use
              https://mrwetherall.org as a reference for the lesson material and
              for directions.
            </div>
            <div>
              Students will be earning PBIS points throughout class based on the
              standards set by the administation.
            </div>
          </div>
        ) : (
          <div>
            <div>
              Students will work in small groups to read a paragraph and respond
              to a critical thinking question that will help them strengthen
              their schemas, have them think logically, ask them to evaluate
              decisions made in the past, or think of possible consequences to
              the actions of the people we discuss with a brief group dicussion
              for most paragraphs in the reading.
            </div>
            <div>
              Students will be earning PBIS points throughout class based on the
              standards set by the administation.
            </div>
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
            <div>
              Students will use https://mrwetherall.org to complete their deep
              thinking questions
            </div>
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
