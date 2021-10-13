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
  grid-template-columns: 1fr 1fr;
  font-size: 3vh;
  justify-items: center;
  align-items: center;
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
  height: 50vh;
`

export const QuizNameContainer = styled.div`
  grid-column: 1 / span 2;
  font-size: 2vh;
  justify-self: center;
  align-self: center;
`
export type IndividualQuizContainerProps = { grey: boolean }

export const IndividualQuizContainer = styled.div<IndividualQuizContainerProps>`
  background-color: ${({ grey }) => (grey ? 'var(--grey)' : 'var(--white')};
`
