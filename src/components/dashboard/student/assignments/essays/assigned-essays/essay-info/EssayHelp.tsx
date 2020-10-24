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
              to find a direct object, ask "What did the (subject) (verb)?" If
              there is a person, place, thing, or idea, then that is the direct
              object. If the words "on, to, with, in," or another preposition
              comes before the object, then there is no direct object.
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
              If you didn't fill in the subject, verb, and object, go back or
              else this section won't make sense.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              All How: Problem and Solution Questions need to give a complete
              explanation of the problem and then a complete explanation of the
              solution. To do this, answer each of these questions with
              paraphrased answers found in the text.
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
              If you didn't fill in the subject, verb, and object, go back or
              else this section won't make sense.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The proximate cause is the direct reason something happened. So
              think of the thing that happened to make the (subject) (verb)
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The ultimate cause is the reason the proximate cause happened. Its
              the big picture reason. For example: "Why did you make a
              sandwich?" The proximate cause is: I was hungry. To find the
              ultimate cause ask "Why was I hungry?". The answer is I haven't
              eaten in 6 hours. That's how I want you to think about why
              questions.
            </EssaySectionOrganizationBodyEntry>
          </ul>
        )}
        {state.matches(
          'organizers.academicOrganizer.answer.howCauseEffect'
        ) && (
          <ul>
            <EssaySectionOrganizationBodyEntry>
              If you didn't fill in the subject, verb, and object, go back or
              else this section won't make sense.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              All How: Cause and Effect questions are basically asking you about
              how things/people affect or change other things or people.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              To answer completely you need to explain what the object of the
              verb was like before the subject of the question. This should only
              be one sentence to set up the answer.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              The second part of the answer needs to explain the way the object
              of the question was different because of subject of the question.
              This can be two sentences at the most.
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
              First, start the conclusion this way "As a result of (subject)
              (verb+ing) (object if one exists), " then you write the
              consequence. Be careful to add an ing ending to the verb and if no
              object of verb exists, then just put a comma after the verb.
            </EssaySectionOrganizationBodyEntry>
            <EssaySectionOrganizationBodyEntry>
              For example: "As a result of Robert throwing the ball, a glass
              window was broken."
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
                As always, start the essay with the restatement as your topic
                sentence, and end it with the conclusion, but the answer is
                going need more structure. Use the organizer as a guide to
                putting the answer together. Use transitions to connect your
                ideas and keep it as simple as you can while fully explaining
                the topic sentence.
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
