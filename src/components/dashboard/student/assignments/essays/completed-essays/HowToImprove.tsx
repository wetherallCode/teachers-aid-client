import React, { FC, Fragment } from 'react'

export type HowToImproveProps = {
  waysToImprove: (string | null)[]
}

export const HowToImprove: FC<HowToImproveProps> = ({ waysToImprove }) => {
  return (
    <>
      <div>How to Improve this Essay</div>
      <ul>
        {waysToImprove.map((way, i: number) => (
          <Fragment key={i}>{way && <li>{way}</li>}</Fragment>
        ))}
      </ul>
    </>
  )
}
