import { Machine, assign } from 'xstate'

export type editCourseMachineSchema = {
  states: {
    editCourse: {}
  }
}
export type editCourseMachineEvent = { type: 'NEXT' } | { type: 'PREVIOUS' }

export type editCourseMachineContext = {}

export const editCourseMachine = Machine<
  editCourseMachineContext,
  editCourseMachineSchema,
  editCourseMachineEvent
>({
  id: 'editCourse',
  initial: 'editCourse',
  context: {},
  states: {
    editCourse: {},
  },
})
