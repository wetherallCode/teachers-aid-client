import { Machine, assign } from 'xstate'
import { findStudentsByCourse_findStudentsByCourse_students } from '../../../../../../schemaTypes'

export type gradeEssayContainerMachineSchema = {
  states: {
    gradeEssayContainer: {}
    essayTypes: {
      states: {
        onTime: {}
        late: {}
        resubmitted: {}
      }
    }
  }
}
export type gradeEssayContainerMachineEvent =
  | {
      type: 'SET_COURSE_ID'
      payload: string
    }
  | { type: 'ONTIME' }
  | { type: 'LATE' }
  | { type: 'RESUBMITTED' }
  | { type: 'SET_STUDENT_ID'; payload: string }
  | { type: 'SET_ORDER_BY'; payload: 'LAST_NAME' | 'DATE' }
  | {
      type: 'SET_PAPER_BASED_STUDENT'
      payload: findStudentsByCourse_findStudentsByCourse_students
    }

export type gradeEssayContainerMachineContext = {
  courseId: string
  paperBasedStudentId: string | null
  paperBasedStudent: findStudentsByCourse_findStudentsByCourse_students | null
  orderBy: 'LAST_NAME' | 'DATE'
}

export const gradeEssayContainerMachine = Machine<
  gradeEssayContainerMachineContext,
  gradeEssayContainerMachineSchema,
  gradeEssayContainerMachineEvent
>({
  id: 'gradeEssayContainer',
  initial: 'gradeEssayContainer',
  context: {
    courseId: '',
    paperBasedStudentId: null,
    paperBasedStudent: null,
    orderBy: 'DATE',
  },
  type: 'parallel',
  states: {
    gradeEssayContainer: {
      on: {
        SET_COURSE_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseId: evt.payload,
            }
          }),
        },
        SET_STUDENT_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              paperBasedStudentId: evt.payload,
            }
          }),
        },
        SET_PAPER_BASED_STUDENT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              paperBasedStudent: evt.payload,
            }
          }),
        },
        SET_ORDER_BY: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              orderBy: evt.payload,
            }
          }),
        },
      },
    },
    essayTypes: {
      initial: 'onTime',
      states: {
        onTime: { on: { LATE: 'late', RESUBMITTED: 'resubmitted' } },
        late: { on: { ONTIME: 'onTime', RESUBMITTED: 'resubmitted' } },
        resubmitted: { on: { LATE: 'late', ONTIME: 'onTime' } },
      },
    },
  },
})
