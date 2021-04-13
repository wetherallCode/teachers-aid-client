import React, { useEffect, useState } from 'react'

import {
  FindTextSectionById,
  FindTextSectionByIdVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateTextSection,
  updateTextSectionVariables,
  TextSectionVocabInput,
  TextSectionProtocolsInput,
  AcademicOutcomeTypes,
  ProtocolActivityTypes,
  TextSectionQuestionsInput,
  QuestionTypeEnum,
} from '../../../../../schemaTypes'
import { useSectionEditorContextProvider } from './state-n-styles/sectionEditorContext'
import {
  gql,
  useQuery,
  useMutation,
  MutationFunctionOptions,
} from '@apollo/client'
import { AddVocabWord } from './vocab/AddVocabWord'
import { AddQuestion } from './questions/AddQuestion'
import { VocabBox } from './vocab/VocabBox'
import { QuestionsBox } from './questions/QuestionsBox'
import { AddProtocols } from './protocols/AddProtocols'
import { ProtocolsBox } from './protocols/ProtocolsBox'
import { Modal } from '../../../../../animations'
import { ListBoxes } from './state-n-styles/sectionEditorStyles'
import { EditSectionInfo } from './edit-section-info/EditSectionInfo'
import { EditProtocol } from './protocols/EditProtocol'
import { EditQuestion } from './questions/EditQuestion'
import { EditVocabWord } from './vocab/EditVocabWord'

export const FIND_TEXT_SECTION_BY_ID_QUERY = gql`
  query FindTextSectionById($input: FindTextSectionByIdInput!) {
    findTextSectionById(input: $input) {
      textSection {
        _id
        header
        pageNumbers {
          startingPage
          endingPage
        }
        hasVocab {
          word
          definition
        }
        hasQuestions {
          question
          questionType
        }
        hasProtocols {
          activityType
          academicOutcomeTypes
          task
        }
      }
    }
  }
`

export const TEXT_SECTION_UPDATER_MUTATION = gql`
  mutation updateTextSection($input: UpdateTextSectionInput!) {
    updateTextSection(input: $input) {
      textSection {
        _id
      }
    }
  }
`

export type UpdateTextSectionMutationProps = (
  options?:
    | MutationFunctionOptions<updateTextSection, updateTextSectionVariables>
    | undefined
) => void

