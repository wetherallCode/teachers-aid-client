import styled from 'styled-components'
import { Standard8x12Container } from '../../../../../../../../appStyles'
import {
  EssayOrganizerSheet,
  OrganizerContainer,
} from '../../../../../../student/assignments/essays/assigned-essays/state-and-styles/assignedEssayStyles'

export const EssaysToGradeContainer = styled(Standard8x12Container)``

export const EssayGraderContainer = styled(Standard8x12Container)`
  height: 95vh;
`

export const EssayScreen = styled(Standard8x12Container)`
  grid-row: 1/-2;
  grid-column: 1/-4;
  border-right: 1px solid var(--blue);
  border-bottom: 1px solid var(--blue);
`

export const EssayToGradeContainer = styled.div`
  grid-row: 2/-2;
  grid-column: -2/-6;
  border: 1px solid var(--blue);
  font-size: 1.1vw;
  padding: 4%;
`
export const PreviousEssayContainer = styled.div`
  grid-row: 2/-2;
  grid-column: 2/6;
  border: 1px solid var(--blue);
  font-size: 1.1vw;
  padding: 4%;
`
export const DraftName = styled.div`
  text-align: center;
`

export const OrganizerForEssayToGradeContainer = styled(Standard8x12Container)`
  grid-row: 2/-2;
  grid-column: 2/6;
  border: 1px solid var(--blue);
  font-size: 1.5vh;
`

export const NameContainer = styled.div`
  grid-row: -1/-2;
  grid-column: 1/-4;
  background-color: var(--blue);
  color: var(--white);
  border-top: 3px solid var(--white);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

export const ReturnEssayContainer = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1.2vw;
`
export const NameAndAssignmentContainer = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1.2vw;
`

export const GoBackButton = styled.div`
  margin-right: 5%;
  grid-row: 1/2;
  grid-column: 1/3;
  color: var(--blue);
  font-size: 1.5vw;
`

export const ReturnEssayButton = styled.button`
  margin-left: 5%;
  background-color: var(--grey);
  color: var(--blue);
  width: 150%;
  font-size: 2vw;
  border-radius: 5px;
`

export const GradeDetailsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 5fr;
`
export const GradeDetailsSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

export type GradeDetailsSelectorProps = {
  selected: boolean
}
export const GradeDetailsSelector = styled.div<GradeDetailsSelectorProps>`
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
`

export const DraftSelectorLeft = styled.span`
  grid-row: 4/6;
  grid-column: 1/2;
  font-size: 1.5vw;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const DraftSelectorRight = styled.span`
  grid-row: 4/6;
  grid-column: 6/7;
  font-size: 1.5vw;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const GradingToolContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: -1/-4;
  background-color: var(--grey);
  border-left: 3px solid var(--white);
`
export const RubricContainer = styled(Standard8x12Container)`
  grid-row: 1/6;
  grid-column: 1/-1;
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
`
export const RubricTypeTitle = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  font-size: 2vw;
  display: grid;
  justify-items: center;
  align-items: center;
  text-decoration: underline;
`
export const RubricSectionEnumContainer = styled.div`
  grid-row: 2/3;
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: 1.8vw;
  cursor: default;
`

export const RubricCheckBoxContainer = styled.div`
  grid-row: 3/-1;
  grid-column: 1/-1;
  overflow-y: scroll;
  font-size: 1.5vw;
  display: grid;
  align-items: center;
  justify-items: start;
`

export const RubricCheckBoxInput = styled.input`
  align-self: center;
  height: 1.5vw;
  width: 1.5vw;
  :checked {
    color: var(--red);
  }
`

export const AdditionalCommentsContainer = styled.div`
  grid-row: 6/-1;
  grid-column: 1/-1;
  display: grid;
  height: 100%;
  overflow: scroll;
  grid-template-rows: 1fr 1fr 5fr;
  border-top: 1px solid var(--blue);
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
`
export const AdditionalCommentTitle = styled.div`
  text-align: center;
  font-size: 2vw;
`
export const AddCommentContainer = styled.form`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 10%;
  margin-bottom: 2%;
`

export const AddCommentInput = styled.input`
  width: 80%;
  height: 3vh;
  font-size: 1vw;
  color: var(--blue);
`

export const AddCommentButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  height: 3.4vh;
  font-size: 1.4vw;
`
export const Comments = styled.div`
  font-size: 1.4vw;
  margin-bottom: 1%;
  margin-left: 1%;
`

export const EditorToolBar = styled.div`
  display: grid;
  grid-row: 8/-1;
  grid-column: 1/-1;
  margin: 1.4%;
`

export const EditorToolBarTitle = styled.div`
  justify-self: center;
  text-decoration: underline;
`
