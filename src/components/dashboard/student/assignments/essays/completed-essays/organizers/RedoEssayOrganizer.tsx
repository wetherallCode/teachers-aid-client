import React, { FC } from 'react'
import { findCompletedEssayById_findEssayById_essay } from '../../../../../../../schemaTypes'

import { DevelopingOrganizer } from './developing/DevelopingOrganizer'
import { AcademicOrganizer } from './academic/AcademicOrganizer'
import { AdvancedOrganizer } from './advanced/AdvancedOrganizer'

export type RedoEssayOrganizerProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export const RedoEssayOrganizer: FC<RedoEssayOrganizerProps> = ({ essay }) => {
  return (
    <>
      {essay.workingDraft.organizer?.__typename === 'DevelopingOrganizer' && (
        <DevelopingOrganizer essay={essay} />
      )}
      {essay.workingDraft.organizer?.__typename === 'AcademicOrganizer' && (
        <AcademicOrganizer question={essay.topic.question} essay={essay} />
      )}
      {essay.workingDraft.organizer?.__typename === 'AdvancedOrganizer' && (
        <AdvancedOrganizer question={essay.topic.question} essay={essay} />
      )}
    </>
  )
}
