import React from 'react'
import {
  ContentContainerTitle,
  DisplayTitle,
  IndividualContentContainer,
  TripleSidedContentContainer,
} from './handbookStyles'

export type GradingProps = {}

export const Grading = ({}: GradingProps) => {
  return (
    <>
      <DisplayTitle>Grading Policy</DisplayTitle>
      <TripleSidedContentContainer style={{ fontSize: '2vh' }}>
        <IndividualContentContainer>
          <ContentContainerTitle>Achievement Grades</ContentContainerTitle>
          <ul style={{ textAlign: 'center' }}>
            Open Ended Paragraph Responses (AKA Essays)
          </ul>
          <ul>
            <li>50% of your overall grade.</li>
            <br />
            <li>
              These are test grades because these are your tests. I will show
              you how to complete them and they will be given every other class
              for the most part.
            </li>
            <br />
            <li>They will be completed and submitted on this website.</li>
            <br />
            <li>
              Most will be done for homeowork, but a few will be done in class.
            </li>
            <br />
            <li>They are not as hard as you think.</li>
          </ul>
        </IndividualContentContainer>
        <IndividualContentContainer>
          <ContentContainerTitle>Processes Grades</ContentContainerTitle>
          <ul style={{ textAlign: 'center' }}>Reading Guides and Quizzes</ul>
          <ul>
            <li>
              Reading Guides will need to be completed before you start the
              essay.
            </li>
            <br />
            <li>
              Quizzes will be given at the beginning of an Introductory Lesson
              and won't take more than 5 minutes.
            </li>
            <ul>
              <li>
                They are set up to be shorter if you get the questions right and
                longer if you get the questions wrong.
              </li>
            </ul>
            <br />
            <li>
              Reading Guides and Quizzes will be averaged together to get your
              Processes grade (40%).
            </li>
            <br />
          </ul>
        </IndividualContentContainer>
        <IndividualContentContainer>
          <ContentContainerTitle>Practices Grades</ContentContainerTitle>
          <ul style={{ textAlign: 'center' }}>Responsibility Points</ul>
          <ul>
            <li>
              You will get 100 points at the beginning of each marking period.
              That will equal 10 points of your final grade.
            </li>
            <br />
            <li>
              You will earn points by doing what you are supposed to be doing.
              Like completing assignments, being prepared for class, answering
              questions when called on, etc. Refusing to try or not doing what
              is asked of you can lose you points. (See "Behavior" for more
              info)
            </li>
            <br />
            <li>
              For every 10 responsibility points you earn 1 grade point extra
              credit as long as your over 100 points. You should be adding as
              many points to your overall grade as you can because this is the
              only extra credit that I offer.
            </li>
          </ul>
        </IndividualContentContainer>
      </TripleSidedContentContainer>
    </>
  )
}
