import { Machine, assign } from 'xstate'

export type quizToCompleteMachineSchema = {
  states: {
    quiz: {}
  }
}
export type quizToCompleteMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_QUIZZABLE_SECTIONS'; payload: string[] }
  | { type: 'SET_INITIAL_QUIZZABLE_SECTION'; payload: string }
  | { type: 'NEXT_QUIZZABLE_SECTION' }
  | { type: 'ADD_RESPONSIBILITY_POINTS'; payload: number }
  | { type: 'ADD_EARNED_POINTS'; payload: number }
  | { type: 'GET_CURRENT_POINTS' }
  | { type: 'NEXT_QUESTION_NUMBER' }

export type quizToCompleteMachineContext = {
  quizzableSections: string[]
  currentQuizzableSection: string
  earnedPoints: number
  responsibilityPoints: number
  questionNumber: number
}

export const quizToCompleteMachine = Machine<
  quizToCompleteMachineContext,
  quizToCompleteMachineSchema,
  quizToCompleteMachineEvent
>({
  id: 'quizToComplete',
  initial: 'quiz',
  context: {
    quizzableSections: [],
    currentQuizzableSection: '',
    earnedPoints: 0,
    responsibilityPoints: 0,
    questionNumber: 1,
  },
  states: {
    quiz: {
      on: {
        SET_QUIZZABLE_SECTIONS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              quizzableSections: evt.payload,
            }
          }),
        },
        SET_INITIAL_QUIZZABLE_SECTION: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              currentQuizzableSection: evt.payload,
            }
          }),
        },
        NEXT_QUIZZABLE_SECTION: {
          actions: assign((ctx, evt) => {
            const quizzableSectionIndex = ctx.quizzableSections.findIndex(
              (i) => i === ctx.currentQuizzableSection
            )

            return {
              ...ctx,
              currentQuizzableSection:
                ctx.quizzableSections[quizzableSectionIndex + 1],
            }
          }),
        },
        ADD_EARNED_POINTS: {
          actions: assign((ctx, evt) => {
            const points = ctx.earnedPoints + evt.payload
            return {
              ...ctx,
              earnedPoints: points,
            }
          }),
        },
        ADD_RESPONSIBILITY_POINTS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              responsibilityPoints: ctx.responsibilityPoints + evt.payload,
            }
          }),
        },
        GET_CURRENT_POINTS: {
          actions: assign((ctx) => {
            console.log(ctx.earnedPoints, ctx.responsibilityPoints)
            return {
              ...ctx,
              earnedPoints: ctx.earnedPoints,
              responsibilityPoints: ctx.responsibilityPoints,
            }
          }),
        },
        NEXT_QUESTION_NUMBER: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              questionNumber: ctx.questionNumber + 1,
            }
          }),
        },
      },
    },
  },
})
