import { Machine, assign } from 'xstate'
import {
  WritingLevelEnum,
  RubricEntryInput,
  RubricSectionEnum,
  ReturnedRubricEntryInput,
} from '../../../../../../schemaTypes'

export type gradeEssayMachineSchema = {
  states: {
    loading: {}
    grading: {
      states: {
        transition: {}
        developing: {}
        academic: {}
        advanced: {}
      }
    }
    returning: {}
  }
}
export type gradeEssayMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_ESSAY_ID'; payload: string }
  | { type: 'SET_WRITING_LEVEL'; payload: WritingLevelEnum }
  | { type: 'SET_DRAFT_TO_RETURN'; payload: string }
  | { type: 'SET_CURRENT_RUBRIC_SECTION'; payload: RubricSectionEnum }
  | { type: 'SET_RUBRIC_ENTRY'; payload: RubricEntryInput }
  | { type: 'SET_RUBRIC_ENTRIES'; payload: ReturnedRubricEntryInput[] }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'SET_COMMENT'; payload: string }
  | { type: 'RESET_COMMENT' }
  | { type: 'ADD_ADDITIONAL_COMMENT'; payload: string }
  | { type: 'REMOVE_COMMENT'; payload: number }

export type gradeEssayMachineContext = {
  essayId: string
  score: number
  currentRubricSection: RubricSectionEnum
  rubricEntry: RubricEntryInput
  rubricEntries: ReturnedRubricEntryInput[]
  writingLevel: WritingLevelEnum
  gradingDraft: string
  comment: string
  additionalComments: string[]
}

export const gradeEssayMachine = Machine<
  gradeEssayMachineContext,
  gradeEssayMachineSchema,
  gradeEssayMachineEvent
>({
  id: 'gradeEssay',
  initial: 'loading',
  context: {
    essayId: '',
    rubricEntry: {
      entry: '',
      rubricSection: RubricSectionEnum.OVERALL,
      rubricWritingLevels: [WritingLevelEnum.DEVELOPING],
      score: 0,
    },
    currentRubricSection: RubricSectionEnum.OVERALL,
    rubricEntries: [],
    score: 0,
    writingLevel: WritingLevelEnum.DEVELOPING,
    gradingDraft: '',
    comment: '',
    additionalComments: [],
  },
  states: {
    loading: {
      on: {
        NEXT: 'grading',
        SET_ESSAY_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              essayId: evt.payload,
            }
          }),
        },
        SET_WRITING_LEVEL: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              writingLevel: evt.payload,
            }
          }),
        },
        SET_DRAFT_TO_RETURN: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              gradingDraft: evt.payload,
            }
          }),
        },
      },
    },
    grading: {
      initial: 'transition',
      states: {
        transition: {
          on: {
            '': [
              {
                target: 'developing',
                cond: (ctx) => ctx.writingLevel === 'DEVELOPING',
              },
              {
                target: 'academic',
                cond: (ctx) => ctx.writingLevel === 'ACADEMIC',
              },
              {
                target: 'advanced',
                cond: (ctx) => ctx.writingLevel === 'ADVANCED',
              },
            ],
          },
        },
        developing: {
          on: {
            PREVIOUS: '#gradeEssay.loading',
            NEXT: '#gradeEssay.returning',
            SET_CURRENT_RUBRIC_SECTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  currentRubricSection: evt.payload,
                }
              }),
            },
            SET_RUBRIC_ENTRY: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  rubricEntry: { ...evt.payload },
                }
              }),
            },
            SET_RUBRIC_ENTRIES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  rubricEntries: evt.payload,
                }
              }),
            },
            SET_SCORE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  score: evt.payload,
                }
              }),
            },
            SET_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  comment: evt.payload,
                }
              }),
            },
            RESET_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  contextProperty: '',
                }
              }),
            },
            ADD_ADDITIONAL_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  additionalComments: [...ctx.additionalComments, evt.payload],
                }
              }),
            },
            REMOVE_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  additionalComments: [
                    ...ctx.additionalComments.slice(0, evt.payload),
                    ...ctx.additionalComments.slice(evt.payload + 1),
                  ],
                }
              }),
            },
          },
        },
        academic: {
          on: {
            PREVIOUS: '#gradeEssay.loading',
            NEXT: '#gradeEssay.returning',
            SET_DRAFT_TO_RETURN: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  gradingDraft: evt.payload,
                }
              }),
            },
            SET_CURRENT_RUBRIC_SECTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  currentRubricSection: evt.payload,
                }
              }),
            },
            SET_RUBRIC_ENTRY: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  rubricEntry: { ...evt.payload },
                }
              }),
            },
            SET_RUBRIC_ENTRIES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  rubricEntries: evt.payload,
                }
              }),
            },
            SET_SCORE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  score: evt.payload,
                }
              }),
            },
            SET_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  comment: evt.payload,
                }
              }),
            },
            RESET_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  contextProperty: '',
                }
              }),
            },
            ADD_ADDITIONAL_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  additionalComments: [...ctx.additionalComments, evt.payload],
                }
              }),
            },
            REMOVE_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  additionalComments: [
                    ...ctx.additionalComments.slice(0, evt.payload),
                    ...ctx.additionalComments.slice(evt.payload + 1),
                  ],
                }
              }),
            },
          },
        },
        advanced: {
          on: {
            PREVIOUS: '#gradeEssay.loading',
            NEXT: '#gradeEssay.returning',
            SET_DRAFT_TO_RETURN: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  gradingDraft: evt.payload,
                }
              }),
            },
            SET_CURRENT_RUBRIC_SECTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  currentRubricSection: evt.payload,
                }
              }),
            },
            SET_RUBRIC_ENTRY: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  rubricEntry: { ...evt.payload },
                }
              }),
            },
            SET_RUBRIC_ENTRIES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  rubricEntries: evt.payload,
                }
              }),
            },
            SET_SCORE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  score: evt.payload,
                }
              }),
            },
            SET_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  comment: evt.payload,
                }
              }),
            },
            RESET_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  contextProperty: '',
                }
              }),
            },
            ADD_ADDITIONAL_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  additionalComments: [...ctx.additionalComments, evt.payload],
                }
              }),
            },
            REMOVE_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  additionalComments: [
                    ...ctx.additionalComments.slice(0, evt.payload),
                    ...ctx.additionalComments.slice(evt.payload + 1),
                  ],
                }
              }),
            },
          },
        },
      },
    },
    returning: {
      on: {
        PREVIOUS: '#gradeEssay.grading',
      },
    },
  },
})
