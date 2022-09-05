import React from 'react'
import { ContentContainer, DisplayTitle } from './handbookStyles'

export type ExpecationsProps = {}

export const Expecations = ({}: ExpecationsProps) => {
  return (
    <>
      <DisplayTitle>Expectations</DisplayTitle>
      <ContentContainer>
        <ul>
          <li>
            I expect you to take this class, and school in general, seriously.
          </li>
          <br />
          <li>I expect you to think for yourself.</li>
          <br />
          <li>I expect you to be honest. That means do your own work.</li>
          <br />
          <li>
            I expect that you put your full effort into every task; especially
            if you “think” you can’t do it.
          </li>
          <br />
          <li>
            Respect me by doing what is asked of you. I’m only going to ask you
            to do things that will make class run better and help you become a
            better student, so please do as you’re asked.
          </li>
        </ul>
      </ContentContainer>
    </>
  )
}
