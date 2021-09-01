import React, { FC } from 'react'
import { PeriodSelect } from './PeriodSelect'
import { CenterPanelDisplay } from '../../styles/classControlPanelStyles'
import { ControlPanelDisplay } from './ControlPanelDisplay'

export type ClassControlPanelProps = { presentStudentList: string[] }

export const ClassControlPanel = ({
  presentStudentList,
}: ClassControlPanelProps) => {
  return (
    <CenterPanelDisplay>
      <PeriodSelect />
      <ControlPanelDisplay presentStudentList={presentStudentList} />
    </CenterPanelDisplay>
  )
}
