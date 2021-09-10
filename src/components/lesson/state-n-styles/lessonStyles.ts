import styled from 'styled-components'
import { Standard4x6Container, Standard8x12Container } from '../../../appStyles'

export const LessonMainMenuContainer = styled.div`
  grid-template-rows: 1fr 1fr;
  height: 47.5vh;
`

export const GreetingsContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  height: 100%;
  font-size: 3rem;
`

export const LessonSelectorContainer = styled.div`
  grid-template-columns: 1fr 1fr;
  font-size: 2rem;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const CurrentLessonContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
`

export const CurrentLesson = styled.div`
  font-size: 1.8rem;
  text-decoration: underline;
  justify-self: center;
`
export const LessonNameStyle = styled.div`
  font-size: 1.3rem;
  justify-self: center;
  align-self: center;
`
export const GoToLessonButton = styled.button`
  font-size: 1.1rem;
  border-radius: 5px;
  height: 55%;
  width: 75%;
  justify-self: center;
  background-color: var(--blue);
  color: var(--white);
`
export const LessonPageContainer = styled(Standard8x12Container)`
  height: 95vh;
`

export const ClassInfoContainer = styled.div`
  grid-row: 1/-2;
  grid-column: 1/4;
  display: grid;
  grid-template-rows: 1fr 5fr;
  color: var(--white);
  background-color: var(--blue);
  border-top: 3px solid var(--white);
  border-right: 3px solid var(--white);
`
export const ClassInfoStyle = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  align-self: auto;
  margin-top: 20%;
  font-size: 1.5rem;
`
export const StopLessonContainer = styled.div`
  grid-row: -2/-1;
  grid-column: 1/4;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: var(--blue);
  border-right: 3px solid var(--white);
`

export const StopLessonButton = styled.button`
  height: 30%;
  width: 70%;
  background-color: var(--grey);
  font-size: 1.5rem;
  color: var(--blue);
  border-radius: 5px;
  box-shadow: 1px 1px 1px black;
`

export const LessonMainScreen = styled.div`
  grid-row: 1/-2;
  grid-column: 4/-1;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
`
export const LessonComponentTypeContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-row: -2/-1;
  grid-column: 4/-1;
  background-color: var(--blue);
  grid-auto-flow: column;
`
export const LessonComponentTypeStyle = styled.div`
  color: var(--white);
  justify-self: center;
  font-size: 2rem;
  width: 80%;
  height: 80%;
  display: grid;
`

export const ProtocolsContainer = styled.div`
  grid-row: 1/-2;
  grid-column: 4/-1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
`

export const ProtocolTypeContainer = styled.div`
  grid-row: 1/3;
  grid-column: 1/-1;
  font-size: 3rem;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const ProtocolTaskContainer = styled.div`
  grid-row: 3/5;
  grid-column: 3/-3;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const ProtocolTask = styled.div`
  font-size: 2rem;
`

export const ProtocolResponseContainer = styled.div`
  grid-row: 6/8;
  grid-column: 3/-3;
  display: grid;
  grid-template-rows: 1fr 14fr;
`

export const ProtocolResponse = styled.div`
  justify-self: center;
  align-self: center;
`

export const ProtocolResponseHeader = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1.2rem;
`
export const ProtocolResponseArea = styled.textarea`
  width: 80%;
  height: 70%;
  justify-self: center;
  align-self: center;
`

export const ProtocolResponseButtonContainer = styled.div`
  grid-row: -2/-1;
  grid-column: 3/-3;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const ProtocolResponseButton = styled.button`
  width: 50%;
  height: 40%;
  font-size: 1.6rem;
  background-color: var(--blue);
  color: var(--white);
`

export const LessonComponentTitleContainer = styled.div`
  grid-row: 1/2;
  grid-column: 2/-2;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
`

export const LessonComponentDetailsContainer = styled.div`
  grid-row: 2/-1;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: 1fr 2fr;
`

export const LessonComponentDetailsStyle = styled.div`
  font-size: 2rem;
`

export const LessonDetailsContainer = styled.div`
  grid-row: 2/-1;
  grid-column: 1/-1;
  display: grid;
  /* justify-items: center;
  align-items: center; */
  grid-template-rows: 1fr 1fr 1fr 6fr;
  font-size: 2vw;
`
export const LessonDetailCenter = styled.div`
  justify-self: center;
  margin-bottom: 3%;
`

export const LessonDetailLeft = styled.div`
  justify-self: left;
`
export const VocabWordContainer = styled.ul`
  grid-row: 2/-1;
  grid-column: 1/-1;
  margin-left: 3%;
  font-size: 3vh;
  overflow: scroll;
`
export const VocabWordStyle = styled.li`
  margin-bottom: 3%;
`

export const StudentQuestionContainer = styled.div``
export const AskAQuestionButton = styled.button`
  width: 35%;
  height: 38%;
  font-size: 1.2rem;
  color: var(--blue);
  border-radius: 5px;
  justify-self: center;
  align-self: center;
`
export const QuestionContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  grid-column-gap: 1%;
  height: 40%;
  align-self: center;
`
export const QuestionInput = styled.input`
  font-size: 1.3rem;
  color: var(--blue);
`
export const QuestionSubmitButton = styled.button`
  background-color: var(--grey);
  color: var(--blue);
  border-radius: 5px;
  font-size: 1.3rem;
`
export const CancelQuestion = styled.button`
  background-color: var(--red);
  color: var(--white);
  border-radius: 5px;
  font-size: 1.3rem;
`
export const AssignedSeatsContainer = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-rows: 1fr 10fr;
  font-size: 2vh;
`

export const AssignedSeatsTitleContainer = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 5vh;
  text-decoration: underline;
`
export const AssignedSeatsStudentListContainer = styled.div`
  border-bottom: 1px solid var(--blue);
`

export type AssignedSeatsStudentListItemProps = {
  indexNumber: number
}

export const AssignedSeatsStudentListItemHeaders = styled.div`
  display: grid;
  grid-template-columns: 4fr 5fr;
`

export const AssignedSeatsStudentListItem = styled(
  AssignedSeatsStudentListItemHeaders
)<AssignedSeatsStudentListItemProps>`
  border-top: 1px solid var(--blue);
  grid-auto-flow: column;
  background-color: ${({ indexNumber }) =>
    indexNumber % 2 ? 'var(--white)' : 'var(--grey)'};
`
