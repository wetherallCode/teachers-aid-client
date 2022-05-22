import React from 'react'
import {
  SGOEssayContainer,
  SGOScoreContainer,
} from '../state-n-styles/studentInformationStyles'
import { EssayViewer } from './EssayViewer'
import { EssayEntryType } from './SGOInfo'

export type EssaysProps = { essays: EssayEntryType }

export const Essays = ({ essays }: EssaysProps) => {
  return (
    <>
      {essays.map((e) => (
        <SGOEssayContainer key={e.number}>
          <div>{e.studentName}</div>

          <div>
            {e.number}: {e.question}
          </div>

          <div>
            <EssayViewer draft={e.draft} />
          </div>
          <br />

          <SGOScoreContainer>
            <div>
              <div>Writing Score: {e.answerScore}</div>
              <ul>
                <li>
                  {e.answerEntries.map((e, i: number) => (
                    <div key={i}>{e}</div>
                  ))}
                </li>
              </ul>
            </div>
            <div>
              <div>Conclusion Score: {e.conclusionScore}</div>
              <ul>
                <li>
                  {e.conclusionEntries.map((e, i: number) => (
                    <div key={i}>{e}</div>
                  ))}
                </li>
              </ul>
            </div>
          </SGOScoreContainer>
        </SGOEssayContainer>
      ))}
    </>
  )
}
