import React from 'react'
import { EssayOrganizerType } from './EssayOrganizer'
import {
  EssayOrganizerRestatement,
  EssayOrganizerPartHeader,
  EssayOrganizerPartBody,
  AcademicEssayOrganizerAnswer,
  DevelopingEssayOrganizerPartBody,
  EssayOrganizerConclusion,
} from '../../state-and-styles/assignedEssayStyles'

export type DevelopingEssayOrganizerProps = {
  organizer: EssayOrganizerType
}

export const DevelopingEssayOrganizer = ({
  organizer,
}: DevelopingEssayOrganizerProps) => {
  const essayOrganizer =
    organizer.__typename === 'DevelopingOrganizer' ? organizer : null

  return (
    <>
      <EssayOrganizerRestatement>
        <EssayOrganizerPartHeader>Restatement</EssayOrganizerPartHeader>
        <EssayOrganizerPartBody>
          {essayOrganizer?.restatement}
        </EssayOrganizerPartBody>
      </EssayOrganizerRestatement>
      <AcademicEssayOrganizerAnswer>
        <EssayOrganizerPartHeader style={{ textAlign: 'center' }}>
          Answer
        </EssayOrganizerPartHeader>
        <DevelopingEssayOrganizerPartBody>
          {essayOrganizer?.answer}
        </DevelopingEssayOrganizerPartBody>
      </AcademicEssayOrganizerAnswer>
      <EssayOrganizerConclusion>
        <EssayOrganizerPartHeader>Conclusion</EssayOrganizerPartHeader>
        <EssayOrganizerPartBody>
          {essayOrganizer?.conclusion}
        </EssayOrganizerPartBody>
      </EssayOrganizerConclusion>
    </>
  )
}
