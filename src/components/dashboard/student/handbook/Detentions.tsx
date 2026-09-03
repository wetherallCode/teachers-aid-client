import React from 'react'
import { DisplayTitle, ContentContainer } from './handbookStyles'

export type DetentionsProps = {}
export const Detentions = ({}: DetentionsProps) => {
  return (
    <>
      <DisplayTitle>Detentions</DisplayTitle>
      <ContentContainer>
        <ul>
          <li> All detentions will be held Wednesdays and Thursdays.</li>
        </ul>
        <ul>
          <li>
            If you have been assigned an detention, you must come one of those
            two days. If you need to reschedule, you must come see me, or email
            me to figure out a makeup day.
          </li>
        </ul>
        <ul>
          <li>
            If you don't attend or reschedule,I'll refer you to administration.
          </li>
        </ul>
      </ContentContainer>
    </>
  )
}
