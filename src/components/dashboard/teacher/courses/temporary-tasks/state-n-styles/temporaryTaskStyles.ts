import styled from 'styled-components'

export const TemporaryTasksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 95vh;
  background-color: var(--white);
  color: var(--blue);
`

export const TemporaryTasksMenu = styled.div`
  border-top: 3px solid var(--white);
  background-color: var(--blue);
  color: var(--white);
  display: grid;
  grid-auto-rows: 10%;
`

export const MenuItems = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3vh;
  color: var(--white);
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

export const TaskListContainer = styled.div`
  border-bottom: 1px solid var(--blue);
`
export const TaskListHeaders = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  border-bottom: 1px solid var(--grey);
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
