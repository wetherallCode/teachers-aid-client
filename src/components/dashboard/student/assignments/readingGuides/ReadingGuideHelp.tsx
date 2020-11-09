import React, { FC } from 'react'
import { useReadingGuideToCompleteContextProvider } from './state-and-styles/ReadingGuideToCompleteContext'
import {
  ReadingGuideInfoTitle,
  ReadingGuideInfoBody,
  SectionOrganizationBodyEntry,
  Required,
} from './state-and-styles/readingGuideStyles'
export type ReadingGuideHelpProps = {}

export const ReadingGuideHelp: FC<ReadingGuideHelpProps> = () => {
  const [state] = useReadingGuideToCompleteContextProvider()
  console.log(state.context.help)
  return (
    <>
      <ReadingGuideInfoTitle>Help with the Reading Guide</ReadingGuideInfoTitle>
      <ReadingGuideInfoBody>
        {state.context.help === 'general' && (
          <ul>
            <SectionOrganizationBodyEntry>
              Complete Reading Guide to the best of your ability. Answer the
              questions by reading through the assigned text, but if you don't
              know the answer, please give me your best guess.
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              To get full credit you need to complete every question/task that
              has a red asterisk <Required>*</Required>
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              If you need help understanding the question/task, click on the
              question to get help.
            </SectionOrganizationBodyEntry>
          </ul>
        )}
        {state.context.help === 'majorIssue' && (
          <ul>
            <SectionOrganizationBodyEntry>
              Read through the text to find the biggest problem or issue that
              the people are dealing with.
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              The problem or issue may have been introduced in earlier sections
              so don't worry if it isn't a brand new problem.
            </SectionOrganizationBodyEntry>
          </ul>
        )}
        {state.context.help === 'howIsSectionOrganized' && (
          <ul>
            <SectionOrganizationBodyEntry>
              Problem and solution shows a problem or a solution to a problem,
              or it shows a problem and a solution.
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              Cause and effect shows how situations happened because of
              something. Frequently, the author with use words like 'because' or
              'As a result'
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              Compare and Contrast shows the differences and/or similarities
              between people, situations, actions, etc...
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              Sequence shows the order of how things happened. Be careful this
              can be confused with cause and effect.
            </SectionOrganizationBodyEntry>
          </ul>
        )}
        {state.context.help === 'whyWasSectionOrganized' && (
          <ul>
            <SectionOrganizationBodyEntry>
              Just explain your thinking. What made you think it was one or more
              of the information structures listed in #1.
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              For example, you might have noticed key word like 'because' and
              picked cause and effect.
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              The more you write the better you'll get at understanding how
              information is structured.
            </SectionOrganizationBodyEntry>
          </ul>
        )}
        {state.context.help === 'majorSolution' && (
          <ul>
            {state.context.updateReadingGuideInputs.majorIssueSolved ? (
              <SectionOrganizationBodyEntry>
                How did the person or people solve the problem? What actions did
                they take?
              </SectionOrganizationBodyEntry>
            ) : (
              <>
                <SectionOrganizationBodyEntry>
                  Do your best to explain why the person or people couldn't
                  solve their problem?
                </SectionOrganizationBodyEntry>
                <br />
                <SectionOrganizationBodyEntry>
                  What did the guess wrong that led them to make mistakes?
                </SectionOrganizationBodyEntry>
              </>
            )}
          </ul>
        )}
        {state.context.help === 'clarifyingQuestions' && (
          <ul>
            <SectionOrganizationBodyEntry>
              What things could the author have made clearer to help you
              understand why people made the decisions they made?
            </SectionOrganizationBodyEntry>
            <br />
            <SectionOrganizationBodyEntry>
              The more questions you ask the better you will understand how to
              understand what you read. You learn best when you ask questions.
            </SectionOrganizationBodyEntry>
          </ul>
        )}
      </ReadingGuideInfoBody>
    </>
  )
}
