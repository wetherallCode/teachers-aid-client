import { Machine, assign } from 'xstate'
import {
  TextSectionVocabInput,
  TextSectionProtocolsInput,
  ProtocolActivityTypes,
  TextSectionQuestionsInput,
  MarkingPeriodEnum,
  AcademicOutcomeTypes,
} from '../../../../../../schemaTypes'

export type lessonPlannerMachineSchema = {
  states: {
    date: {}
    sections: {
      states: {
        text: {}
        chapter: {}
        sectionList: {}
        unit: {}
      }
    }
    lessonInfo: {}
    markingPeriod: {}
    courses: {}
  }
}
export type lessonPlannerMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_DATE'; payload: string }
  | { type: 'SET_TEXT_TITLE'; payload: string }
  | { type: 'SET_CHAPTER_ID'; payload: string }
  | { type: 'SET_CHAPTER_TITLE'; payload: string }
  | { type: 'SET_CURRENT_SECTION'; payload: string[] }
  | { type: 'SET_UNIT'; payload: string }
  | { type: 'ADD_SECTIONS'; payload: string[] }
  | { type: 'SET_STARTING_SECTION'; payload: string }
  | { type: 'SET_ENDING_SECTION'; payload: string }
  | { type: 'SET_STARTING_PAGE'; payload: number }
  | { type: 'SET_ENDING_PAGE'; payload: number }
  | { type: 'SET_VOCAB_LIST'; payload: TextSectionVocabInput }
  | { type: 'ADD_VOCAB'; payload: TextSectionVocabInput }
  | { type: 'SET_BEFORE_ACTIVITY'; payload: TextSectionProtocolsInput }
  | { type: 'SET_DURING_ACTIVITY'; payload: TextSectionProtocolsInput[] }
  | { type: 'SET_AFTER_ACTIVITY'; payload: TextSectionProtocolsInput }
  | { type: 'SET_QUESTIONS_LIST'; payload: TextSectionQuestionsInput }
  | { type: 'SET_ESSENTIAL_QUESTION'; payload: string }
  | { type: 'ASSIGN_TO_COURSES'; payload: string[] }
  | { type: 'SET_LESSON_NAME'; payload: string }
  | { type: 'SET_MARKING_PERIOD'; payload: MarkingPeriodEnum }

export type lessonPlannerMachineContext = {
  date: string
  fromText: string
  fromChapterTitle: string
  fromChapterId: string
  inUnit: string
  currentSection: string[]
  textSectionList: string[]
  texSectionListHeaders: string[]
  startingSection: string
  endingSection: string
  startingPage: number
  endingPage: number
  vocabList: TextSectionVocabInput[]
  beforeActivity: TextSectionProtocolsInput | null
  duringActivity: TextSectionProtocolsInput[]
  afterActivity: TextSectionProtocolsInput
  questionList: TextSectionQuestionsInput[]
  essentialQuestion: string
  courses: string[]
  lessonName: string
  markingPeriod: MarkingPeriodEnum
}

export const lessonPlannerMachine = Machine<
  lessonPlannerMachineContext,
  lessonPlannerMachineSchema,
  lessonPlannerMachineEvent
