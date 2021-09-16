import styled from 'styled-components'
import {
  Standard8x12Container,
  Standard4x6Container,
} from '../../../../../../appStyles'
import {
  SubmitEssayContainer,
  OrganizerControlButton,
} from '../../essays/assigned-essays/state-and-styles/assignedEssayStyles'

export const ReadingGuideContainer = styled(Standard8x12Container)`
  height: 95vh;
  border-top: 3px solid var(--white);
`

export const ReadingGuideDetailsContainer = styled.div`
  grid-row: 1/4;
  grid-column: -4/-1;
  background-color: var(--blue);
  color: var(--white);
  border-left: 3px solid var(--white);
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`

export const ReadingGuideInfoContainer = styled(Standard8x12Container)`
  grid-row: 4/-1;
  grid-column: -4/-1;
  background-color: var(--grey);
  color: var(--blue);
  border-left: 3px solid var(--white);
  border-top: 3px solid var(--white);
  font-size: 1.3rem;
`

export const ReadingGuideInfoSwitchButtonContainer = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
`

export const ReadingGuideInfoSwitchButton = styled.button`
  width: 75%;
  height: 50%;
  font-size: larger;
  background-color: var(--blue);
  color: var(--white);
`
export const ReadingGuideInfoTitle = styled.div`
  grid-row: 2/3;
  grid-column: 1/-1;
  justify-self: center;
  align-self: center;
  text-decoration: underline;
`
export const ReadingGuideInfoBody = styled.div`
  grid-row: 3/-1;
  grid-column: 1/-2;
  overflow: scroll;
`

export const ReadingGuideToCompleteContainer = styled(Standard8x12Container)`
  grid-row: 1/-1;
  grid-column: 1/-4;
  font-size: 1.1rem;
  border: 1px solid var(--blue);
`

export const ReadingGuideHeader = styled.div`
  grid-row: 1/2;
  grid-column: 2/-2;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
  text-decoration: underline;
`
export const QuestionBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
`
export const Required = styled.span`
  color: var(--red);
`
export const SectionOrganizationContainer = styled.div`
  grid-row: 2/3;
  grid-column: 2/-2;
  display: grid;
  grid-template-rows: 1fr 4fr;
`

export const SectionOrganizationBodyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: left;
  align-items: start;
`
export const SectionOrganizationBodyEntry = styled.li``

export const ReadingGuideInput = styled.input`
  border: 1px solid var(--white);
  border-bottom: 1px solid var(--blue);
  width: 100%;
  color: var(--blue);
  background-color: transparent;
  font-size: 2.5vh;
  align-self: start;
  &:focus {
    outline: none;
  }
`

export const InputAndButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-column-gap: 1%;
`

export const ReadingGuideSelect = styled.select`
  width: 25%;
  height: 50%;
  font-size: inherit;
  color: var(--blue);
`

export const ReadingGuideQuestion = styled.div`
  grid-row: 2/-2;
  grid-column: 2/-2;
  font-size: 3vh;
  display: grid;
`

export const ReadingGuideProblemsQuestionContainer = styled.form`
  grid-row: 2/-2;
  grid-column: 2/-2;
  font-size: 3vh;
  display: grid;

  /* justify-items: center; */
  align-items: center;
`

export const ProblemsListContainer = styled.div`
  align-self: start;
  font-size: 2.5vh;
  height: 100%;
  overflow: scroll;
  display: grid;
  grid-template-rows: 1fr 4fr;
`

export const ProblemsLisContainerTitle = styled.div`
  justify-self: center;
  align-self: center;
`

export const ProblemsListItem = styled.div`
  cursor: pointer;
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
`
export const ProblemsToSelectContainer = styled.div``

export const ButtonContainer = styled.div`
  justify-items: center;
  display: grid;
  grid-auto-flow: column;
`

export const BlueButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  font-size: 2vh;
  border-radius: 5px;
`
export const NextButton = styled(BlueButton)`
  width: 35vh;
`

export const GreyButton = styled(BlueButton)`
  background-color: var(--grey);
  color: var(--blue);
`

export const ReadingGuideBiggestProblemContainer = styled(ReadingGuideQuestion)`
  grid-template-rows: 1fr 4fr;
  /* align-items: center; */
`

export const Title = styled.div`
  align-self: center;
  justify-self: center;
`

export type BiggestProblemListItemProps = {
  selected: boolean
}
export const BiggestProblemListItem = styled.div<BiggestProblemListItemProps>`
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  cursor: pointer;
  width: fit-content;
`

export const ReadingGuideReasonForBiggestProblemContainer = styled(
  ReadingGuideQuestion
)`
  grid-template-rows: 1fr 2fr 1fr;
`

export const SmallBlueButton = styled(BlueButton)`
  height: 3vh;
`

export const SmallNextButton = styled(SmallBlueButton)`
  width: 35vh;
`

export const ImportantPeopleContainer = styled(
  ReadingGuideProblemsQuestionContainer
)``

export const HowAreImportantPeopleContectedContainer = styled(
  ReadingGuideQuestion
)`
  grid-template-rows: 1fr 2fr 3fr 1fr;
`

export const SectionConsequencesContainer = styled(ReadingGuideQuestion)``

export const ReadingGuideTextArea = styled.textarea`
  height: 90%;
  font-family: inherit;
  color: var(--blue);
  background-color: transparent;
  font-size: 2.5vh;
  align-self: start;
  &:focus {
    outline: none;
  }
`
export const ReasonForOrganizationContainer = styled(QuestionBlock)`
  grid-row: 3/4;
  grid-column: 2/-2;
`

export const MajorIssueContainer = styled(QuestionBlock)`
  grid-row: 4/5;
  grid-column: 2/-2;
`

export const MajorIssueSolvedContainer = styled(QuestionBlock)`
  grid-row: 5/6;
  grid-column: 2/-2;
`
export const MajorSolutionContainer = styled(QuestionBlock)`
  grid-row: 6/7;
  grid-column: 2/-2;
`
export const ClarifyingQuestionsContainer = styled.div`
  grid-row: 2/8;
  grid-column: 2/-2;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
`
export const ClarifyingQuestionsTitle = styled.div`
  grid-row: 1/2;
  align-self: center;
`
export const ClarifyingQuestionsForm = styled.form`
  grid-row: 2/4;

  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-column-gap: 1%;
`

export const ClarifyingQuestionsTextArea = styled(ReadingGuideTextArea)`
  height: 80%;
  align-self: center;
`
export const ClarifyingQuestionsAddButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  font-size: larger;
  height: 50%;
  align-self: center;
`

export const ClarifyingQuestionsSubmittedQuestionsDisplay = styled.div`
  grid-row: 4/8;
  display: grid;
  grid-template-rows: 1fr 4fr;
`
export const ClarifyingQuestionsBlock = styled.div``

export const ClarifyingQuestionsSubmittedQuestion = styled.div`
  :hover {
    color: var(--red);
  }
`

export const ClarifyingQuestionsSubmittedQuestionTitle = styled.div`
  justify-self: center;
  text-decoration: underline;
`

export const SubmitReadingGuideContainer = styled(SubmitEssayContainer)`
  grid-row: 8/9;
  grid-column: 2/-2;
`
export const SubmitReadingGuideButton = styled(OrganizerControlButton)``
