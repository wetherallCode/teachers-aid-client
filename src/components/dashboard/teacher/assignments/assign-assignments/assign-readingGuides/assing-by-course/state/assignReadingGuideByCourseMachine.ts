import { Machine, assign } from 'xstate'

export type assignReadingGuideByCourseMachineSchema = {
  states: {
    readingGuideInfo: {}
  }
}
export type assignReadingGuideByCourseMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_STUDENT_IDS'; payload: string[] }
  | { type: 'SET_LESSON_ID'; payload: string }
  | { type: 'SET_ASSIGNED_DATE'; payload: string }
  | { type: 'SET_DUE_DATE'; payload: string }

export type assignReadingGuideByCourseMachineContext = {
  studentIds: string[]
  associatedLessonId: string
  assignedDate: string
  dueDate: string
}

export const assignReadingGuideByCourseMachine = Machine<
  assignReadingGuideByCourseMachineContext,
  assignReadingGuideByCourseMachineSchema,
  assignReadingGuideByCourseMachineEvent
>({
  id: 'assignReadingGuideByCourse',
  initial: 'readingGuideInfo',
  context: {
    studentIds: [],
    associatedLessonId: '',
    assignedDate: '',
    dueDate: '',
  },
  states: {
    readingGuideInfo: {
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
      },
    },
  },
})
