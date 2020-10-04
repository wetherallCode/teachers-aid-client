import { Machine, assign } from 'xstate'

export type teacherNavMachineSchema = {
  states: {
    dashboard: {}
    lessons: {}
    assignments: {}
    rubrics: {}
    parentContacts: {}
    courses: {
      states: {
        home: {
          states: {
            idle: {}
            courseSelect: {}
          }
        }
      }
    }
  }
}
export type teacherNavMachineEvent =
  | { type: 'DASHBOARD' }
  | { type: 'LESSONS' }
  | { type: 'ASSIGNMENTS' }
  | { type: 'RUBRICS' }
  | { type: 'COURSES' }
  | { type: 'COURSE_SELECT' }
  | { type: 'LESSON_EDITOR' }
  | { type: 'PARENT_CONTACTS' }
  | { type: 'SET_COURSE'; payload: string }

export type teacherNavMachineContext = {
  course: string
}

export const teacherNavMachine = Machine<
  teacherNavMachineContext,
  teacherNavMachineSchema,
  teacherNavMachineEvent
>({
  id: 'teacherNav',
  initial: 'dashboard',
  context: {
    course: '',
  },
  states: {
    dashboard: {
      on: {
        LESSONS: 'lessons',
        COURSES: 'courses',
        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        PARENT_CONTACTS: 'parentContacts',
      },
    },
    lessons: {
      on: {
        DASHBOARD: 'dashboard',
        COURSES: 'courses',
      },
    },
    assignments: {
      on: {
        DASHBOARD: 'dashboard',
      },
    },
    rubrics: {
      on: {
        DASHBOARD: 'dashboard',
      },
    },
    parentContacts: {
      on: {
        DASHBOARD: 'dashboard',
      },
    },
    courses: {
      initial: 'home',
      states: {
        home: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                DASHBOARD: '#teacherNav.dashboard',
                COURSE_SELECT: 'courseSelect',
                SET_COURSE: {
                  actions: assign((ctx, evt) => {
                    return {
                      ...ctx,
                      course: evt.payload,
                    }
                  }),
                },
              },
            },
            courseSelect: {
              on: {
                COURSES: '#teacherNav.courses.home',
                DASHBOARD: '#teacherNav.dashboard',
              },
            },
          },
        },
      },
    },
  },
})
