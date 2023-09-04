import React from 'react'
import {
  ContentContainer,
  ContentContainerTitle,
  DisplayTitle,
  DoubleSidedContentContainer,
  IndividualContentContainer,
  TripleSidedContentContainer,
} from './handbookStyles'

export type ProceduresProps = {}

export const Procedures = ({}: ProceduresProps) => {
  return (
    <>
      <DisplayTitle>Procedures</DisplayTitle>
      <TripleSidedContentContainer style={{ fontSize: '2vh' }}>
        <IndividualContentContainer>
          <ContentContainerTitle>Start of Class</ContentContainerTitle>
          <ul>
            <li> Be on time.</li>
            <br />
            <li>
              Be prepared:
              <ul>
                <li>Pencil</li>
                <li>Assignments</li>
                <li>Laptop</li>
              </ul>
            </li>
            <br />
            <li>
              If you need a pencil for class, I will let you borrow one, but you
              need to put up an electronic device like headphones or a cellphone
              (no laptops) as collateral.
            </li>
          </ul>
        </IndividualContentContainer>
        <IndividualContentContainer>
          <ContentContainerTitle>During Class</ContentContainerTitle>
          <ul>
            <li>
              You must get a drink of water before class, not during class
              unless you absolutely need a drink.
            </li>
            <br />
            <li>
              You are allowed 4 trips to the bathroom a marking period. Expect
              me to say no if you ask to help you keep your 4 emergencies open
              when emergencies arise. No matter what, only one person can go to
              the bathroom at a time.
            </li>
            <br />
            <li>
              Handraising is only required if someone is already talking. Do
              your best to not interupt.
            </li>
            <br />
            {/* <li>
              Lessons will be either an Introductory Lesson or a Reinforcement
              Lesson and will cover the same information. That way there will be
              two days for every concept.
            </li> 
            
            <ul>
              <li>
                Introductory Lessons will start with a quiz from the previous
                day's Reinforcement Lesson. Then we begin a new concept.
              </li>
              <br />
              <li>
                Reinforcement Lessons will reinforce what we have learned from
                the previous day and will be more discussion and critical
                thinking based.
              </li>
              <br /> */}
            {/* </ul> */}
            {/* <br /> */}
          </ul>
        </IndividualContentContainer>
        <IndividualContentContainer>
          <ContentContainerTitle>End of Class</ContentContainerTitle>
          <ul>
            <li>
              Don't pack up until I tell you (probably around 2-3 minutes before
              the bell).
            </li>
            <br />
            <li>Don't get up to leave until the bell rings.</li>
          </ul>
        </IndividualContentContainer>
      </TripleSidedContentContainer>
    </>
  )
}
