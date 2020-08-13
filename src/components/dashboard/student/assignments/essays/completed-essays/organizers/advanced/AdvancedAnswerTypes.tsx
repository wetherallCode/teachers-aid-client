import React, { FC, useState } from 'react'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAnswerType,
  setAnswerTypeVariables,
  QuestionTypeEnum,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer,
  findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer,
} from '../../../../../../../../schemaTypes'
import { useMutation } from '@apollo/client'

import { AdvancedHowProblemSolution } from './AdvancedHowProblemSolution'
import { AdvancedHowCauseEffect } from './AdvancedHowCauseEffect'
import { AdvancedWhyCauseEffect } from './AdvancedWhyCauseEffect'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'
import { useCompletedEssayContextProvider } from '../../state/CompletedEssayContext'
import { SET_ANSWER_TYPE_MUTATION } from '../../../assigned-essays/organizers/academic/AcademicAnswerTypes'
import { Modal } from '../../../../../../../../animations'

export type AdvancedAnswerTypesProps = {
  advancedOrganizer: findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer
}

export const AdvancedAnswerTypes: FC<AdvancedAnswerTypesProps> = ({
  advancedOrganizer,
}) => {
  const [modal, setModal] = useState(false)
  const [state, event] = useCompletedEssayContextProvider()
  const { questionTypeEnum } = useEnumContextProvider()

  const [setAnswerType] = useMutation<setAnswerType, setAnswerTypeVariables>(
    SET_ANSWER_TYPE_MUTATION,
    {
      variables: {
        input: {
          essayId: state.context.essayId,
          questionType: state.context.advancedOrganizer.questionType,
        },
      },
      onCompleted: (data) => {
        const { questionType } = data.setAnswerType.essay.workingDraft
          .organizer as findCompletedEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer
        event({
          type: 'SET_FULL_QUESTION_TYPE',
          payload: questionType!,
        })
      },
      refetchQueries: ['findEssayById'],
    }
  )
  // useEffect(() => {
  //   setAnswerType()
  // }, [setAnswerType, state.context.advancedOrganizer.questionType])

  return (
    <>
      <span>What is the Question Type: </span>
      <span>
        <select
          value={state.context.advancedOrganizer.questionType}
          onChange={(e: any) => {
            if (e.target.value !== 'none') {
              event({
                type: 'SET_FULL_QUESTION_TYPE',
                payload: e.target.value,
              })
            }
          }}
        >
          <option value={'none'}>Pick a Question Type</option>
          {questionTypeEnum.map((question: QuestionTypeEnum) => (
            <option key={question} value={question}>
              {question === 'HOW_PROBLEM_SOLUTION'
                ? 'How: Problem and Solution'
                : question === 'HOW_CAUSE_EFFECT'
                ? 'How: Cause and Effect'
                : 'Why: Cause and Effect'}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setModal(true)
          }}
        >
          Change Question Type
        </button>
        <Modal isToggled={modal} setIsToggled={setModal}>
          <div>
            Choosing new Question type will permanently delete information. Are
            you sure you want to do this?
          </div>
          <button
            onClick={() => {
              setAnswerType()
              setModal(false)
            }}
          >
            Yes
          </button>
          <button onClick={() => setModal(false)}>NO</button>
        </Modal>
      </span>

      {advancedOrganizer.questionType ===
        QuestionTypeEnum.HOW_PROBLEM_SOLUTION && <AdvancedHowProblemSolution />}
      {advancedOrganizer.questionType === QuestionTypeEnum.HOW_CAUSE_EFFECT && (
        <AdvancedHowCauseEffect />
      )}
      {advancedOrganizer.questionType === QuestionTypeEnum.WHY_CAUSE_EFFECT && (
        <AdvancedWhyCauseEffect />
      )}
    </>
  )
}
