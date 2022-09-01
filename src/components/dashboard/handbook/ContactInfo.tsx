import React from 'react'
import { ContentContainer, DisplayTitle } from './handbookStyles'

export type ContactInfoProps = {}

export const ContactInfo = ({}: ContactInfoProps) => {
  return (
    <>
      <DisplayTitle>Contact Information</DisplayTitle>
      <ContentContainer>
        <ul>If you need help, please contact me:</ul>
        <ul>
          <li>Phone: 856-299-0576 ext.6596</li>
          <br />
          <li>Email: rwetherall@pgcpschools.org</li>
          <br />
          <li>Come see me in the halls.</li>
          <br />
          <li>Come after school and get help.</li>
          <ul>
            <li>
              Most of the time I'll be in my room, but a few times a month I
              have to be in a meeting.
            </li>
            <li>
              You must be here to get work done. Don't just hang out. I will
              kick you out if you are disrupting.
            </li>
          </ul>
        </ul>
      </ContentContainer>
    </>
  )
}
