export type ReadingGuideQuestionState =
  | 'SUMMARY'
  | 'WHAT_WAS_LEARNED'
  | 'SUBJECT_OF_SECTION'
  | 'PROBLEM'
  | 'WHY_PROBLEM'
  | 'SOLUTION'
  | 'SOLUTIONS_REASON'
  | 'ASSUMPTIONS'

export type ReadingGuideQuestionObjectType = {
  questionType: ReadingGuideQuestionState
  question: string
  directions: string
}

export const readingGuideQuestions: ReadingGuideQuestionObjectType[] = [
  {
    questionType: 'SUMMARY',
    question: 'What stood out to you in the lesson?',
    directions:
      'Pick a main idea from the lesson that you found to be important, interesting, or surprising.',
  },
  {
    questionType: 'WHAT_WAS_LEARNED',
    question: 'Why did that piece of information stand out to you?',
    directions:
      'This question is based on the your answer to the last question.',
  },
  {
    questionType: 'SUBJECT_OF_SECTION',
    question:
      'Who (people or groups of people) were the most important people in these sections?',
    directions:
      'There may be multiple people, so pick who you think is most important. As you get used to this, try to figure out who caused or solved the biggest problem.',
  },
  {
    questionType: 'PROBLEM',
    question: 'What did these people do to solve their problems?',
    directions: `Every section in the text discusses a problem or conflict, so see everyone's actions as solutions to their problems.`,
  },
  {
    questionType: 'SOLUTION',
    question: `How was the problem solved, or how did they attempt to solve it?`,
    directions: `If the reading doesn't show how they solved it, figure out a way the problem could have been solved.`,
  },
  {
    questionType: 'WHY_PROBLEM',
    question: 'What caused this problem to happen?',
    directions: `This may go back before the assigned sections, so don't be scared to flip back a page or two`,
  },
  {
    questionType: 'SOLUTIONS_REASON',
    question: 'Why did/would the solution solve the problem',
    directions: `Sometimes our ideas don't work out, so many times you'll need to show why they thought their solution would work.`,
  },
  {
    questionType: 'ASSUMPTIONS',
    question:
      'What assumptions are the main characters in the reading making in their solution? If you came up with the solution, what assumptions are you using in your solution?',
    directions:
      'Everyone has to make guesses when they solve their problems. When they guess right - problem solved. When they guess wrong - problem not solved.',
  },
]
