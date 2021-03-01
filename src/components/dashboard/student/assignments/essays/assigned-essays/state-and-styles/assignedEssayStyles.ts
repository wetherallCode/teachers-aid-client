import styled from 'styled-components'
import { Standard8x12Container } from '../../../../../../../appStyles'
import { Modal } from '../../../../../../../animations'

export const EssayContainer = styled(Standard8x12Container)`
  height: 95vh;
  border-top: 3px solid var(--white);
`
export const AssignmentDetailsContainer = styled.div`
  grid-row: 1/4;
  grid-column: -4/-1;
  background-color: var(--blue);
  color: var(--white);
  border-left: 3px solid var(--white);
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`
export const AssignmentDetailsPartContainers = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const AssignmentDetailsReadingInfo = styled.div`
  font-size: 1.4rem;
`

export const AssignmentDetailsDueDate = styled.div`
  font-size: 1.4rem;
`

export const AssignmentDetailsGoBackButtonContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`
export const AssignmentDetailsGoBackButton = styled.button`
  width: 80%;
  height: 3vh;
  font-size: 2vh;
  border-radius: 5px;
  color: var(--blue);
  background-color: var(--white);
  text-shadow: 1px 1px var(--grey);
`

export const EssayInfoContainer = styled(Standard8x12Container)`
  grid-row: 4/-1;
  grid-column: -4/-1;
  background-color: var(--grey);
  color: var(--blue);
  border-left: 3px solid var(--white);
  border-top: 3px solid var(--white);
  font-size: 1.3rem;
  overflow: scroll;
`
export const OrganizerContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 1/-4;
  border: 1px solid var(--blue);
`
export const OrganizerTitleContainer = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const OrganizerTitleStyle = styled.div`
  font-size: 3rem;
`
export const QuestionContainer = styled.div`
  grid-row: 2/3;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: top;
`

export const QuestionStyle = styled.div`
  font-size: 2rem;
`

export const QuestionTypeContainer = styled.div`
  grid-row: 3/5;
  grid-column: 3/-3;
  align-items: center;
  justify-items: center;
  font-size: 2rem;
  display: grid;
`
export const QuestionTypeQuestionStyle = styled.div`
  align-self: end;
`
export const QuestionTypeAnswerSelectStyle = styled.select`
  width: 17%;
  font-size: 72%;
  height: 37%;
  color: var(--blue);
  background-color: var(--white);
`

export const PartsOfQuestionContainer = styled.div`
  grid-row: 5/7;
  grid-column: 3/-3;
  display: grid;
`

export const AcademicPartsOfQuestionContainer = styled(
  PartsOfQuestionContainer
)`
  grid-row: 3/7;
`

export const PartsOfQuestionTitle = styled.div`
  font-size: 2rem;
  justify-self: center;
  align-self: center;
`

export const PartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: 1.3rem;
`

export const AcademicPartContainer = styled(PartContainer)`
  justify-items: left;
`

export const PartInput = styled.input`
  justify-self: left;
  border: 1px solid var(--white);
  font-size: 1.3rem;
  background-color: var(--white);
  color: var(--blue);
  border-bottom: 1px solid var(--blue);
  width: 100%;
  :enabled {
    border: 1px solid var(--white);
    border-bottom: 1px solid var(--blue);
  }
`

export const OrganizerControlButtonContainer = styled.div`
  grid-row: -2/-1;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
`

export const OrganizerControlButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  font-size: 3vh;
  width: 75%;
  height: 4vh;
  box-shadow: 1px 1px 2px 1px var(--grey);
  border-radius: 5px;
`

export type EssaySubmitButtonProps = {
  submitFinal?: boolean
  color: string
}

export const EssaySubmitButton = styled(
  OrganizerControlButton
)<EssaySubmitButtonProps>`
  font-size: 3vh;
  width: 75%;
  height: 4vh;
  box-shadow: 1px 1px 2px 1px var(--grey);
  border-radius: 5px;
  background-color: ${({ color }) => color};
`
export const EssaySubmitCheck = styled.div`
  font-size: 3vh;
`

export const RestatementContainer = styled.div`
  display: grid;
`
export const RestatementTitle = styled.div`
  grid-row: 3/5;
  grid-column: 3/-3;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 2rem;
`

export const AcademicRestatementContainer = styled(Standard8x12Container)`
  grid-row: 6/9;
  grid-column: 1/-1;
`
export const AcademicRestatementTitle = styled(RestatementTitle)`
  grid-row: 1/3;
`

export const AcademicQuestionTypeContainer = styled(Standard8x12Container)`
  grid-row: 3/7;
  grid-column: 3/-3;
`
export const AcademicQuestionTypeSelect = styled.select`
  grid-row: 3/5;
  grid-column: 1/-1;
  font-size: 1.5vw;
  color: var(--blue);
  background-color: var(--white);
  padding: 1%;
`
export const AcademicQuestionAnswerTypeContainer = styled(
  Standard8x12Container
)`
  grid-row: 3/-2;
  grid-column: 1/-1;
  grid-auto-flow: column;
`
export const QuestionTypeChangeButton = styled.div`
  grid-row: 3/-2;
  grid-column: 3/-3;
`

