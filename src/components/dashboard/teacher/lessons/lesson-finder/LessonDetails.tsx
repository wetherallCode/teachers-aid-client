import React, { FC } from 'react'
import { useLessonFinderContextProvider } from './state-n-styles/LessonFinderContext'
import { LessonPlanSectionTitles } from './state-n-styles/lessonFinderStyles'

export type LessonDetailsProps = {}

export const LessonDetails: FC<LessonDetailsProps> = () => {
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
  } = state.context.lesson!

  const readings =
    pageNumbers.endingPage !== pageNumbers.startingPage
      ? pageNumbers.startingPage + ' - ' + pageNumbers.endingPage
      : pageNumbers.startingPage

  const lessonTitle =
    assignedSections.startingSection + ' - ' + assignedSections.endingSection

  return (
    <>
      <button onClick={() => event({ type: 'PREVIOUS' })}>Back</button>
      <LessonPlanSectionTitles>
        {state.context.lesson && <div>{lessonTitle}</div>}
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
        <div>
          Students will start with a critical thinking question or be asked to
          think of questions to ask to engage student's thinking about the
          lesson.
        </div>
        <ul>
          <li>Task: {beforeActivity.task}</li>
        </ul>
        <br />
        <LessonPlanSectionTitles>Teaching Strategy</LessonPlanSectionTitles>
        <div>
          Read Page {readings}: {lessonTitle}
        </div>
        <div>
          Students will read a paragraph and respond to a critical thinking
          question that will help them strengthen their schemas, have them think
          logically, ask them to evaluate decisions made in the past, or think
          of possible consequences to the actions of the people we discuss with
          a brief class dicussion for most paragraphs in the reading.
        </div>
        <br />
        <LessonPlanSectionTitles>
          Deep Thinking Questions
        </LessonPlanSectionTitles>
        <ul>
          {duringActivities.map((question, i: number) => (
            <li key={i}>{question.task}</li>
          ))}
        </ul>
        <br />
        <LessonPlanSectionTitles>
          Summarization Strategy
        </LessonPlanSectionTitles>
        <div>Exit ticket</div>
        <ul>
          {/* {questionList.map((question, i: number) => (
            <li key={i}>{question.question}</li>
          ))} */}
          <li>{afterActivity.task}</li>
        </ul>
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
    </>
  )
}
