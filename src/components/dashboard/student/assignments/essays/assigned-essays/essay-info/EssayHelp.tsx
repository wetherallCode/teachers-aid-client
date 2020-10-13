import React, { FC } from 'react'
import {
  EssayInfoTitle,
  EssayInfoBody,
  EssaySectionOrganizationBodyEntry,
} from '../state-and-styles/essayInfoStyles'
import { useStudentEssayContextProvider } from '../state-and-styles/StudentEssayContext'

export type EssayHelpProps = {}

export const EssayHelp: FC<EssayHelpProps> = () => {
  const [state] = useStudentEssayContextProvider()
  console.log()
  return (
    <>
      <EssayInfoTitle>Help with Your Essay</EssayInfoTitle>
      <EssayInfoBody>
        {state.matches('organizers.developingOrganizer.identifications') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Why Questions: Why is the reason something happened.
              {/* ; Ending: For a
              certain reason. */}
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              How Questions: How is the way something changed something or the
              way a problem was solved.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The subject of a sentence is the person, place or thing (Noun)
              that is doing something or being something. Example: Robert threw
              the ball. Robert is the subject.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The verb is the thing the subject is doing or being. In the
              example, threw is the verb (the ball is the object of the verb).
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.developingOrganizer.restatement') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              To restate a question take off the question word (How or Why) and
              the word ‘did’ if it is in the question.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              Change the verb to past tense. Usually the -ed ending but double
              check on google if -ed ending doesn’t sound correct.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              Now add a phrase to the end of your restatement that matches the
              question word.
              <ul>
                <li>Why questions will end 'for a certain reason.'</li>
                <li>How questions will end 'in a certain way.'</li>
              </ul>
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.developingOrganizer.answer') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Do your best to answer the question in a way that fits the
              question type.
              <ul>
                <li>
                  How questions want to know the way problems are solved or the
                  way things affect or change other things.
                </li>
                <li>
                  Why questions want to know what caused this to happen (What
                  were the reasons this happened).
                </li>
              </ul>
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.developingOrganizer.conclusion') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Think of a consequence of the restatement. What was a consequence
              of the subject’s actions, or the way that subject was being.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              Do not use “That is how the subject did what they did…” as a
              conclusion because that just restates the restatement.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.restatement') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              The subject of a sentence is the person, place or thing (Noun)
              that is doing something or being something. Example: Robert threw
              the ball. Robert is the subject.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The verb is the thing the subject is doing or being. In the
              example, threw is the verb.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The Direct Object of the Verb is what receives the verb's action.
              In the example: the ball is the object of the verb. A simple test
              to find a direct object, ask "What did the subject verb?" If there
              is a person, place, thing, or idea, then that is the direct
              object. If the words "on, to, with, in," or another preposition
              comes before the object, then there is no direct object.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.answer.questionType') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic QuestionType
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              Academic Restatement
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.problemSolution'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic Problem Solution
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.whyCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic whyCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.howCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic howCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.conclusion') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Academic Conclusion
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.advancedOrganizer.restatement') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced Restatement
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.advancedOrganizer.answer.questionType') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced QuestionType
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.advancedOrganizer.answer.problemSolution'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced Problem Solution
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.advancedOrganizer.answer.whyCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced whyCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.advancedOrganizer.answer.howCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced howCauseEffect
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.advancedOrganizer.conclusion') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Advanced Conclusion
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('workingDraft') && (
          <ul>
            {state.context.writingLevel === 'DEVELOPING' && (
              <>
                <EssaySectionOrganizationBodyEntry>
                  Use the organizer on the left to put your ideas into a
                  paragraph that has the three parts of your essay: a
                  restatement, answer, and conclusion.
                </EssaySectionOrganizationBodyEntry>
                <EssaySectionOrganizationBodyEntry>
                  Do your best to proofread to catch and mistakes and do your
                  best.
                </EssaySectionOrganizationBodyEntry>
              </>
            )}
            {state.context.writingLevel === 'ACADEMIC' && (
              <EssaySectionOrganizationBodyEntry>
                Academic Rubric Help
              </EssaySectionOrganizationBodyEntry>
            )}
            {state.context.writingLevel === 'ADVANCED' && (
              <EssaySectionOrganizationBodyEntry>
                Advanced Rubric Help
              </EssaySectionOrganizationBodyEntry>
            )}
          </ul>
        )}
      </EssayInfoBody>
    </>
  )
}