export const AnswerTypeContainter = styled(PartContainer)`
  grid-column: 3/-3;
  justify-items: left;
`

export const RestatementInput = styled.input`
  grid-row: 5/6;
  grid-column: 2/-2;
  border: 1px solid var(--blue);
  width: 100%;
  height: 4vh;
  font-size: 2vh;
  color: var(--blue);
  background-color: var(--white);
  :enabled {
    border: 1px solid var(--white);
    border-bottom: 1px solid var(--blue);
  }
`

export const AcademicConclusionInput = styled(RestatementInput)`
  grid-column: 3/-3;
  background-color: var(--white);
`

export const AcademicRestatementInput = styled.input`
  grid-row: 4/5;
  grid-column: 1/-1;
  height: 4vh;
  width: 100%;
  font-size: 2vh;
  border: 1px solid var(--white);
  color: var(--blue);
  background-color: var(--white);
  border-bottom: 1px solid var(--blue);
`

export const RestatementOutput = styled.div`
  grid-row: 6/8;
  grid-column: 2/-2;
  display: grid;
  justify-items: left;
  align-items: center;
  font-size: 1.2rem;
  color: var(--blue);
`
export const AcademicRestatementOutput = styled(RestatementOutput)`
  grid-row: 6/7;
`

export const AcademicConclusionOutput = styled(RestatementOutput)`
  grid-column: 3/-3;
`

export const AnswerInput = styled.textarea`
  grid-row: 5/6;
  grid-column: 3/-3;
  border: 1px solid var(--blue);
  /* width: 100%;*/
  height: 100%;
  font-size: 1.2rem;
  color: var(--blue);
  background-color: var(--white);
  font-family: inherit;
  /* :enabled {
    border: 1px solid var(--white);
    border-bottom: 1px solid var(--blue);
  } */
`
export const AnswerOutput = styled.div`
  grid-row: 6/8;
  grid-column: 3/-3;
  display: grid;
  justify-items: left;
  align-items: center;
  font-size: 1.2rem;
  color: var(--blue);
`

export const EssayEditorBackgroundContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 1/-4;
  border: 1px solid var(--blue);
  display: grid;
`

export const EssayEditorContainer = styled.div`
  grid-row: 1/-2;
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr 1fr;
`
export const EssaySheet = styled.div`
  margin: 3%;
  border: 1px solid black;
  box-shadow: 2px 2px 2px 1px var(--grey);
  height: 70vh;
  margin: 1.5vh;
  user-select: none;
`

export const EssayOrganizerSheet = styled(EssaySheet)`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(12, 1fr);
  font-size: 2vh;
`

export const EssayOrganizerTitle = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3.5vh;
  text-decoration: underline;
`

export const EssayOrganizerRestatement = styled.div`
  grid-row: 2/3;
  grid-column: 2/-2;
  display: grid;
  justify-items: center;
  align-items: center;
  border-top: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  border-left: 1px solid var(--blue);
  border-bottom: 1px solid var(--blue);
`

export const EssayOrganizerConclusion = styled.div`
  grid-row: -3/-2;
  grid-column: 2/-2;
  display: grid;
  justify-items: center;
  align-items: center;
  border-right: 1px solid var(--blue);
  border-left: 1px solid var(--blue);
  border-bottom: 1px solid var(--blue);
  border-top: 1px solid var(--blue);
`

export const EssayOrganizerAnswer = styled.div`
  grid-row: 3/7;
  grid-column: 2/-2;
`

export const DevelopingOrganizerAnswerBod = styled.div``

export const AcademicEssayOrganizerAnswer = styled(EssayOrganizerAnswer)`
  display: grid;
  grid-template-rows: 1fr 5fr;
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
`

export const AcademicEssayOrganizerAnswerBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
`

export const AcademicEssayOrganizerAnswerBlockHeader = styled.div`
  justify-self: center;
  align-self: center;
  text-decoration: underline;
  text-align: center;
`
export const AcademicEssayOrganizerAnswerBlockBody = styled.div`
  justify-self: center;
  align-self: start;
`

export const HowProblemSolutionOrganizerAnswer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`

export const HowCauseEffectOrganizerAnswer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
export const WhyCauseEffectOrganizerAnswer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

export const EssayOrganizerPartHeader = styled.div`
  font-size: 2.5vh;
  text-decoration: underline;
  justify-self: center;
  align-self: center;
`

export const EssayOrganizerPartBody = styled.div`
  /* font-size: 2; */
  align-self: start;
`

export const DevelopingEssayOrganizerPartBody = styled(EssayOrganizerPartBody)`
  justify-self: center;
`
export const EssayOrganizerRestatementBody = styled(EssayOrganizerPartBody)`
  /* align-self: start; */
`
export const SubmitEssayContainer = styled.div`
  grid-row: 1/-2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
`
export const SubmitEssayModalContainer = styled.div`
  width: 37vw;
  height: 15vh;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  background-color: var(--grey);
  color: var(--blue);
`
export const SubmitEssayModalMessage = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
`

export const SubmitEssayModal = styled(Modal)`
  width: 19%;
  top: 27%;
  left: 27%;
`

export const SubmitEssayModalSubmitButton = styled.button`
  width: 82%;
  height: 54%;
  background-color: var(--blue);
  color: var(--white);
`
