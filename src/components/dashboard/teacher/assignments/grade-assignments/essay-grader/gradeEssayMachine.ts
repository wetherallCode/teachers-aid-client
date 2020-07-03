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

export type gradeEssayMachineContext = {
  essayId: string
  score: number
  currentRubricSection: RubricSectionEnum
  rubricEntry: RubricEntryInput
  rubricEntries: ReturnedRubricEntryInput[]
  writingLevel: WritingLevelEnum
  gradingDraft: string
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
