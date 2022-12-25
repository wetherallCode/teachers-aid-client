import { Machine, assign } from 'xstate'
import {
  RubricSectionEnum,
  RubricEntryInput,
  WritingLevelEnum,
  ReturnGradedEssayInput,
  ReturnedRubricEntryInput,
  SubmitReadingGuideInput,
} from '../../../../../../../schemaTypes'

export type paperBasedMachineSchema = {
  states: {
    loadAssignment: {}
    assignmentSelect: {
      states: {
        transition: {}
        essay: {}
        readingGuide: {}
      }
    }
  }
}
export type paperBasedMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_ASSIGNMENT_ID'; payload: string }
  | {
      type: 'SET_ASSIGNMENT_TYPE'
      payload:
        | 'ArticleReview'
        | 'Quiz'
        | 'Essay'
        | 'ReadingGuide'
        | 'SpecialAssignment'
        | 'TextAnalysis'
    }
  | {
      type: 'SET_ASSIGNMENT_INFO'
      payload: {
        student: { firstName: string; lastName: string }
        readings: { readingPages: number; readingSections: string }
      }
    }
  | { type: 'SET_LATE'; payload: boolean }
  // For Essays
  | {
      type: 'SET_INTITIAL_DRAFT'
      payload: ReturnGradedEssayInput
    }
  | { type: 'SET_DRAFT'; payload: ReturnGradedEssayInput }
  | { type: 'SET_DRAFT_SELECTOR'; payload: number }
  | { type: 'SET_DRAFT_NUMBER_TO_GRADE'; payload: number }
  | { type: 'SET_DRAFT_TO_RETURN'; payload: string }
  | { type: 'SET_CURRENT_RUBRIC_SECTION'; payload: RubricSectionEnum }
  | { type: 'SET_RUBRIC_ENTRY'; payload: RubricEntryInput }
  | { type: 'SET_RUBRIC_ENTRIES'; payload: ReturnedRubricEntryInput[] }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'SET_COMMENT'; payload: string }
  | { type: 'RESET_COMMENT' }
  | { type: 'ADD_ADDITIONAL_COMMENT'; payload: string }
  | { type: 'REMOVE_COMMENT'; payload: number }
  | { type: 'SET_READING_GUIDE_LATENESS'; payload: boolean }
  | { type: 'SET_READING_GUIDE_COMPLETION'; payload: boolean }

export type paperBasedMachineContext = {
  assignmentId: string
  assignmentType:
    | 'ArticleReview'
    | 'Quiz'
    | 'Essay'
    | 'ReadingGuide'
    | 'SpecialAssignment'
    | 'TextAnalysis'

  student: { firstName: string; lastName: string }
  readings: { readingPages: number; readingSections: string }
  isLate: boolean
  essay: {
    currentRubricSection: RubricSectionEnum
    rubricEntry: RubricEntryInput
    writingLevel: WritingLevelEnum
    draftSelector: number
    comment: string
    draftToGrade: ReturnGradedEssayInput
  }
  readingGuide: SubmitReadingGuideInput
}

export const paperBasedMachine = Machine<
  paperBasedMachineContext,
  paperBasedMachineSchema,
  paperBasedMachineEvent
>({
  id: 'paperBased',
  initial: 'loadAssignment',
  context: {
    assignmentId: '',
    assignmentType: 'Essay',
    student: {
      firstName: '',
      lastName: '',
    },
    readings: {
      readingPages: 0,
      readingSections: '',
    },
    isLate: false,
    essay: {
      draftToGrade: {
        _id: '',
        draftNumber: 0,
        gradingDraft: '',
        rubricEntries: [],
        additionalComments: [],
        score: 0,
      },
      draftSelector: 0,
      rubricEntry: {
        entry: '',
        rubricSection: RubricSectionEnum.OVERALL,
        rubricWritingLevels: [WritingLevelEnum.DEVELOPING],
        score: 0,
      },
      currentRubricSection: RubricSectionEnum.OVERALL,
      writingLevel: WritingLevelEnum.DEVELOPING,
      comment: '',
    },
    readingGuide: {
      late: true,
      paperBased: true,
      submitTime: new Date().toLocaleString(),
      readingGuideId: '',
      completeReadingGuide: true,
      responsibilityPoints: 10,
    },
  },
  states: {
    loadAssignment: {
      on: {
        NEXT: 'assignmentSelect',
        SET_ASSIGNMENT_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              assignmentId: evt.payload,
              readingGuide: {
                ...ctx.readingGuide,
                readingGuideId: evt.payload,
              },
            }
          }),
        },
        SET_ASSIGNMENT_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              assignmentType: evt.payload,
            }
          }),
        },
        SET_LATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              isLate: evt.payload,
            }
          }),
        },
      },
    },
    assignmentSelect: {
      initial: 'transition',
      states: {
        transition: {
          always: [
            {
              target: 'essay',
              cond: (ctx) => {
                return ctx.assignmentType === 'Essay'
              },
            },
            {
              target: 'readingGuide',
              cond: (ctx) => {
                return ctx.assignmentType === 'ReadingGuide'
              },
            },
          ],
        },
        essay: {
          on: {
            SET_LATE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  isLate: evt.payload,
                }
              }),
            },
            SET_INTITIAL_DRAFT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  essay: {
                    ...ctx.essay,
                    draftToGrade: evt.payload,
                  },
                }
              }),
            },
          },
        },
        readingGuide: {
          on: {
            SET_LATE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  isLate: evt.payload,
                }
              }),
            },
            SET_READING_GUIDE_LATENESS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: {
                    ...ctx.readingGuide,
                    late: evt.payload,
                  },
                }
              }),
            },
            SET_READING_GUIDE_COMPLETION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  readingGuide: {
                    ...ctx.readingGuide,
                    completeReadingGuide: evt.payload,
                  },
                }
              }),
            },
          },
        },
      },
    },
  },
})
