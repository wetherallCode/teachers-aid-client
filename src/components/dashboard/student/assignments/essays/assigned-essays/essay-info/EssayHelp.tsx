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
  console.log(state.context.academicOrganizer.restatement)
  return (
    <>
      <EssayInfoTitle>Help with Your Essay</EssayInfoTitle>
      <EssayInfoBody>
        {state.matches('organizers.developingOrganizer.identifications') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Writing the answer to this question is a process, and I want to
              help you by walking you through each step. Take your time and read
              the directions and the feedback to get better. The more you try
              the faster this gets.
            </EssaySectionOrganizationBodyEntry>
            {/* <EssaySectionOrganizationBodyEntry>
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
            </EssaySectionOrganizationBodyEntry> */}
          </ul>
        )}
        {state.matches('organizers.developingOrganizer.restatement') && (
          <ul>
            {/* <EssaySectionOrganizationBodyEntry>
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
            </EssaySectionOrganizationBodyEntry> */}
            <EssaySectionOrganizationBodyEntry>
              Follow the directions for each step to complete the restatement
              for your essay.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              If you get the answer wrong, please read the feedback section that
              pops up to help guide you to the correct answer.
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
              Keep your conclusion to one sentence.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              Sometimes the conclusion to the question you were asked is
              explained in the assigned section. However, sometimes you have to
              guess. If you guess, please explain that your guess could have
              happened.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              Do not use “That is how the subject did what they did…” as a
              conclusion because that just restates the restatement.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.identifications') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Writing the answer to this question is a process, and I want to
              help you by walking you through each step. Take your time and read
              the directions and the feedback to get better. The more you try
              the faster this gets.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.restatement') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Follow the directions for each step to complete the restatement
              for your essay.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              If you get the answer wrong, please read the feedback section that
              pops up to help guide you to the correct answer.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.answer.questionType') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              To find the Question Type:
              <ul>
                <EssaySectionOrganizationBodyEntry>
                  Look at the question word and use these directions to figure
                  it out
                </EssaySectionOrganizationBodyEntry>
                <EssaySectionOrganizationBodyEntry>
                  Why questions are always cause and effect so select Why: Cause
                  and Effect
                </EssaySectionOrganizationBodyEntry>
                <EssaySectionOrganizationBodyEntry>
                  How questions can be both, so look at the verb next.
                </EssaySectionOrganizationBodyEntry>
                <ul>
                  <EssaySectionOrganizationBodyEntry>
                    If the verb is a synonym for cause or effect (Affect,
                    Change, Evolve, Influence, Shape) it is How: Cause and
                    Effect
                  </EssaySectionOrganizationBodyEntry>
                  <EssaySectionOrganizationBodyEntry>
                    If the verb isn’t a synonym for cause or effect its problem
                    and solution so select How: Problem and Solution
                  </EssaySectionOrganizationBodyEntry>
                </ul>
              </ul>
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The rules to writing a topic sentence are the same, except the
              ending might change depending on the question type.
            </EssaySectionOrganizationBodyEntry>
            <ul>
              <EssaySectionOrganizationBodyEntry>
                If the question type is Why: Cause and Effect the ending will be
                "...for many reasons."
              </EssaySectionOrganizationBodyEntry>
              <EssaySectionOrganizationBodyEntry>
                If the question type is How: Cause and Effect the ending will be
                "...in certain way."
              </EssaySectionOrganizationBodyEntry>
              <EssaySectionOrganizationBodyEntry>
                If the question type is How: Problem and Solution the ending
                will be "...to solve a problem." unless the words problem and
                solution are already in the question then end "...in certain
                way."
              </EssaySectionOrganizationBodyEntry>
            </ul>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.problemSolution'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              Since the verb of the question
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              Some of the answers may actually come from earlier parts of the
              text that aren't covered in the assigned sections, but have been
              covered in our lessons already. Its ok to use this information as
              long as you are paraphrasing.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              When answering the questions on this page, be careful not to
              confuse how questions and why questions. How is asking for the
              way, and why is asking for the reason.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.whyCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              The proximate cause is the direct reason something happened. The
              answer to this will always be explained in the assigned sections
              of the text.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The ultimate cause is a little different than the proximate cause.
              To find the ultimate cause, figure out the reason your proximate
              cause happened. Think of it as links on a chain; events in the
              word are linked the same way.
            </EssaySectionOrganizationBodyEntry>{' '}
            <EssaySectionOrganizationBodyEntry>
              The ultimate cause may come from the assigned text, but it is also
              possible that it came before the assigned text, so its ok to read
              past sections we've already covered.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.howCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              All How: Cause and Effect questions are basically asking you about
              how things/people affect or change other things or people.
            </EssaySectionOrganizationBodyEntry>

            <EssaySectionOrganizationBodyEntry>
              You don't need to write in complete sentences. Keep it as simple
              as possible because these are just ideas to help you write the
              final answer.
            </EssaySectionOrganizationBodyEntry>

            <EssaySectionOrganizationBodyEntry>
              To answer completely you need to explain what the object of the
              verb was like before the subject of the question. This should only
              be one sentence to set up the answer.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The second part of the answer needs to explain the way the object
              of the question was different because of subject of the question.
              This can be two to three sentences at the most.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches('organizers.academicOrganizer.conclusion') && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              The conclusion is still going to need to be a consequence of the
              topic, but now I want you to set the consequence up in a certain
              way.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              For example: "As a result of Robert throwing the ball, a glass
              window was broken."
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The Conclusion should only be one sentence.
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
              <>
                <EssaySectionOrganizationBodyEntry>
                  As always, start the essay with the restatement as your topic
                  sentence, and end it with the conclusion, but the answer is
                  going need more structure.
                </EssaySectionOrganizationBodyEntry>
                <EssaySectionOrganizationBodyEntry>
                  Use the organizer as a guide to putting the answer together.
                  Use transitions to connect your ideas and keep it as simple as
                  you can while fully explaining the topic sentence.
                </EssaySectionOrganizationBodyEntry>
                <EssaySectionOrganizationBodyEntry>
                  Keep your essay to five to six sentences max.
                </EssaySectionOrganizationBodyEntry>
              </>
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
