import { Machine } from 'xstate'

export type teacherNavMachineSchema = {
  states: {
    dashboard: {}
    lessons: {}
    courses: {}
  }
}

export type teacherNavMachineEvent =
  | { type: 'DASHBOARD' }
  | { type: 'LESSONS' }
  | { type: 'COURSES' }

export const teacherNavMachine = Machine<
  teacherNavMachineSchema,
  teacherNavMachineEvent
>({
  id: 'teacherNav',
  initial: 'dashboard',
  states: {
    dashboard: {
      on: {
        LESSONS: 'lessons',
        COURSES: 'courses',
      },
    },
    lessons: {
      on: {
        DASHBOARD: 'dashboard',
        COURSES: 'courses',
      },
    },
    courses: {
      on: {
        LESSONS: 'lessons',
        DASHBOARD: 'dashboard',
      },
    },
  },
})
