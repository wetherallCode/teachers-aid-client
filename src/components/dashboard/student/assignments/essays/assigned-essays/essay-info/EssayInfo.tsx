import React, { FC } from 'react'
import {
  EssayInfoSwitchButtonContainer,
  EssayInfoSwitchButton,
} from '../state-and-styles/essayInfoStyles'
import { useStudentEssayContextProvider } from '../state-and-styles/StudentEssayContext'
import { findEssayById_findEssayById_essay_lessonInfo_vocabList } from '../../../../../../../schemaTypes'
import { Vocab } from './Vocab'
import { EssayHelp } from './EssayHelp'
import { Rubrics } from './Rubrics'

export type EssayInfoProps = {
  vocabList: findEssayById_findEssayById_essay_lessonInfo_vocabList[]
}

export const EssayInfo: FC<EssayInfoProps> = ({ vocabList }) => {
  const [state, event] = useStudentEssayContextProvider()

  return (
    <>
      <EssayInfoSwitchButtonContainer>
        <EssayInfoSwitchButton
          onClick={() => event({ type: 'SET_HELP_DISPLAY' })}
        >
          Help
        </EssayInfoSwitchButton>
        <EssayInfoSwitchButton
          onClick={() => event({ type: 'SET_VOCAB_DISPLAY' })}
        >
          Vocab
        </EssayInfoSwitchButton>
        {state.matches('workingDraft') && (
          <EssayInfoSwitchButton
            onClick={() => event({ type: 'SET_RUBRIC_DISPLAY' })}
          >
            Rubric
          </EssayInfoSwitchButton>
        )}
      </EssayInfoSwitchButtonContainer>
      {state.context.helpDisplay && <EssayHelp />}
      {state.context.vocabDisplay && <Vocab vocabList={vocabList} />}
      {state.context.rubricDisplay && state.matches('workingDraft') && (
        <Rubrics />
      )}
    </>
  )
}
