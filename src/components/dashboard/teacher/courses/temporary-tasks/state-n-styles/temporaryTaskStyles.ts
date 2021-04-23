import styled from 'styled-components'

export const TemporaryTasksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 95vh;
  background-color: var(--white);
  color: var(--blue);
`
export const TemporaryTasksMenuContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 2fr;
  background-color: var(--blue);
  color: var(--white);
`

export const TemporaryTasksMenu = styled.div`
  border-top: 3px solid var(--white);
  display: grid;
  grid-auto-rows: 10%;
`

export const MenuItems = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3vh;
  color: var(--white);
  cursor: pointer;
`
export const TemporaryTaskDisplay = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 5vh;
`

export const TaskCreatorHeader = styled.div`
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: 3vh;
`

export const TaskToGradeSelectorContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  grid-template-columns: 1fr 2fr 1fr;
`

export const TaskToGradeTitle = styled.div`
  font-size: 4vh;
  text-decoration: underline;
`

export const TaskListContainer = styled.div`
  border-bottom: 1px solid var(--blue);
`
export const TaskListHeaders = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  border-bottom: 1px solid var(--grey);
`
export const EndOfContainer = styled.div`
  justify-self: end;
  margin-right: 5%;
`
export const TaskListTaskGraderContainer = styled.div`
  overflow: scroll;
  height: 83vh;
`

export const TaskCompleteHeader = styled.div`
  justify-self: end;
  margin-right: 15%;
`

export type TaskListDataProps = {
  i: number
}
export const TaskListData = styled.div<TaskListDataProps>`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  background-color: ${({ i }) => (i % 2 ? 'var(--white)' : 'var(--grey)')};
`
export type TaskNameContainerProps = {
  studentPresent: boolean
}

export const TaskNameContainer = styled.div<TaskNameContainerProps>`
  align-self: center;
  color: ${({ studentPresent }) =>
    studentPresent ? 'var(--blue)' : 'var(--red)'};
`

export const MarkAbsentContainer = styled.div`
  margin: 5%;
`

export const MarkCompleteContainer = styled.div`
  align-self: center;
  justify-self: end;
  margin-right: 10%;
`

export type MarkCompleteButtonProps = {
  answered: boolean
  studentPresent: boolean
}

export const MarkCompleteButton = styled.button<MarkCompleteButtonProps>`
  background-color: ${({ answered, studentPresent }) =>
    !studentPresent ? 'var(--red)' : answered ? 'var(--blue)' : 'var(--grey)'};
  color: ${({ answered, studentPresent }) =>
    !studentPresent
      ? 'var(--white)'
      : answered
      ? 'var(--white)'
      : 'var(--blue)'};
  font-size: 1.6vh;
`

export const CreateTaskButton = styled.button`
  color: var(--white);
  background-color: var(--blue);
  font-size: 3vh;
  box-shadow: 2px 2px 2px gray;
`
export const ReviewTasksContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
`
export const TasksToSelectContainer = styled.div``

export const TaskTimerContainer = styled.div`
  display: grid;
`

export const TaskTimerControlsContainer = styled.div`
  display: grid;
  /* height: 100%; */
  grid-template-rows: 1fr 2fr;
  width: 100%;
  justify-items: center;
  align-items: center;
`
export const TaskTimerPresetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  cursor: default;
`

export const ReduceTaskTimer = styled.div`
  grid-row: 3/6;
  grid-column: 1/4;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
`

export const TaskTimerPresetDisplay = styled.div`
  grid-row: 2/7;
  grid-column: 4/8;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 5rem;
`

export const IncreaseTaskTimer = styled.div`
  grid-row: 3/6;
  grid-column: -1/-4;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
`

export const StartTaskTimer = styled.button`
  grid-row: -2/-3;
  grid-column: 3/-3;
  font-size: 1.2vw;
  color: var(--blue);
`

export const TaskTimeDisplayFormat = styled.div`
  font-size: 3rem;
  width: 10vw;
  display: grid;
  /* border-bottom: 1px solid var(--white); */
  font-family: free-monospace;
  justify-items: center;
  align-items: center;
  height: 90%;
`
export const TaskTimerControlsDisplay = styled.div`
  display: grid;
  width: 100%;
  height: 40%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 70%;
`
export const TaskTimerControl = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 1.2rem;
`
export const TaskTimerResetStyle = styled.div`
  display: grid;
  grid-column: span 3;
  justify-items: center;
  align-items: center;
  font-size: 1.2rem;
`
