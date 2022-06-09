import { Machine, assign } from 'xstate'

export type teacherNavMachineSchema = {
  states: {
    dashboard: {}
    lessons: {}
    assignments: {}
    rubrics: {}
    studentInformation: {}
    parentContacts: {}
    behavior: {}
    development: {}
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
export type teacherNavTargets =
  | 'DASHBOARD'
  | 'LESSONS'
  | 'ASSIGNMENTS'
  | 'RUBRICS'
  | 'COURSES'
  | 'COURSE_SELECT'
  | 'LESSON_EDITOR'
  | 'STUDENT_INFORMATION'
  | 'PARENT_CONTACTS'
  | 'BEHAVIOR'
  | 'DEVELOPMENT'
// | 'SET_COURSE'
export type teacherNavMachineEvent =
  | { type: 'DASHBOARD' }
  | { type: 'LESSONS' }
  | { type: 'ASSIGNMENTS' }
  | { type: 'RUBRICS' }
  | { type: 'COURSES' }
  | { type: 'COURSE_SELECT' }
  | { type: 'LESSON_EDITOR' }
  | { type: 'STUDENT_INFORMATION' }
  | { type: 'PARENT_CONTACTS' }
  | { type: 'BEHAVIOR' }
  | { type: 'DEVELOPMENT' }
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
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
      },
    },
    lessons: {
      on: {
        DASHBOARD: 'dashboard',
        COURSES: 'courses',
        LESSONS: 'lessons',

        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
      },
    },
    assignments: {
      on: {
        DASHBOARD: 'dashboard',
        LESSONS: 'lessons',
        COURSES: 'courses',
        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
      },
    },
    rubrics: {
      on: {
        DASHBOARD: 'dashboard',
        LESSONS: 'lessons',
        COURSES: 'courses',
        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
      },
    },
    studentInformation: {
      on: {
        DASHBOARD: 'dashboard',
        LESSONS: 'lessons',
        COURSES: 'courses',
        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
      },
    },
    parentContacts: {
      on: {
        DASHBOARD: 'dashboard',
        LESSONS: 'lessons',
        COURSES: 'courses',
        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
      },
    },
    behavior: {
      on: {
        DASHBOARD: 'dashboard',
        LESSONS: 'lessons',
        COURSES: 'courses',
        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
      },
    },
    development: {
      on: {
        DASHBOARD: 'dashboard',
        LESSONS: 'lessons',
        COURSES: 'courses',
        ASSIGNMENTS: 'assignments',
        RUBRICS: 'rubrics',
        STUDENT_INFORMATION: 'studentInformation',
        PARENT_CONTACTS: 'parentContacts',
        BEHAVIOR: 'behavior',
        DEVELOPMENT: 'development',
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
                LESSONS: '#teacherNav.lessons',
                COURSES: '#teacherNav.courses',
                ASSIGNMENTS: '#teacherNav.assignments',
                RUBRICS: '#teacherNav.rubrics',
                STUDENT_INFORMATION: '#teacherNav.studentInformation',
                PARENT_CONTACTS: '#teacherNav.parentContacts',
                BEHAVIOR: '#teacherNav.behavior',
                DEVELOPMENT: '#teacherNav.development',
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
                LESSONS: '#teacherNav.lessons',

                ASSIGNMENTS: '#teacherNav.assignments',
                RUBRICS: '#teacherNav.rubrics',
                STUDENT_INFORMATION: '#teacherNav.studentInformation',
                PARENT_CONTACTS: '#teacherNav.parentContacts',
                BEHAVIOR: '#teacherNav.behavior',
                DEVELOPMENT: '#teacherNav.development',
              },
            },
          },
        },
      },
    },
  },
})
