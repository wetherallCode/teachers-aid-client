import React from 'react'
import {
  PairSeatingGroup,
  LeftSide,
  DeskContainer,
  RightSide,
} from '../../styles/seatingChartStyles'
import { Desk } from './Desk'

export type PairSeatingDataProps = {
  pairDeskNumbers: number[]
}

export const PairSeatingData = ({ pairDeskNumbers }: PairSeatingDataProps) => {
  return (
    <PairSeatingGroup>
      <LeftSide>
        <DeskContainer>
          <Desk deskNumber={pairDeskNumbers[1]} />
        </DeskContainer>
      </LeftSide>
      <RightSide>
        <DeskContainer>
          <Desk deskNumber={pairDeskNumbers[2]} />
        </DeskContainer>
      </RightSide>
    </PairSeatingGroup>
  )
}
