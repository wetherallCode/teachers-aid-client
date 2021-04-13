import {
  TextSectionProtocolsInput,
  TextSectionQuestionsInput,
  TextSectionVocabInput,
  PageNumbersInput,
} from '../../../../../../schemaTypes'
import { Machine, assign } from 'xstate'

export type sectionEditorMachineSchema = {
  states: {
    textSectionValues: {}
    update: {
      states: {
        idle: {}
        editProtocol: {}
        editQuestion: {}
        editVocabWord: {}
        addProtocol: {}
        addQuestion: {}
        addVocabWord: {}
      }
    }
  }
}

export type sectionEditorMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'PROTOCOL_EDITOR' }
  | { type: 'QUESTION_EDITOR' }
  | { type: 'VOCAB_WORD_EDITOR' }
  | { type: 'PROTOCOL_ADDER' }
  | { type: 'QUESTION_ADDER' }
  | { type: 'VOCAB_WORD_ADDER' }
  | { type: 'SHOW'; payload: boolean }
  | { type: 'SET_CURRENT_INDEX'; payload: number }
  | { type: 'SET_SECTION_ID'; payload: string }
  | { type: 'SET_TEXT_TITLE'; textTitle: string }
  | { type: 'SET_CHAPTER_ID'; payload: string }
  | { type: 'SET_HEADER'; header: string }
  | { type: 'SET_PAGE_NUMBERS'; payload: PageNumbersInput }
  | { type: 'SET_VOCAB_LIST'; payload: TextSectionVocabInput[] }
  | {
      type: 'SET_VOCAB_WORD_TO_EDIT'
      payload: TextSectionVocabInput | null
      index: number | null
    }
  | {
      type: 'EDIT_VOCAB_WORD'
      payload: TextSectionVocabInput
    }
  | { type: 'SET_QUESTIONS_LIST'; payload: TextSectionQuestionsInput[] }
  | {
      type: 'SET_QUESTION_TO_EDIT'
      payload: TextSectionQuestionsInput | null
      index: number | null
    }
  | { type: 'EDIT_QUESTION'; payload: TextSectionQuestionsInput }
  | { type: 'SET_PROTOCOLS_LIST'; payload: TextSectionProtocolsInput[] }
  | {
      type: 'SET_PROTOCOL_TO_EDIT'
      payload: TextSectionProtocolsInput | null
      index: number | null
    }
  | { type: 'EDIT_PROTOCOL'; payload: TextSectionProtocolsInput }

export type sectionEditorMachineContext = {
  fromText: string
  fromChapterTitle: string
  fromChapterId: string
  sectionId: string
  hasProtocols: TextSectionProtocolsInput[]
  protocolToEdit: TextSectionProtocolsInput | null
  protocolToEditIndex: number | null
  hasQuestions: TextSectionQuestionsInput[]
  questionToEdit: TextSectionQuestionsInput | null
  questionToEditIndex: number | null
  hasVocab: TextSectionVocabInput[]
  vocabWordToEdit: TextSectionVocabInput | null
  vocabWordToEditIndex: number | null
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
  type: 'parallel',
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
    protocolToEdit: null,
    protocolToEditIndex: null,
    hasQuestions: [],
    questionToEdit: null,
    questionToEditIndex: null,
    hasVocab: [],
    vocabWordToEdit: null,
    vocabWordToEditIndex: null,
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
          actions: assign((ctx, evt) => {
            return { ...ctx, hasVocab: evt.payload }
          }),
        },
        SET_VOCAB_WORD_TO_EDIT: {
          actions: assign((ctx, evt) => {
            // console.log(evt.index)
            return {
              ...ctx,
              vocabWordToEdit: evt.payload,
              vocabWordToEditIndex: evt.index,
            }
          }),
        },
        EDIT_VOCAB_WORD: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              vocabWordToEdit: evt.payload,
            }
          }),
        },
        SET_QUESTIONS_LIST: {
          actions: assign((ctx, evt) => {
            return { ...ctx, hasQuestions: evt.payload }
          }),
        },
        SET_QUESTION_TO_EDIT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              questionToEdit: evt.payload,
              questionToEditIndex: evt.index,
            }
          }),
        },
        EDIT_QUESTION: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              questionToEdit: evt.payload,
            }
          }),
        },
        SET_PROTOCOLS_LIST: {
          actions: assign((ctx, evt) => {
            return { ...ctx, hasProtocols: evt.payload }
          }),
        },
        SET_PROTOCOL_TO_EDIT: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              protocolToEdit: evt.payload,
              protocolToEditIndex: evt.index,
            }
          }),
        },
        EDIT_PROTOCOL: {
          actions: assign((ctx, evt) => {
            return {
              ...ctx,
              protocolToEdit: evt.payload,
            }
          }),
        },
      },
    },
    update: {
      initial: 'idle',
      states: {
        idle: {
          on: {
          PROTOCOL_EDITOR: 'editProtocol',
          QUESTION_EDITOR: 'editQuestion',
          VOCAB_WORD_EDITOR: 'editVocabWord'
        }},
        editProtocol: {},
        editQuestion: {},
        editVocabWord: {},
        addProtocol: {},
        addQuestion: {},
        addVocabWord: {},
      },
    },
  },
})
