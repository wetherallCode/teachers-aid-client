import React, { FC, Fragment } from 'react'
import {
  EssayInfoTitle,
  EssaySectionOrganizationBodyEntry,
  EssayInfoBody,
} from '../assigned-essays/state-and-styles/essayInfoStyles'
import {
  HowToImproveTitle,
  HowToImproveBody,
} from './state/completedEssayStyles'

export type HowToImproveProps = {
  waysToImprove: (string | null)[]
}

export const HowToImprove: FC<HowToImproveProps> = ({ waysToImprove }) => {
  return (
    <>
      <HowToImproveTitle>How to Improve this Essay</HowToImproveTitle>
      <HowToImproveBody>
        {waysToImprove.length > 0 && (
          <ul>
            {waysToImprove.map((way, i: number) => (
              <Fragment key={i}>
                {way && (
                  <EssaySectionOrganizationBodyEntry>
                    {way && way}
                  </EssaySectionOrganizationBodyEntry>
                )}
              </Fragment>
            ))}
          </ul>
        )}
      </HowToImproveBody>
    </>
  )
}
