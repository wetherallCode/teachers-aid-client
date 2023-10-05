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
  | 'SOLUTIONS_REACTIONS'
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
    directions: '',
  },
  {
    questionType: 'WHAT_WAS_LEARNED',
    question: 'What was the most important thing this lesson had to teach you?',
    directions: '',
  },
  {
    questionType: 'MAIN_IDEA',
    question:
      'In one or two sentences, what was the main idea of the readings?',
    directions: '',
  },
  {
    questionType: 'SUBJECT_OF_SECTION',
    question:
      'Who are the readings about? Your answer can be individuals or groups of people or things if the text does not discuss people. Write as many as you think are important.',
    directions: '',
  },
  {
    questionType: 'WHAT_DID_SUBJECT_DO',
    question: 'What did the person/people you wrote in the last answer do?',
    directions: '',
  },
  {
    questionType: 'WHY_DID_SUBJECT_DO_IT',
    question: 'Why did they do what they did?',
    directions: '',
  },
  {
    questionType: 'HOW_DID_SUBJECT_DO_IT',
    question: 'How did they do it?',
    directions: '',
  },
  {
    questionType: 'PROBLEM',
    question: 'What problem is being faced by the main characters?',
    directions: '',
  },
  {
    questionType: 'WHY_PROBLEM',
    question: 'What caused this problem to happen?',
    directions: '',
  },
  {
    questionType: 'SOLUTION',
    question:
      "How was the problem being faced solved? If the reading doesn't show  how they solved it, figure out a way the problem could have been solved.",
    directions: '',
  },
  {
    questionType: 'SOLUTIONS_REACTIONS',
    question:
      "What was the reaction to the solution? If the reading doesn't show the reaction, what logical reactions do you expect to happen (be as specific as you can)?",
    directions: '',
  },
  {
    questionType: 'ASSUMPTIONS',
    question:
      'What assumptions are the main characters in the reading making in their solution? If you came up with the solution, what assumptions are you using in your solution?',
    directions: '',
  },
]
