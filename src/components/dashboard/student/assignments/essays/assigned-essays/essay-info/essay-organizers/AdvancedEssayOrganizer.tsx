import React, { FC } from 'react'
import { EssayOrganizerType } from './EssayOrganizer'

export type AdvancedEssayOrganizerProps = { organizer: EssayOrganizerType }

export const AdvancedEssayOrganizer: FC<AdvancedEssayOrganizerProps> = ({
  organizer,
}) => {
  return (
    <>
      <div>Advanced</div>
    </>
  )
}
