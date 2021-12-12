import { Machine, assign } from 'xstate'
import {
  CreateSchoolDayInput,
  StudentCohortEnum,
  SchoolDayType,
  findCurrentSchoolDay_findSchoolDayByDate_schoolDay,
  SchoolDayLengthEnum,
} from '../../../../schemaTypes'

export type schoolDayMachineSchema = {
  states: {
    currentSchoolDay: {}
    createSchoolDay: {}
    editSchoolDay: {}
  }
}
export type schoolDayMachineEvent =
  | { type: 'CREATE_SCHOOL_DAY' }
  | { type: 'EDIT_SCHOOL_DAY' }
  | { type: 'CURRENT_SCHOOL_DAY' }
  | { type: 'SET_CURRENT_SCHOOL_DAY_COUNT'; payload: number }
  | { type: 'SET_CURRENT_SCHOOL_DAY_TYPE'; payload: SchoolDayType }
  | { type: 'SET_CURRENT_SCHOOL_DAY_LENGTH'; payload: SchoolDayLengthEnum }
  | { type: 'SET_CURRENT_COHORT_WEEK'; payload: StudentCohortEnum }
  | {
      type: 'SET_TODAYS_SCHOOL_DAY'
      payload: findCurrentSchoolDay_findSchoolDayByDate_schoolDay
    }

export type schoolDayMachineContext = {
  createSchoolDay: CreateSchoolDayInput
  currentSchoolDay: findCurrentSchoolDay_findSchoolDayByDate_schoolDay
}

export const schoolDayMachine = Machine<
  schoolDayMachineContext,
  schoolDayMachineSchema,
  schoolDayMachineEvent
>({
  id: 'schoolDay',
  initial: 'currentSchoolDay',
  context: {
    createSchoolDay: {
      cohortWeek: StudentCohortEnum.RED,
      currentSchoolDayType: SchoolDayType.A,
      schoolDayCount: 0,
      schoolDayLength: SchoolDayLengthEnum.FULL,
    },
    currentSchoolDay: {
      __typename: 'SchoolDay',
      _id: '',
      cohortWeek: StudentCohortEnum.RED,
      currentSchoolDayType: SchoolDayType.A,
      schoolDayCount: 0,
      signInSheets: [],
      todaysDate: '',
      schoolDayLength: SchoolDayLengthEnum.FULL,
    },
  },
  states: {
    currentSchoolDay: {
      on: {
        CREATE_SCHOOL_DAY: 'createSchoolDay',
        EDIT_SCHOOL_DAY: 'editSchoolDay',
        SET_TODAYS_SCHOOL_DAY: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              currentSchoolDay: {
                ...ctx.currentSchoolDay,
                __typename: 'SchoolDay',
                _id: evt.payload._id,
                cohortWeek: evt.payload.cohortWeek,
                currentSchoolDayType: evt.payload.currentSchoolDayType,
                schoolDayCount: evt.payload.schoolDayCount,
                signInSheets: evt.payload.signInSheets,
                schoolDayLength: evt.payload.schoolDayLength,
              },
            }
          }),
        },
      },
    },
    createSchoolDay: {
      on: {
        CURRENT_SCHOOL_DAY: 'currentSchoolDay',
        SET_CURRENT_SCHOOL_DAY_COUNT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              createSchoolDay: {
                ...ctx.createSchoolDay,
                schoolDayCount: evt.payload,
              },
            }
          }),
        },
        SET_CURRENT_SCHOOL_DAY_TYPE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              createSchoolDay: {
                ...ctx.createSchoolDay,
                currentSchoolDayType: evt.payload,
              },
            }
          }),
        },
        SET_CURRENT_SCHOOL_DAY_LENGTH: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              createSchoolDay: {
                ...ctx.createSchoolDay,
                schoolDayLength: evt.payload,
              },
            }
          }),
        },
        SET_CURRENT_COHORT_WEEK: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              createSchoolDay: {
                ...ctx.createSchoolDay,
                cohortWeek: evt.payload,
              },
            }
          }),
        },
      },
    },
    editSchoolDay: {
      on: {
        CURRENT_SCHOOL_DAY: 'currentSchoolDay',
      },
    },
  },
})
