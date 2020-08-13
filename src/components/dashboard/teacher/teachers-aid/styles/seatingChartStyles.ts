import styled from 'styled-components'
import { DeskDisplayProps } from '../seating-chart/Desk'

export const SeatingChartContainer = styled.div`
  background-color: var(--white);
  border: 1px solid var(--blue);
  grid-area: SeatingChart;
  height: 100%;
`

export const StartingDisplay = styled.div`
  font-size: 5vw;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`

export const TwentyFourSeatFloorPlan = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
`
export const TwelveSeatFloorPlan = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
`

export const PairSeatingGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  grid-column-gap: 2px;
`
export const LeftSide = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: right;
`
export const RightSide = styled.div`
  height: 100%;
  display: grid;
  align-items: center;
`
export const DeskContainer = styled.div`
  width: 80%;
  height: 65%;
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
`
export const DeskDisplay = styled.div<DeskDisplayProps>`
  height: 100%;
  border-radius: 5px;
  background-color: ${({ absent, assigned }) =>
    !assigned ? 'var(--grey)' : absent ? 'var(--red)' : 'var(--blue)'};
  color: var(--white);
  text-shadow: 2px 2px 2px black;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 1.2rem;
`
