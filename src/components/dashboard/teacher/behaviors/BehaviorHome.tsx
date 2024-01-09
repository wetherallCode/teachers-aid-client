import React from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useNavSync } from '../../../../hooks/useNavSync'
import { useTeacherNavContextProvider } from '../../../../navigation/teacher-nav/TeacherNavContext'
import {
  BehaviorHomeContainer,
  BehaviorHomeDisplay,
  BehaviorHomeTitleDiv,
  BehaviorLink,
  BehaviorLinksContainer,
} from './behaviorStyles'
import { BehaviorTypeList } from './BehaviorTypeList'
import { CreateBehavior } from './CreateBehavior'
import { EditBehaviors } from './EditBehaviors'

export type BehaviorHomeProps = {}

export const BehaviorHome = ({}: BehaviorHomeProps) => {
  const location = useLocation()
  useNavSync(location, 'BEHAVIOR')

  return (
    <BehaviorHomeContainer>
      <BehaviorLinksContainer>
        <BehaviorLink to="create-behavior">Create</BehaviorLink>
        <BehaviorLink to="edit-behavior">Edit</BehaviorLink>
        <div></div>
      </BehaviorLinksContainer>
      <BehaviorHomeDisplay>
        <BehaviorHomeTitleDiv>
          <div>Behaviors</div>
        </BehaviorHomeTitleDiv>
        <Routes>
          <Route path="create-behavior" element={<CreateBehavior />} />
          <Route path="edit-behavior" element={<BehaviorTypeList />} />
        </Routes>
      </BehaviorHomeDisplay>
    </BehaviorHomeContainer>
  )
}
