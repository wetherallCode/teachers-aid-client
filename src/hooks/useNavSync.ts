import { useEffect } from 'react'
import { useTeacherNavContextProvider } from '../navigation/teacher-nav/TeacherNavContext'
import {
  teacherNavMachineEvent,
  teacherNavTargets,
} from '../navigation/teacher-nav/teacherNavMachine'

export const useNavSync = (location: any, navTarget: teacherNavTargets) => {
  const [navState, navSync] = useTeacherNavContextProvider()

  useEffect(() => {
    if (location.pathname.includes(navState.value.toString())) {
      navSync({ type: navTarget })
    }
  }, [])
}
