import { Machine, assign } from 'xstate'

export type gradeEssayMachineSchema = {
  states: {
    loading: {}
  }
}
export type gradeEssayMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_ESSAY_ID'; payload: string }
  | { type: 'SET_DRAFT_TO_GRADE'; payload: string }

export type gradeEssayMachineContext = {
  essayId: string
  gradedDraft: string
  score: number
  comments: string[]
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
    gradedDraft: '',
    comments: [],
    score: 0,
  },
  states: {
    loading: {
      on: {
        SET_ESSAY_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              essayId: evt.payload,
            }
          }),
        },
      },
    },
  },
})
