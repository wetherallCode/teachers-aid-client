import React, { FC } from 'react'
import { EssayOrganizer } from './EssayOrganizer'

export type AdvancedEssayOrganizerProps = { organizer: EssayOrganizer }

export const AdvancedEssayOrganizer: FC<AdvancedEssayOrganizerProps> = ({
  organizer,
}) => {
  return (
    <>
      <div>Advanced</div>
    </>
  )
}
