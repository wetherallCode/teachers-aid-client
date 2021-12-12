import { Machine, assign } from 'xstate'
import {
  CreateEssayQuestionInput,
  NounTypeEnum,
  QuestionTypeEnum,
  QuestionWordEnum,
  VerbTypeEnum,
} from '../../../../../../../schemaTypes'

export type buildEssayQuestionMachineSchema = {
  states: {
    sections: {
      states: {
        text: {}
        chapter: {}
        sectionList: {}
      }
    }
    questionInfo: {}
  }
}
export type buildEssayQuestionMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_TEXT_ID'; payload: string }
  | { type: 'SET_TEXT_NAME'; payload: string }
  | { type: 'SET_CHAPTER_ID'; payload: string }
  | { type: 'SET_CHAPTER_TITLE'; payload: string }
  | { type: 'SET_SECTION_IDS'; payload: string }
  | {
      type: 'SET_QUESTION_PARTS'
      keyName: string
      payload:
        | string
        | boolean
        | QuestionWordEnum
        | VerbTypeEnum
        | NounTypeEnum
        | null
    }

export type buildEssayQuestionMachineContext = {
  textId: string
  textName: string
  chapterId: string
  chapterTitle: string

  essayQuestionInfo: CreateEssayQuestionInput
}

export const buildEssayQuestionMachine = Machine<
  buildEssayQuestionMachineContext,
  buildEssayQuestionMachineSchema,
  buildEssayQuestionMachineEvent
>({
  id: 'buildEssayQuestion',
  initial: 'sections',
  context: {
    textId: '',
    textName: '',
    chapterId: '',
    chapterTitle: '',
    essayQuestionInfo: {
      associatedTextSectionsIds: [],
      questionPartsInput: {
        originalQuestion: '',
        modifiedQuestion: '',
        completeSubject: '',
        simpleSubject: '',
        nounType: NounTypeEnum.THING,
        compoundNoun: false,
        completePredicate: '',
        simplePredicate: '',
        helpingVerb: '',
        verbType: VerbTypeEnum.ACTION,
        questionWord: QuestionWordEnum.HOW,
        object: null,
        subjectCompliment: null,
        questionType: QuestionTypeEnum.HOW_CAUSE_EFFECT,
      },
    },
  },
  states: {
    sections: {
      initial: 'text',
      states: {
        text: {
          on: {
            NEXT: 'chapter',
            SET_TEXT_ID: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  textId: evt.payload,
                }
              }),
            },
            SET_TEXT_NAME: {
              actions: assign((ctx, evt) => {
                return {
                  ...ctx,
                  textName: evt.payload,
                }
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
                return {
                  ...ctx,
                  chapterId: evt.payload,
                }
              }),
            },
          },
        },
        sectionList: {
          on: {
            PREVIOUS: 'chapter',
            NEXT: '#buildEssayQuestion.questionInfo',
            SET_SECTION_IDS: {
              actions: assign((ctx, evt) => {
                const { associatedTextSectionsIds } = ctx.essayQuestionInfo
                if (
                  ctx.essayQuestionInfo.associatedTextSectionsIds.includes(
                    evt.payload
                  )
                ) {
                  const sectionIdIndex = associatedTextSectionsIds.findIndex(
                    (index) => index === evt.payload
                  )
                  return {
                    ...ctx,
                    essayQuestionInfo: {
                      ...ctx.essayQuestionInfo,
                      associatedTextSectionsIds: [
                        ...ctx.essayQuestionInfo.associatedTextSectionsIds.slice(
                          0,
                          sectionIdIndex
                        ),
                        ...ctx.essayQuestionInfo.associatedTextSectionsIds.slice(
                          sectionIdIndex + 1
                        ),
                      ],
                    },
                  }
                } else
                  return {
                    ...ctx,
                    essayQuestionInfo: {
                      ...ctx.essayQuestionInfo,
                      associatedTextSectionsIds: [
                        ...ctx.essayQuestionInfo.associatedTextSectionsIds,
                        evt.payload,
                      ],
                    },
                  }
              }),
            },
          },
        },
      },
    },
    questionInfo: {
      on: {
        SET_QUESTION_PARTS: {
          actions: assign((ctx, evt) => {
            const { keyName, payload } = evt
            return {
              ...ctx,
              essayQuestionInfo: {
                ...ctx.essayQuestionInfo,
                questionPartsInput: {
                  ...ctx.essayQuestionInfo.questionPartsInput,
                  [keyName]: payload,
                },
              },
            }
          }),
        },
      },
    },
  },
})
