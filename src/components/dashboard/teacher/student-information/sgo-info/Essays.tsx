import React from 'react'
import { EssayViewer } from './EssayViewer'
import { AnswerEntryType, EssayEntryType } from './SGOInfo'

export type EssaysProps = { essays: EssayEntryType }

export const Essays = ({ essays }: EssaysProps) => {
  return (
    <>
      {essays.map((e) => (
        <>
          <div key={e.number}>
            {e.number}: <EssayViewer draft={e.draft} />
          </div>
          <br />
        </>
      ))}
    </>
  )
}
