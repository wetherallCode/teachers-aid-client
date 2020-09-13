import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { MainScreenControlButton } from '../../styles/classControlPanelStyles'

export type MainScreenManagerProps = {}

export const MainScreenManager: FC<MainScreenManagerProps> = () => {
  const [state, event] = useTeachersAidContextProvider()
  return (
    <>
      <MainScreenControlButton
        onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_SEATING_CHART' })}
      >
        Seating Chart
      </MainScreenControlButton>
      <MainScreenControlButton
        onClick={() => event({ type: 'CHANGE_MAIN_SCREEN_VIRTUAL_ATTENDANCE' })}
      >
        Attendance
      </MainScreenControlButton>
      <MainScreenControlButton
        onClick={() =>
          event({ type: 'CHANGE_MAIN_SCREEN_VIRTUAL_QUESTION_VIEWER' })
        }
      >
        Questions
      </MainScreenControlButton>
    </>
  )
}
