import { Machine, assign } from 'xstate'
import {
  findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo,
  SchoolDayType,
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities,
  AcademicOutomeTypes,
  ProtocolActivityTypes,
} from '../../../../../schemaTypes'

export type teachersAidMachineSchema = {
  states: {
    teachersAid: {}
    controlPanelActions: {
      states: {
        livePeriod: {}
        protocolManager: {}
      }
    }
  }
}
export type teachersAidMachineEvent =
  | {
      type: 'SET_COURSE'
      payload: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo
    }
  | { type: 'SET_STUDENT_ID'; payload: string }
  | { type: 'NEXT' }
  | { type: 'COURSE_SELECT' }
  | { type: 'START_LIVE_PERIOD' }
  | {
      type: 'LOAD_PROTOCOLS'
      payload: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
    }
  | { type: 'SELECT_PROTOCOL'; payload: number }

export type teachersAidMachineContext = {
  // courseSelectCurrentId: string
  courseInfo: findCourseInfoByCourseId_findCourseInfoByCourseId_courseInfo
  studentId: string
  courseSelectVisible: boolean
  protocols: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities[]
  protocolSelect: number
  selectedProtocol: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson_duringActivities
}

export const teachersAidMachine = Machine<
  teachersAidMachineContext,
  teachersAidMachineSchema,
  teachersAidMachineEvent
>({
  id: 'teachersAid',
  initial: 'teachersAid',
  type: 'parallel',
  context: {
    // courseSelectCurrentId: '',
    courseSelectVisible: true,
    courseInfo: {
      __typename: 'CourseInfo',
      _id: '',
      assignedSeats: [],
      endsAt: '',
      course: {
        __typename: 'Course',
        _id: '',
        name: '',
      },
      schoolDayType: SchoolDayType.A,
      startsAt: '',
    },
    studentId: '',
    protocols: [],
    protocolSelect: 0,
    selectedProtocol: {
      __typename: 'TextSectionProtocols',
      academicOutcomeTypes: AcademicOutomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
      isActive: false,
    },
  },
  states: {
    teachersAid: {
      on: {
        SET_COURSE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courseInfo: evt.payload,
              courseSelectVisible: false,
            }
          }),
        },
        SET_STUDENT_ID: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              studentId: evt.payload,
            }
          }),
        },
        COURSE_SELECT: {
          actions: assign((ctx) => {
            return {
              ...ctx,
              courseSelectVisible: !ctx.courseSelectVisible,
            }
          }),
        },
        LOAD_PROTOCOLS: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              protocols: evt.payload,
            }
          }),
        },
      },
    },
    controlPanelActions: {
      initial: 'livePeriod',
      states: {
        livePeriod: {
          on: {
            NEXT: 'protocolManager',
          },
        },

        protocolManager: {
          on: {
            NEXT: 'livePeriod',
            LOAD_PROTOCOLS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  protocols: evt.payload,
                }
              }),
            },
            SELECT_PROTOCOL: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  protocolSelect: evt.payload,
                  selectedProtocol: ctx.protocols[evt.payload],
                }
              }),
            },
          },
        },
      },
    },
  },
})
