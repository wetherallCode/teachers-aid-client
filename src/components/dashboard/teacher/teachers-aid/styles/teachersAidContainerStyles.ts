import styled from 'styled-components'
import { media } from '../../../../home/media'

export type TeachersAideContainerProps = {
  width: number
}

export const TeachersAidContainer = styled.div<TeachersAideContainerProps>`
  display: grid;
  border-top: 3px solid var(--white);
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    'SeatingChart SeatingChart SeatingChart StudentInfo '
    'SeatingChart SeatingChart SeatingChart StudentInfo '
    'SeatingChart SeatingChart SeatingChart StudentInfo '
    'CommandPanel CommandPanel CommandPanel StudentInfo ';
  height: ${({ width }) => (width === 1024 ? '88vh' : '95vh')};
`
