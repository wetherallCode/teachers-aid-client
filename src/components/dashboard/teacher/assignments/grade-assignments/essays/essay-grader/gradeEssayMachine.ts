import { Machine, assign } from 'xstate'
import {
  WritingLevelEnum,
  RubricEntryInput,
  RubricSectionEnum,
  ReturnedRubricEntryInput,
  ReturnGradedEssayInput,
  findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft_rubricEntries,
} from '../../../../../../../schemaTypes'

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
  | { type: 'SET_PREVIOUS_DRAFT'; payload: ReturnGradedEssayInput }
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
  | { type: 'CHANGE_EDIT_COLOR'; payload: string }
  | { type: 'TOGGLE_ORGANIZER'; payload: boolean }
  | { type: 'ADD_ADDITIONAL_COMMENT'; payload: string }
  | { type: 'REMOVE_COMMENT'; payload: number }
  | {
      type: 'SET_PREVIOUS_RUBRIC_ENTRIES'
      payload: findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft_rubricEntries[]
    }

export type gradeEssayMachineContext = {
  editColor: string
  essayId: string
  currentRubricSection: RubricSectionEnum
  rubricEntry: RubricEntryInput
  writingLevel: WritingLevelEnum
  draftSelector: number
  organizerToggle: boolean
  comment: string
  draftToGrade: ReturnGradedEssayInput
  previousDraft: ReturnGradedEssayInput
  previousRubricEntries: findEssayToGradeById_findEssayById_essay_finalDraft_submittedFinalDraft_rubricEntries[]
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
    editColor: 'red',
    essayId: '',
    draftToGrade: {
      _id: '',
      draftNumber: 0,
      gradingDraft: '',
      rubricEntries: [],
      additionalComments: [],
      score: 0,
    },
    previousDraft: {
      _id: '',
      draftNumber: 0,
      gradingDraft: '',
      rubricEntries: [],
      additionalComments: [],
      score: 0,
    },
    draftSelector: 0,
    organizerToggle: false,
    rubricEntry: {
      entry: '',
      rubricSection: RubricSectionEnum.OVERALL,
      rubricWritingLevels: [WritingLevelEnum.DEVELOPING],
      score: 0,
    },

    currentRubricSection: RubricSectionEnum.OVERALL,
    writingLevel: WritingLevelEnum.DEVELOPING,
    comment: '',
    previousRubricEntries: [],
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
        SET_PREVIOUS_DRAFT: {
          actions: assign((ctx, evt) => {
            console.log(evt.payload)
            return {
              ...ctx,
              previousDraft: evt.payload,
            }
          }),
        },
        SET_DRAFT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              previousDraft: evt.payload,
            }
          }),
        },
        TOGGLE_ORGANIZER: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              organizerToggle: evt.payload,
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
          always: [
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
        developing: {
          on: {
            PREVIOUS: '#gradeEssay.loading',
            NEXT: '#gradeEssay.returning',
            CHANGE_EDIT_COLOR: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  editColor: evt.payload,
                }
              }),
            },
            SET_PREVIOUS_RUBRIC_ENTRIES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  previousRubricEntries: evt.payload,
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
                      ...ctx.draftToGrade.additionalComments!,
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
                      // ...ctx.draftToGrade.additionalComments,
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
            CHANGE_EDIT_COLOR: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  editColor: evt.payload,
                }
              }),
            },
            SET_PREVIOUS_RUBRIC_ENTRIES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  previousRubricEntries: evt.payload,
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
                      ...ctx.draftToGrade.additionalComments!,
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
                      // ...ctx.draftToGrade.additionalComments,
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
            CHANGE_EDIT_COLOR: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  editColor: evt.payload,
                }
              }),
            },
            SET_PREVIOUS_RUBRIC_ENTRIES: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  previousRubricEntries: evt.payload,
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
                      ...ctx.draftToGrade.additionalComments!,
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
                      // ...ctx.draftToGrade.additionalComments,
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
