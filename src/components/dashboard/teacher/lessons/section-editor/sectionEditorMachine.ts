import {
  TextSectionProtocolsInput,
  TextSectionQuestionsInput,
  TextSectionVocabInput,
  PageNumbersInput,
} from '../../../../../schemaTypes'
import { Machine, assign } from 'xstate'

export type sectionEditorMachineSchema = {
  states: {
    textSectionValues: {}
    update: {}
  }
}

export type sectionEditorMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SHOW'; payload: boolean }
  | { type: 'SET_CURRENT_INDEX'; payload: number }
  | { type: 'SET_SECTION_ID'; payload: string }
  | { type: 'SET_TEXT_TITLE'; textTitle: string }
  | { type: 'SET_CHAPTER_ID'; payload: string }
  | { type: 'SET_HEADER'; header: string }
  | { type: 'SET_PAGE_NUMBERS'; payload: PageNumbersInput }
  | { type: 'SET_VOCAB_LIST'; payload: TextSectionVocabInput[] }
  | { type: 'SET_QUESTIONS_LIST'; payload: TextSectionQuestionsInput[] }
  | { type: 'SET_PROTOCOLS_LIST'; payload: TextSectionProtocolsInput[] }

export type sectionEditorMachineContext = {
  fromText: string
  fromChapterTitle: string
  fromChapterId: string
  sectionId: string
  hasProtocols: TextSectionProtocolsInput[]
  hasQuestions: TextSectionQuestionsInput[]
  hasVocab: TextSectionVocabInput[]
  header: string
  pageNumbers: PageNumbersInput
  isHidden: boolean
  currentIndex: number
  addItem: boolean
}

export const sectionEditorMachine = Machine<
  sectionEditorMachineContext,
  sectionEditorMachineSchema,
  sectionEditorMachineEvent
>({
  id: 'sectionEditor',
  initial: 'textSectionValues',
  context: {
    fromText: '',
    fromChapterId: '',
    fromChapterTitle: '',
    sectionId: '',
    header: '',
    pageNumbers: {
      startingPage: 0,
      endingPage: 0,
    },
    hasProtocols: [],
    hasQuestions: [],
    hasVocab: [],
    isHidden: true,
    currentIndex: -1,
    addItem: false,
  },
  states: {
    textSectionValues: {
      on: {
        NEXT: 'update',
        SET_TEXT_TITLE: {
          actions: assign((context, event) => {
            return { ...context, fromText: event.textTitle }
          }),
        },
        SET_CHAPTER_ID: {
          actions: assign((context, event) => {
            return { ...context, fromChapterId: event.payload }
          }),
        },
        SHOW: {
          actions: assign((context, event) => {
            return { ...context, isHidden: event.payload }
          }),
        },
        SET_CURRENT_INDEX: {
          actions: assign((ctx, evt) => {
            return { ...ctx, currentIndex: evt.payload }
          }),
        },
        SET_SECTION_ID: {
          actions: assign((context, event) => {
            return { ...context, sectionId: event.payload }
          }),
        },
        SET_HEADER: {
          actions: assign((context, event) => {
            return { ...context, header: event.header }
          }),
        },
        SET_PAGE_NUMBERS: {
          actions: assign((context, event) => {
            return { ...context, pageNumbers: event.payload }
          }),
        },
        SET_VOCAB_LIST: {
          actions: assign((context, event) => {
            return { ...context, hasVocab: event.payload }
          }),
        },

        SET_QUESTIONS_LIST: {
          actions: assign({
            hasQuestions: (context, event) => event.payload,
          }),
        },
        SET_PROTOCOLS_LIST: {
          actions: assign({
            hasProtocols: (context, event) => event.payload,
          }),
        },
      },
    },
    update: {
      on: {
        PREVIOUS: 'textSectionValues',
      },
    },
  },
})
