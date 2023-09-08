import React from 'react'
import { ContentContainer, DisplayTitle } from './handbookStyles'

export type FAQProps = {}

export const FAQ = ({}: FAQProps) => {
  return (
    <>
      <DisplayTitle>FAQs</DisplayTitle>
      <ContentContainer>
        <ul>
          <li>Do I have to do homework?</li>
          <ul>
            <li>
              You won't be able to pass if you don't. Most of the grade is
              homework.
            </li>
          </ul>
          <br />
          <li>Is it hard?</li>
          <ul>
            <li>
              No, but it is challenging which can be easily confused for hard.
              You don't grow with out challenge, and I'm here to help you with
              that growth.
            </li>
          </ul>
          <br />
          <li>Will there be homework every night?</li>
          <ul>
            <li>Pretty much. If you do it right, it won't take as long.</li>
          </ul>
          <br />
          <li>Why do I have to do homework every night?</li>
          <ul>
            <li>
              One: It is nearly impossible to learn everything that is being
              taught in 38-40 minutes a day. That's all we get, so homework is
              your time to solidify the information in your head.
            </li>
            <li>Two: Practice makes perfect.</li>
          </ul>
          <br />
          <li>Why do I need this?</li>
          <ul>
            <li>
              One: Because I'm teaching you how our country works (and the world
              around us). If you don't like the way things are, you'll never be
              able to change it without knowing how it works.
            </li>
            <li>Two: The more you learn, the easier learning becomes.</li>
          </ul>
          <br />
          <li>Do I give detentions?</li>
          <ul>
            <li>
              Yes. Lateness, disruptions, and negative behaviors will earn you a
              detention. They start at 2:20 and end at 2:40.{' '}
            </li>
          </ul>

          {/* <br />
          <li></li>
          <ul>
            <li></li>
          </ul>
          <br /> */}
        </ul>
      </ContentContainer>
    </>
  )
}
