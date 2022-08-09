import styled from 'styled-components'

export const StudentBehaviorContainer = styled.div`
  display: grid;
  grid-template-rows: 15% 1fr;
  height: 95vh;
`

export const StudentBehaviorTitle = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 5vh;
`
export const StudentBehaviorContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
export const BehaviorItemContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
`
export const BehaviorItemTitle = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 4vh;
`

export const BehaviorItem = styled.li`
  display: grid;
  grid-template-columns: 5fr 1fr;
  font-size: 3vh;
`
