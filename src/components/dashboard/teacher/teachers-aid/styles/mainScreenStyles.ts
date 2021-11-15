import styled from 'styled-components'

export const VirtualProtocolContainer = styled.div`
  overflow: scroll;
`
export const AssignmentControlPanelContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
`
export const HomeworkAssingerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 1fr 5fr; */
  height: 100%;
`

export const HomeworkAssignerTitleContainer = styled.div`
  /* grid-column: 1 / span 2; */
  font-size: 4vh;
  align-self: center;
  justify-self: center;
`
export const AssignmentControlSelector = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  font-size: 3vh;
  justify-items: center;
  align-items: center;
  background-color: var(--blue);
  color: var(--white);
`
export const AssignmentControlItem = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const AssignmentBlockContainer = styled.div`
  align-self: center;
  justify-self: center;
  font-size: 2.2vh;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const TextStyle = styled.div`
  align-self: center;
  justify-self: center;
  text-decoration: underline;
`
export const ResponseStyle = styled.div`
  align-self: center;
  justify-self: center;
`

export type AssignButtonType = {
  called: boolean
}
export const AssignButton = styled.button<AssignButtonType>`
  background-color: ${({ called }) => (called ? 'var(--grey)' : 'var(--blue)')};
  color: ${({ called }) => (called ? 'var(--blue)' : 'var(--white)')};
`

export const QuizControlPanelContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 10fr;
  grid-template-columns: 1fr;
  height: 55vh;
`

export const QuizNameContainer = styled.div`
  grid-column: 1 / span 2;
  font-size: 2.5vh;
  display: grid;
  grid-template-columns: 4fr 1fr;
  justify-items: center;
  align-items: center;
`

export const AssignAllQuizzesButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  width: 15vh;
  border-radius: 5px;
  font-size: 2vh;
`

export type IndividualQuizContainerProps = { grey: boolean }

export const IndividualQuizContainer = styled.div<IndividualQuizContainerProps>`
  background-color: ${({ grey }) => (grey ? 'var(--grey)' : 'var(--white')};
`
export const IndividualQuizControlContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: 100%;
`

export const QuizStatusIndicator = styled.div`
  justify-self: left;
`

export type AssignQuizButtonProps = { assigned: boolean }

// export const AssignQuizButton = styled.button<AssignQuizButtonProps>`
//   background-color: ${({ assigned }) =>
//     assigned ? 'var(--red)' : 'var(--blue'};
//   color: ;
// `

export const ReadingGuideReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  height: 50vh;
  justify-items: center;
  align-items: center;
`
export const ReadingGuideControlArrowContainer = styled.div`
  font-size: 5vh;
  cursor: pointer;
  /* height */
`
