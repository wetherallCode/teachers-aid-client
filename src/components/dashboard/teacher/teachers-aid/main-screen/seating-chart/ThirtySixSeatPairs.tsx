import React from 'react'
import {
  TwentyFourSeatFloorPlan,
  PairSeatingGroup,
  LeftSide,
  DeskContainer,
  RightSide,
  FiveRowColumn,
  IndividualDeskContainer,
  TwentySixIndividualSeatFloorPlan,
  ThirtySeatPairsFloorPlan,
} from '../../styles/seatingChartStyles'
import { Desk } from './Desk'

export type ThirtySeatPairsProps = {}

export const ThirtySeatPairs = ({}: ThirtySeatPairsProps) => {
  return (
    <ThirtySeatPairsFloorPlan>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={1} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={2} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={3} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={4} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={5} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={6} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={7} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={8} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={9} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={10} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={11} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={12} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={13} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={14} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={15} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={16} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={17} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={18} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={19} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={20} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={21} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={22} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={23} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={24} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={25} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={26} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={27} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={28} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup>
      {/* <PairSeatingGroup>
        <LeftSide>
          <DeskContainer>
            <Desk deskNumber={29} />
          </DeskContainer>
        </LeftSide>
        <RightSide>
          <DeskContainer>
            <Desk deskNumber={30} />
          </DeskContainer>
        </RightSide>
      </PairSeatingGroup> */}
    </ThirtySeatPairsFloorPlan>
  )
}
