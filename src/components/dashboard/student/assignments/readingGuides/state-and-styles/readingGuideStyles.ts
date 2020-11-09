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
  font-size: 1.3rem;
  align-self: start;
`

export const ReadingGuideSelect = styled.select`
  width: 25%;
  height: 50%;
  font-size: inherit;
  color: var(--blue);
`

export const ReadingGuideTextArea = styled.textarea`
  height: 90%;
  font-family: inherit;
  color: var(--blue);
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
