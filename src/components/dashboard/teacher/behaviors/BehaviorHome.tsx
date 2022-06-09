import React from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { useNavSync } from '../../../../hooks/useNavSync'
import { useTeacherNavContextProvider } from '../../../../navigation/teacher-nav/TeacherNavContext'
import { BehaviorTypeList } from './BehaviorTypeList'
import { CreateBehavior } from './CreateBehavior'
import { EditBehaviors } from './EditBehaviors'

export type BehaviorHomeProps = {}

export const BehaviorHome = ({}: BehaviorHomeProps) => {
  const location = useLocation()
  useNavSync(location, 'BEHAVIOR')

  return (
    <Routes>
      <Route path='create-behavior' element={<CreateBehavior />} />
      <Route path='edit-behavior' element={<BehaviorTypeList />} />
    </Routes>
  )
}
