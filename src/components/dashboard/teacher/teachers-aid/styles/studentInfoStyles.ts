import styled from 'styled-components'

export const StudentInfoContainer = styled.div`
  background-color: 'blue';
  grid-area: StudentInfo;
  border-left: 3px solid var(--white);
  display: grid;
  grid-template-rows: 2fr 3fr;
`

export const StudentInfoDisplay = styled.div`
  background-color: var(--blue);
  color: var(--white);
  border-bottom: 3px solid var(--white);
  display: grid;
  justify-items: center;
  align-items: center;
`
export const StudentNameContainer = styled.div`
  font-size: 3vw;
`

export const StudentControlPanel = styled.div`
  background-color: var(--grey);
  color: var(--white);
`
