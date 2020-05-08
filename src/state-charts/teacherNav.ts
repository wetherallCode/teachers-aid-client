import { Machine } from 'xstate'

export const teacherNavMachine = Machine({
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
