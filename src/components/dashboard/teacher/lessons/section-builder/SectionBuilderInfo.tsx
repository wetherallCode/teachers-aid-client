import React, { FC, useReducer, useEffect } from 'react'
import { VocabInfo } from './VocabInfo'
import { QuestionsInfo } from './QuestionsInfo'
import { gql } from '@apollo/client'
import {
  TextSectionProtocolsInput,
  TextSectionQuestionsInput,
  TextSectionVocabInput,
  PageNumbersInput,
} from '../../../../../schemaTypes'
import { ProtocolsInfo } from './ProtocolsInfo'
import { CreateTextSection } from './CreateTextSection'

type SectionBuilderInfoProps = {
  chapterID: string
}

const initialState: State = {
  fromChapterId: '',
  header: '',
  pageNumbers: {
    startingPage: 0,
    endingPage: 0,
  },
  hasProtocols: [],
  hasQuestions: [],
  hasVocab: [],
}
export type TextSectionInputAction = {
  type: string
  payload: any
}
export type State = {
  fromChapterId: string
  hasProtocols: TextSectionProtocolsInput[]
  hasQuestions: TextSectionQuestionsInput[]
  hasVocab: TextSectionVocabInput[]
  header: string
  pageNumbers: PageNumbersInput
}

const textSectionInputReducer = (
  state: State,
  action: TextSectionInputAction
) => {
  switch (action.type) {
    case 'addChapterID':
      return {
        ...state,
        fromChapterId: action.payload,
      }
    case 'addHeader':
      return {
        ...state,
        header: action.payload,
      }
    case 'addStartingPage':
      return {
        ...state,
        pageNumbers: {
          ...state.pageNumbers,
          startingPage: Number(action.payload),
        },
      }
    case 'addEndingPage':
      return {
        ...state,
        pageNumbers: {
          ...state.pageNumbers,
          endingPage: Number(action.payload),
        },
      }
    case 'addVocabListItem':
      return {
        ...state,
        hasVocab: [...state.hasVocab, action.payload],
      }
    case 'addQuestionsItem':
      return {
        ...state,
        hasQuestions: [...state.hasQuestions, action.payload],
      }
    case 'addProtocolItem': {
      return {
        ...state,
        hasProtocols: [...state.hasProtocols, action.payload],
      }
    }
    default:
      return state
  }
}

export const SectionBuilderInfo: FC<SectionBuilderInfoProps> = ({
  chapterID,
}) => {
  // const [textSectionInputs, handleChange] = useForm({
  //   header: undefined,
  //   startingPage: undefined,
  //   endingPage: undefined,
  // })
  const [state, dispatch] = useReducer(textSectionInputReducer, initialState)

  useEffect(() => {
    if (chapterID) {
      dispatch({ type: 'addChapterID', payload: chapterID })
    }
  }, [chapterID])
  // const [vocabWordList, setVocabWordList] = useState<{}[]>([])
  // const [questionsList, setQuestionsList] = useState<{}[]>([])

  return (
    <div>
      <div>
        <div>Header:</div>
        <input
          type='text'
          name='header'
          onChange={(e: any) =>
            dispatch({ type: 'addHeader', payload: e.target.value })
          }
        />
      </div>
      <div>
        <div>Pages:</div>
        <input
          type='text'
          name='startingPage'
          onChange={(e: any) =>
            dispatch({ type: 'addStartingPage', payload: e.target.value })
          }
        />
        <input
          type='text'
          name='endingPage'
          onChange={(e: any) =>
            dispatch({ type: 'addEndingPage', payload: e.target.value })
          }
        />
      </div>
      <div>
        <VocabInfo dispatch={dispatch} />
        <QuestionsInfo dispatch={dispatch} />
        <ProtocolsInfo dispatch={dispatch} />
      </div>
      <CreateTextSection state={state} />
    </div>
  )
}