export const TextSectionEditorDisplay = () => {
  const [vocabWord, setVocabWord] = useState<TextSectionVocabInput>({
    word: '',
    definition: '',
  })
  const [protocolItem, setProtocolItem] = useState<TextSectionProtocolsInput>({
    academicOutcomeTypes: AcademicOutcomeTypes.LOGIC_BUILDING,
    activityType: ProtocolActivityTypes.THINK_PAIR_SHARE,
    task: '',
    isActive: false,
    completed: false,
  })
  const [questionsItem, setQuestionsItem] = useState<TextSectionQuestionsInput>(
    { question: '', questionType: QuestionTypeEnum.WHY_CAUSE_EFFECT }
  )

  const [showVocabItemInputs, toggleVocabItemInputs] = useState(false)
  const [showQuestionsItemInputs, toggleQuestionsItemInputs] = useState(false)
  const [showProtocolItemInputs, toggleProtocolItemInputs] = useState(false)
  const [currentIndexForItem, setCurrentIndexForItem] = useState<number>(0)

  const [state, event] = useSectionEditorContextProvider()

  const { loading, data } = useQuery<
    FindTextSectionById,
    FindTextSectionByIdVariables
  >(FIND_TEXT_SECTION_BY_ID_QUERY, {
    variables: {
      input: { _id: state.context.sectionId },
    },
    onError: (error) => console.error(error),
    onCompleted: (data) => {
      event({
        type: 'SET_HEADER',
        header: data.findTextSectionById.textSection.header,
      })
      event({
        type: 'SET_PAGE_NUMBERS',
        payload: data.findTextSectionById.textSection.pageNumbers,
      })
      data.findTextSectionById.textSection.hasVocab &&
        event({
          type: 'SET_VOCAB_LIST',
          payload: data.findTextSectionById.textSection.hasVocab?.map(
            (word) => ({
              word: word.word,
              definition: word.definition,
            })
          ),
        })
      data.findTextSectionById.textSection.hasQuestions &&
        event({
          type: 'SET_QUESTIONS_LIST',
          payload: data.findTextSectionById.textSection.hasQuestions?.map(
            (question) => ({
              question: question.question,
              questionType: question.questionType,
            })
          ),
        })
      data.findTextSectionById.textSection.hasProtocols &&
        event({
          type: 'SET_PROTOCOLS_LIST',
          payload: data.findTextSectionById.textSection.hasProtocols?.map(
            (protocol) => ({
              academicOutcomeTypes: protocol.academicOutcomeTypes,
              activityType: protocol.activityType,
              task: protocol.task,
              isActive: false,
              completed: false,
            })
          ),
        })
    },
  })

  const [updateTextSection] = useMutation<
    updateTextSection,
    updateTextSectionVariables
  >(TEXT_SECTION_UPDATER_MUTATION, {
    variables: {
      input: {
        _id: state.context.sectionId,
        header: state.context.header,
        pageNumbers: {
          startingPage: state.context.pageNumbers.startingPage,
          endingPage: state.context.pageNumbers.endingPage,
        },
        fromChapterId: state.context.fromChapterId,
        hasQuestions: state.context.hasQuestions,
        hasProtocols: state.context.hasProtocols,
        hasVocab: state.context.hasVocab,
      },
    },
    // onCompleted: (updateData) => console.log(updateData),
    refetchQueries: ['FindTextSectionById'],
  })

  useEffect(() => {
    updateTextSection()
  }, [state.context])
  console.log(state.value)
  if (loading) return <div>Loading </div>
  return (
    <div>
      <EditSectionInfo textSection={data?.findTextSectionById.textSection!} />
      <ListBoxes>
        <VocabBox
          setCurrentIndexForItem={setCurrentIndexForItem}
          toggleVocabItemInputs={toggleVocabItemInputs}
          updateTextSection={updateTextSection}
        />

        <QuestionsBox
          setCurrentIndexForItem={setCurrentIndexForItem}
          toggleQuestionsItemInputs={toggleQuestionsItemInputs}
          updateTextSection={updateTextSection}
        />

        <ProtocolsBox
          setCurrentIndexForItem={setCurrentIndexForItem}
          toggleProtocolItemInputs={toggleProtocolItemInputs}
          updateTextSection={updateTextSection}
        />
      </ListBoxes>
      {showVocabItemInputs && (
        <Modal
          isToggled={showVocabItemInputs}
          setIsToggled={toggleVocabItemInputs}
        >
          <AddVocabWord
            state={state}
            event={event}
            vocabWord={vocabWord}
            setVocabWord={setVocabWord}
            currentIndexForItem={currentIndexForItem}
            updateTextSection={updateTextSection}
            toggleVocabItemInputs={toggleVocabItemInputs}
          />
        </Modal>
      )}
      {showQuestionsItemInputs && (
        <Modal
          isToggled={showQuestionsItemInputs}
          setIsToggled={toggleQuestionsItemInputs}
        >
          <AddQuestion
            state={state}
            event={event}
            questionsItem={questionsItem}
            setQuestionsItem={setQuestionsItem}
            currentIndexForItem={currentIndexForItem}
            updateTextSection={updateTextSection}
            toggleQuestionsItemInputs={toggleQuestionsItemInputs}
          />
        </Modal>
      )}
      {showProtocolItemInputs && (
        <Modal
          isToggled={showProtocolItemInputs}
          setIsToggled={toggleProtocolItemInputs}
        >
          <AddProtocols
            currentIndexForItem={currentIndexForItem}
            event={event}
            protocolItem={protocolItem}
            setProtocolItem={setProtocolItem}
            state={state}
            updateTextSection={updateTextSection}
            toggleProtocolItemInputs={toggleProtocolItemInputs}
          />
        </Modal>
      )}
      {state.context.protocolToEdit && <EditProtocol />}
      {state.context.questionToEdit && <EditQuestion />}
      {state.context.vocabWordToEdit && <EditVocabWord />}
    </div>
  )
}
