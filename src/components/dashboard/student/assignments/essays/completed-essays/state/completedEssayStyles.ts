import styled from 'styled-components'
import {
  AssignmentDetailsContainer,
  AssignmentDetailsPartContainers,
  OrganizerContainer,
  EssayEditorContainer,
  SubmitEssayContainer,
  OrganizerControlButton,
  EssaySheet,
} from '../../assigned-essays/state-and-styles/assignedEssayStyles'
import {
  EssayInfoTitle,
  EssayInfoBody,
} from '../../assigned-essays/state-and-styles/essayInfoStyles'

export const EssayViewContainer = styled(OrganizerContainer)``
export const CompletedEssayDetailsContainer = styled(
  AssignmentDetailsContainer,
)``
export const CompletedEssayDetailsPartContainers = styled(
  AssignmentDetailsPartContainers,
)``

export const DraftSelectorContainer = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 2rem;
`
export const DraftSelectorBack = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  cursor: default;
`
export const DraftSelectorDraftNumber = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`
export const DraftSelectorNext = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  cursor: default;
`
export const ScoreSheet = styled(EssaySheet)`
  display: grid;
  grid-template-rows: 1fr 3fr 3fr;
  padding-right: 1vh;
`
export const ScoreSheetScore = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3.5vh;
  padding-right: 1vh;
  /* text-decoration: underline; */
`
export const ScoreSheetRubricComments = styled.div`
  display: grid;
  grid-template-rows: 1fr 6fr;
  font-size: 2vh;
`
export const ScoreSheetAdditionalComments = styled.div`
  display: grid;
  grid-template-rows: 1fr 6fr;
  font-size: 2vh;
`

export const ScoreSheetRubricCommentsTitle = styled.div`
  justify-self: center;
  align-self: center;
  text-decoration: underline;
  font-size: 2.3vh;
`

export const RubricSectionTitle = styled.div`
  text-align: center;
  text-decoration: underline;
`

export const CompletedEssayContainer = styled(EssayEditorContainer)`
  grid-row: 2/-2;
`

export const EssayRedoButtonContainer = styled(SubmitEssayContainer)`
  grid-row: -2/-1;
`
export const CompletedEssayControlButton = styled(OrganizerControlButton)``

export const HowToImproveTitle = styled(EssayInfoTitle)`
  grid-row: 1/2;
`
export const HowToImproveBody = styled(EssayInfoBody)`
  grid-row: 2/-1;
`
