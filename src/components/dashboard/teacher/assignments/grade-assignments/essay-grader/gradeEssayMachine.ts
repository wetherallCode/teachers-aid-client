import { Machine, assign } from 'xstate'
import {
  WritingLevelEnum,
  RubricEntryInput,
  RubricSectionEnum,
  ReturnedRubricEntryInput,
  ReturnGradedEssayInput,
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
  | { type: 'SET_DRAFT_TO_GRADE'; payload: ReturnGradedEssayInput }
  | { type: 'SET_ESSAY_ID'; payload: string }
  | { type: 'SET_WRITING_LEVEL'; payload: WritingLevelEnum }
  | {
      type: 'SET_INTITIAL_DRAFT'
      payload: {
        writingLevel: WritingLevelEnum
        draftToGrade: ReturnGradedEssayInput
      }
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

export type gradeEssayMachineContext = {
  essayId: string
  currentRubricSection: RubricSectionEnum
  rubricEntry: RubricEntryInput
  writingLevel: WritingLevelEnum
  draftSelector: number
  comment: string
  draftToGrade: ReturnGradedEssayInput
}

export const gradeEssayMachine = Machine<
  gradeEssayMachineContext,
  gradeEssayMachineSchema,
  gradeEssayMachineEvent
>({
  id: 'gradeEssay',
  type: 'parallel',
  initial: 'loading',
  context: {
    essayId: '',
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
  states: {
    loading: {
      on: {
        NEXT: 'grading',
        SET_INTITIAL_DRAFT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              writingLevel: evt.payload.writingLevel,
              draftToGrade: evt.payload.draftToGrade,
            }
          }),
        },
        SET_DRAFT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              draftToGrade: evt.payload,
            }
          }),
        },
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
        SET_DRAFT_SELECTOR: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              draftSelector: evt.payload,
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
                cond: (ctx) => {
                  return ctx.writingLevel === 'DEVELOPING'
                },
              },
              {
                target: 'academic',
                cond: (ctx) => {
                  console.log(ctx.writingLevel)
                  return ctx.writingLevel === 'ACADEMIC'
                },
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
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    rubricEntries: evt.payload,
                  },
                }
              }),
            },
            SET_SCORE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    score: evt.payload,
                  },
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
            ADD_ADDITIONAL_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    additionalComments: [
                      ...ctx.draftToGrade.additionalComments,
                      evt.payload,
                    ],
                  },
                }
              }),
            },
            REMOVE_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    additionalComments: [
                      ...ctx.draftToGrade.additionalComments,
                      ...ctx.draftToGrade.additionalComments!.slice(
                        0,
                        evt.payload
                      ),
                      ...ctx.draftToGrade.additionalComments!.slice(
                        evt.payload + 1
                      ),
                    ],
                  },
                }
              }),
            },
          },
        },
        academic: {
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
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    rubricEntries: evt.payload,
                  },
                }
              }),
            },
            SET_SCORE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    score: evt.payload,
                  },
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
            ADD_ADDITIONAL_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    additionalComments: [
                      ...ctx.draftToGrade.additionalComments,
                      evt.payload,
                    ],
                  },
                }
              }),
            },
            REMOVE_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    additionalComments: [
                      ...ctx.draftToGrade.additionalComments,
                      ...ctx.draftToGrade.additionalComments!.slice(
                        0,
                        evt.payload
                      ),
                      ...ctx.draftToGrade.additionalComments!.slice(
                        evt.payload + 1
                      ),
                    ],
                  },
                }
              }),
            },
          },
        },
        advanced: {
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
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    rubricEntries: evt.payload,
                  },
                }
              }),
            },
            SET_SCORE: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    score: evt.payload,
                  },
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
            ADD_ADDITIONAL_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    additionalComments: [
                      ...ctx.draftToGrade.additionalComments,
                      evt.payload,
                    ],
                  },
                }
              }),
            },
            REMOVE_COMMENT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  draftToGrade: {
                    ...ctx.draftToGrade,
                    additionalComments: [
                      ...ctx.draftToGrade.additionalComments,
                      ...ctx.draftToGrade.additionalComments!.slice(
                        0,
                        evt.payload
                      ),
                      ...ctx.draftToGrade.additionalComments!.slice(
                        evt.payload + 1
                      ),
                    ],
                  },
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
