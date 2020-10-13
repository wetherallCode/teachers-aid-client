import React, { FC } from 'react'
import { AcademicEssayOrganizer } from '../../../../../student/assignments/essays/assigned-essays/essay-info/essay-organizers/AcademicEssayOrganizer'
import { AdvancedEssayOrganizer } from '../../../../../student/assignments/essays/assigned-essays/essay-info/essay-organizers/AdvancedEssayOrganizer'
import { DevelopingEssayOrganizer } from '../../../../../student/assignments/essays/assigned-essays/essay-info/essay-organizers/DevelopingEssayOrganizer'
import { EssayOrganizer } from '../../../../../student/assignments/essays/assigned-essays/essay-info/essay-organizers/EssayOrganizer'
import { EssayOrganizerTitle } from '../../../../../student/assignments/essays/assigned-essays/state-and-styles/assignedEssayStyles'

export type EssayToGradeOrganizerProps = {
  organizer: EssayOrganizer
}

export const EssayToGradeOrganizer: FC<EssayToGradeOrganizerProps> = ({
  organizer,
}) => {
  console.log(organizer)
  return (
    <>
      <EssayOrganizerTitle>
        <div>Organizer</div>
      </EssayOrganizerTitle>
      {organizer.__typename === 'DevelopingOrganizer' && (
        <DevelopingEssayOrganizer organizer={organizer} />
      )}
      {organizer.__typename === 'AcademicOrganizer' && (
        <AcademicEssayOrganizer organizer={organizer} />
      )}
      {organizer.__typename === 'AdvancedOrganizer' && (
        <AdvancedEssayOrganizer organizer={organizer} />
      )}
    </>
  )
}
