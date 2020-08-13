import styled from 'styled-components'

export const TeachersAidContainer = styled.div`
  display: grid;
  border-top: 3px solid var(--white);
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    'SeatingChart SeatingChart SeatingChart StudentInfo '
    'SeatingChart SeatingChart SeatingChart StudentInfo '
    'SeatingChart SeatingChart SeatingChart StudentInfo '
    'CommandPanel CommandPanel CommandPanel StudentInfo ';
  height: 95vh;
`
