import { Machine, assign } from 'xstate'
import { WritingLevelEnum, RubricSectionEnum } from '../../../../../schemaTypes'

export type rubricBuilderMachineSchema = {
  states: {
    build: {}
  }
}
export type rubricBuilderMachineEvent =
  | { type: 'RESET' }
  | { type: 'SET_WRITING_LEVELS'; payload: WritingLevelEnum[] }
  | { type: 'SET_SECTION'; payload: RubricSectionEnum }
  | { type: 'SET_ENTRY'; payload: string }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'SET_HOW_TO_IMPROVE'; payload: string }

export type rubricBuilderMachineContext = {
  writingLevels: WritingLevelEnum[]
  section: RubricSectionEnum
  entry: string
  score: number
  howToImprove: string
}

export const rubricBuilderMachine = Machine<
  rubricBuilderMachineContext,
  rubricBuilderMachineSchema,
  rubricBuilderMachineEvent
>({
  id: 'rubricBuilder',
  initial: 'build',
  context: {
    writingLevels: [],
    section: RubricSectionEnum.PROOFREADING,
    entry: '',
    score: 0,
    howToImprove: '',
  },
  states: {
    build: {
      on: {
        SET_WRITING_LEVELS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              writingLevels: evt.payload,
            }
          }),
        },
        SET_SECTION: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              section: evt.payload,
            }
          }),
        },
        SET_ENTRY: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              entry: evt.payload,
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
        SET_HOW_TO_IMPROVE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              howToImprove: evt.payload,
            }
          }),
        },
        RESET: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              entry: '',
              score: 0,
              writingLevels: [],
              section: RubricSectionEnum.PROOFREADING,
              howToImprove: '',
            }
          }),
        },
      },
    },
  },
})
