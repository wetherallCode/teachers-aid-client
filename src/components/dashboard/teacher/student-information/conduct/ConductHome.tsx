import { useState } from 'react'
import { MarkingPeriodEnum } from '../../../../../schemaTypes'
import {
  AssignmentInformationAssignmentSwitchContainer,
  AssignmentSwitch,
  ConductInformationContainer,
} from '../state-n-styles/studentInformationStyles'
import { AbsenceHome } from './AbsenceHome'
import { BehaviorHome } from './BehaviorHome'
import { OutOfClassHome } from './OutOfClassHome'

export type ConductHomeProps = {
  studentId: string
  selectedMarkingPeriod: MarkingPeriodEnum
}

export type ConductInformationSwitchProps =
  | 'BEHAVIOR'
  | 'ATTENDANCE'
  | 'OUT_OF_CLASS'
export const ConductHome = ({
  studentId,
  selectedMarkingPeriod,
}: ConductHomeProps) => {
  const [conductSwitch, setConductSwitch] =
    useState<ConductInformationSwitchProps>('ATTENDANCE')
  return (
    <ConductInformationContainer>
      <AssignmentInformationAssignmentSwitchContainer>
        <AssignmentSwitch
          selected={conductSwitch === 'ATTENDANCE'}
          onClick={() => setConductSwitch('ATTENDANCE')}
        >
          Attendance
        </AssignmentSwitch>
        <AssignmentSwitch
          selected={conductSwitch === 'BEHAVIOR'}
          onClick={() => setConductSwitch('BEHAVIOR')}
        >
          Behavior
        </AssignmentSwitch>
        <AssignmentSwitch
          selected={conductSwitch === 'OUT_OF_CLASS'}
          onClick={() => setConductSwitch('OUT_OF_CLASS')}
        >
          Out of Class
        </AssignmentSwitch>
      </AssignmentInformationAssignmentSwitchContainer>

      {conductSwitch === 'ATTENDANCE' && (
        <AbsenceHome
          studentId={studentId}
          selectedMarkingPeriod={selectedMarkingPeriod}
        />
      )}
      {conductSwitch === 'BEHAVIOR' && (
        <BehaviorHome
          studentId={studentId}
          selectedMarkingPeriod={selectedMarkingPeriod}
        />
      )}
      {conductSwitch === 'OUT_OF_CLASS' && (
        <OutOfClassHome
          studentId={studentId}
          selectedMarkingPeriod={selectedMarkingPeriod}
        />
      )}
    </ConductInformationContainer>
  )
}
