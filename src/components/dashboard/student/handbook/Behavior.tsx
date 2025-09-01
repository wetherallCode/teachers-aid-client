import React from 'react'
import {
  ContentContainerTitle,
  DisplayTitle,
  DoubleSidedContentContainer,
  IndividualContentContainer,
} from './handbookStyles'

export type BehaviorProps = {}

export const Behavior = ({}: BehaviorProps) => {
  return (
    <>
      <DisplayTitle>Behavior Policy</DisplayTitle>
      <DoubleSidedContentContainer style={{ fontSize: '2vh' }}>
        <IndividualContentContainer>
          <ContentContainerTitle>Positive Behaviors</ContentContainerTitle>
          <ul style={{ textAlign: 'center' }}>
            These earn you responsibility points.
          </ul>
          <ul>
            <li>Being prepared and ready for class when class starts</li>
            <br />
            <li>Turning in assignments (more for turning them in on time)</li>
            <br />
            <li>Getting Quiz Questions correct</li>
            <br />
            <li>Answering and asking questions (verbal and written)</li>
            <br />
            <li>Going above and beyond helping others</li>
          </ul>
        </IndividualContentContainer>
        <IndividualContentContainer style={{ color: 'var(--red)' }}>
          <ContentContainerTitle>Negative Behaviors</ContentContainerTitle>
          <ul style={{ textAlign: 'center' }}>
            These lose you responsibility points, and may also earn detentions
            if needed.
          </ul>
          <ul>
            <li>Disrupting Class</li>
            <br />
            <li>Refusing to follow directions</li>
            <br />
            <li>Using inappropriate language</li>
            <br />
            <li>Being late for class without a pass</li>
            <br />
            <li>Disrespecting any member of the class</li>
          </ul>
        </IndividualContentContainer>
      </DoubleSidedContentContainer>
    </>
  )
}
