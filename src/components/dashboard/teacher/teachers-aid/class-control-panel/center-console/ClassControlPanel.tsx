import React, { FC } from 'react'
import { PeriodSelect } from './PeriodSelect'
import { CenterPanelDisplay } from '../../styles/classControlPanelStyles'
import { ControlPanelDisplay } from './ControlPanelDisplay'

export type ClassControlPanelProps = {}

export const ClassControlPanel: FC<ClassControlPanelProps> = () => {
  return (
    <CenterPanelDisplay>
      <PeriodSelect />
      <ControlPanelDisplay />
    </CenterPanelDisplay>
  )
}
