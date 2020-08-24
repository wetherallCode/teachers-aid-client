import React, { FC } from 'react'
import {
  TwelveSeatFloorPlan,
  IndividualDeskContainer,
  CenterSide,
} from '../../styles/seatingChartStyles'
import { Desk } from './Desk'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'

export type TwelveSeatChartProps = {}

export const TwelveSeatChart: FC<TwelveSeatChartProps> = () => {
  const [state] = useTeachersAidContextProvider()

  return (
    <TwelveSeatFloorPlan>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={1} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={2} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={3} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={4} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={5} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={6} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={7} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={8} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={9} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={10} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={11} />
        </IndividualDeskContainer>
      </CenterSide>
      <CenterSide>
        <IndividualDeskContainer>
          <Desk deskNumber={12} />
        </IndividualDeskContainer>
      </CenterSide>
    </TwelveSeatFloorPlan>
  )
}
