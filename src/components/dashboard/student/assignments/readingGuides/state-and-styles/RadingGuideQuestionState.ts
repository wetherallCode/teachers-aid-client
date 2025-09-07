export type ReadingGuideQuestionState =
  | 'SUMMARY'
  | 'WHY_DID_IT_HAPPEN'
  | 'SUBJECT_OF_SECTION'
  | 'SUBJECTS_GOALS'
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
    question: 'Overall, what is happening in the assigned reading sections?',
    directions: `Don't get to specific, what is the big thing that happened?`,
  },
  {
    questionType: 'WHY_DID_IT_HAPPEN',
    question: 'Why did that happen?',
    directions:
      'This question is based on the your answer to the last question.',
  },
  {
    questionType: 'SUBJECT_OF_SECTION',
    question: 'List the main characters involved in these sections.',
    directions:
      'There will be individuals, groups (like Congress, or Southerners, or even states), so list the ones that do the most.',
  },
  {
    questionType: 'SUBJECTS_GOALS',
    question: 'What were the goals of the people involved in these sections?',
    directions:
      'There will probably be mulitple people, so list the goals of at least two if there are multiple people',
  },
  {
    questionType: 'PROBLEM',
    question: 'What problem did these people face in these sections?',
    directions: `Every section in the text discusses a problem or conflict.`,
  },
  {
    questionType: 'SOLUTION',
    question: `How did the people in the text try to solve the problem`,
    directions: `Sometimes solutions don't work so focus on what they did to try to solve there problem.`,
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