>({
  id: 'lessonPlanner',
  initial: 'date',
  context: {
    date: '',
    fromText: '',
    fromChapterId: '',
    fromChapterTitle: '',
    inUnit: '',
    currentSection: [],
    textSectionList: [],
    texSectionListHeaders: [],
    startingSection: '',
    endingSection: '',
    startingPage: 0,
    endingPage: 0,
    vocabList: [],
    beforeActivity: {
      academicOutcomeTypes: AcademicOutcomeTypes.SCHEMA_BUIDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
      isActive: false,
      completed: false,
    },
    duringActivity: [],
    afterActivity: {
      academicOutcomeTypes: AcademicOutcomeTypes.LOGIC_BUILDING,
      activityType: ProtocolActivityTypes.INDIVIDUAL,
      task: '',
      isActive: false,
      completed: false,
    },
    questionList: [],
    essentialQuestion: '',
    courses: [],
    lessonName: '',
    markingPeriod: MarkingPeriodEnum.FIRST,
  },

  states: {
    date: {
      on: {
        NEXT: 'sections',
        SET_DATE: {
          actions: assign((ctx, evt) => {
            return { ...ctx, date: evt.payload }
          }),
        },
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              markingPeriod: evt.payload,
            }
          }),
        },
      },
    },
    sections: {
      initial: 'text',
      states: {
        text: {
          on: {
            NEXT: 'chapter',
            PREVIOUS: '#lessonPlanner.date',
            SET_TEXT_TITLE: {
              actions: assign((ctx, evt) => {
                return { ...ctx, fromText: evt.payload }
              }),
            },
          },
        },
        chapter: {
          on: {
            PREVIOUS: 'text',
            NEXT: 'sectionList',
            SET_CHAPTER_ID: {
              actions: assign((ctx, evt) => {
                return { ...ctx, fromChapterId: evt.payload }
              }),
            },
            SET_CHAPTER_TITLE: {
              actions: assign((ctx, evt) => {
                return { ...ctx, fromChapterTitle: evt.payload }
              }),
            },
          },
        },
        sectionList: {
          on: {
            PREVIOUS: 'chapter',
            NEXT: 'unit',
            SET_CURRENT_SECTION: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  currentSection: [evt.payload[0], evt.payload[1]],
                }
              }),
            },
            ADD_SECTIONS: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  textSectionList: [...ctx.textSectionList, evt.payload[0]],
                  texSectionListHeaders: [
                    ...ctx.texSectionListHeaders,
                    evt.payload[1],
                  ],
                }
              }),
            },
            SET_STARTING_SECTION: {
              actions: assign((ctx, evt) => {
                return { ...ctx, startingSection: evt.payload }
              }),
            },
            SET_ENDING_SECTION: {
              actions: assign((ctx, evt) => {
                return { ...ctx, endingSection: evt.payload }
              }),
            },
          },
        },
        unit: {
          on: {
            PREVIOUS: 'sectionList',
            NEXT: '#lessonPlanner.lessonInfo',
            SET_UNIT: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  inUnit: evt.payload,
                }
              }),
            },
          },
        },
      },
    },
    lessonInfo: {
      on: {
        PREVIOUS: 'sections',
        NEXT: 'markingPeriod',
        SET_STARTING_PAGE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              startingPage: evt.payload,
            }
          }),
        },
        SET_ENDING_PAGE: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              endingPage: evt.payload,
            }
          }),
        },
        SET_VOCAB_LIST: {
          actions: assign((ctx, evt) => {
            return { ...ctx, vocabList: [...ctx.vocabList, evt.payload] }
          }),
        },
        ADD_VOCAB: {
          actions: assign((ctx, evt) => {
            return { ...ctx, vocabList: [...ctx.vocabList, evt.payload] }
          }),
        },
        SET_BEFORE_ACTIVITY: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              beforeActivity: evt.payload,
            }
          }),
        },
        SET_DURING_ACTIVITY: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              duringActivity: evt.payload,
            }
          }),
        },
        SET_AFTER_ACTIVITY: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              afterActivity: evt.payload,
            }
          }),
        },
        SET_QUESTIONS_LIST: {
          actions: assign((ctx, evt) => {
            return { ...ctx, questionList: [...ctx.questionList, evt.payload] }
          }),
        },
        SET_ESSENTIAL_QUESTION: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              essentialQuestion: evt.payload,
            }
          }),
        },
        SET_LESSON_NAME: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              lessonName: evt.payload,
            }
          }),
        },
      },
    },
    markingPeriod: {
      on: {
        PREVIOUS: 'lessonInfo',
        NEXT: 'courses',
        SET_MARKING_PERIOD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              markingPeriod: evt.payload,
            }
          }),
        },
      },
    },
    courses: {
      on: {
        PREVIOUS: 'lessonInfo',
        ASSIGN_TO_COURSES: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              courses: evt.payload,
            }
          }),
        },
      },
    },
  },
})
