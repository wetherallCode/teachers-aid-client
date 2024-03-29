export type ReadingGuideQuestionState =
  | 'SUMMARY'
  | 'WHAT_WAS_LEARNED'
  | 'MAIN_IDEA'
  | 'SUBJECT_OF_SECTION'
  | 'WHAT_DID_SUBJECT_DO'
  | 'HOW_DID_SUBJECT_DO_IT'
  | 'WHY_DID_SUBJECT_DO_IT'
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
    question:
      'Write a brief summary of what happened in the assigned sections?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'WHAT_WAS_LEARNED',
    question: 'What was the most important thing this lesson had to teach you?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'MAIN_IDEA',
    question:
      'In one or two sentences, what was the main idea of the readings?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'SUBJECT_OF_SECTION',
    question:
      'Who are the readings about? Your answer can be individuals or groups of people or things if the text does not discuss people. Write as many as you think are important.',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'WHAT_DID_SUBJECT_DO',
    question: 'What did the person/people you wrote in the last answer do?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'WHY_DID_SUBJECT_DO_IT',
    question: 'Why did they do it?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'HOW_DID_SUBJECT_DO_IT',
    question: 'How did they do it?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'PROBLEM',
    question: 'What problem is being faced by the people in the readings?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'WHY_PROBLEM',
    question: 'What caused this problem to happen?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'SOLUTION',
    question:
      "How was the problem solved, or did they attempt to solve it? If the reading doesn't show  how they solved it, figure out a way the problem could have been solved.",
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'SOLUTIONS_REASON',
    question: 'Why did/would the solution solve the problem',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
  {
    questionType: 'ASSUMPTIONS',
    question:
      'What assumptions are the main characters in the reading making in their solution? If you came up with the solution, what assumptions are you using in your solution?',
    directions:
      'Only use the assigned readings. Use of google will result in partial or no credit.',
  },
]
