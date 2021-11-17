import React, { FC } from 'react'
import {
  findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer,
  findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer,
  findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer,
} from '../../../../../../../../schemaTypes'
import { EssayOrganizerTitle } from '../../state-and-styles/assignedEssayStyles'
import { DevelopingEssayOrganizer } from './DevelopingEssayOrganizer'
import { AcademicEssayOrganizer } from './AcademicEssayOrganizer'
import { AdvancedEssayOrganizer } from './AdvancedEssayOrganizer'

export type EssayOrganizerType =
  | findEssayById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer
  | findEssayById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer
  | findEssayById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer

export type EssayOrganizerProps = {
  organizer: EssayOrganizerType
}

export const EssayOrganizer = ({ organizer }: EssayOrganizerProps) => {
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
