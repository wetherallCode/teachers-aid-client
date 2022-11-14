import { Machine, assign } from 'xstate'
import { DynamicLessonEnums } from '../../../schemaTypes'

export type dailyAgendaMachineSchema = {
  states: {
    getLesson: {}
    todaysLesson: {}
    oldLesson: {}
  }
}
export type dailyAgendaMachineEvent =
  | { type: 'TODAYS_LESSON' }
  | { type: 'GET_LESSON' }
  | { type: 'POLLING' }
  | {
      type: 'SET_STATIC_LESSON_TYPE'
      payload: DynamicLessonEnums | 'TEXT_ANALYSIS'
    }

export type dailyAgendaMachineContext = {
  polling: boolean
  staticLessonTypes: DynamicLessonEnums | 'TEXT_ANALYSIS'
}

export const dailyAgendaMachine = Machine<
  dailyAgendaMachineContext,
  dailyAgendaMachineSchema,
  dailyAgendaMachineEvent
>({
  id: 'dailyAgenda',
  initial: 'getLesson',
  context: {
    polling: false,
    staticLessonTypes: DynamicLessonEnums.WARM_UP,
  },
  states: {
    getLesson: {
      on: {
        TODAYS_LESSON: 'todaysLesson',
      },
    },
    todaysLesson: {
      on: {
        GET_LESSON: 'getLesson',
        POLLING: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              polling: !ctx.polling,
            }
          }),
        },
        SET_STATIC_LESSON_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              staticLessonTypes: evt.payload,
            }
          }),
        },
      },
    },
    oldLesson: {},
  },
})
