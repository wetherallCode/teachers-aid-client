import { Machine, assign } from 'xstate'

export type assignEssayByCourseMachineSchema = {
  states: {
    essayInfo: {}
  }
}
export type assignEssayByCourseMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_STUDENT_IDS'; payload: string[] }
  | { type: 'SET_LESSON_ID'; payload: string }
  | { type: 'SET_ASSIGNED_DATE'; payload: string }
  | { type: 'SET_DUE_DATE'; payload: string }
//   | { type: 'IS_ASSIGNED'; payload: boolean }

export type assignEssayByCourseMachineContext = {
  studentIds: string[]
  associatedLessonId: string
  assignedDate: string
  dueDate: string
  //   isEssayAssigned: boolean
}

export const assignEssayByCourseMachine = Machine<
  assignEssayByCourseMachineContext,
  assignEssayByCourseMachineSchema,
  assignEssayByCourseMachineEvent
>({
  id: 'assignEssayByCourse',
  initial: 'essayInfo',
  context: {
    studentIds: [],
    associatedLessonId: '',
    assignedDate: '',
    dueDate: '',
    // isEssayAssigned: false,
  },
  states: {
    essayInfo: {
      on: {
        SET_STUDENT_IDS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentIds: evt.payload,
            }
          }),
        },
        SET_LESSON_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              associatedLessonId: evt.payload,
            }
          }),
        },
        SET_ASSIGNED_DATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              assignedDate: evt.payload,
            }
          }),
        },
        SET_DUE_DATE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              dueDate: evt.payload,
            }
          }),
        },
        // IS_ASSIGNED: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       isEssayAssigned: evt.payload,
        //     }
        //   }),
        // },
      },
    },
  },
})
