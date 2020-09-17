import styled from 'styled-components'
import { DynamicLessonButtonProps } from '../class-control-panel/DynamicLesson/DynamicLessonManager'

export const ClassControlPanelContainer = styled.div`
  background-color: 'green';
  grid-area: CommandPanel;
  background-color: var(--blue);
  color: var(--white);
  border-top: 3px solid var(--white);
  height: 100%;
`

export const PanelDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  height: 100%;
`
export const CenterPanelDisplay = styled.div`
  display: grid;
  grid-template-rows: 1fr 7fr;
`

export const PeriodSelectDisplay = styled.div`
  font-size: 1.5rem;
  text-shadow: 2px 2px 2px black;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
`
export const PeriodDisplay = styled.div`
  cursor: default;
`

export const PeriodSelectDisplayContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
`

export const CourseSelectButton = styled.button`
  width: 90%;
  height: 40%;
  font-size: 1.5vw;
  background-color: var(--white);
  color: var(--blue);
`

// export const CenterControlPanelDisplay = styled.div`
//   display: grid;
//   justify-items: center;
//   align-items: center;
// `

export const RandomStudentGeneratorContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  /* border-right: 1px solid var(--white); */
`
export const RandomStudentGeneratorButton = styled.button`
  color: var(--blue);
  background-color: var(--white);
  font-size: 1.5vw;
  text-shadow: 3px 3px 3px var(--grey);
  height: 80%;
  width: 80%;
`

// export const ProtocolManagerContainer = styled.div`
//   display: grid;
//   justify-items: center;
//   align-items: center;
// `
export const ProtocolManagerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
`
export const ProtocolHeaderContainer = styled.div`
  grid-row: 1/3;
  grid-column: 4/-4;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const ProtocolHeader = styled.div`
  font-size: 1.4rem;
`

export const ProtocolSelectorBackContainer = styled.div`
  grid-row: 3/-3;
  grid-column: 1/3;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const ProtocolSelectorBack = styled.div`
  font-size: 1.4rem;
`

export const ProtocolSelectorTaskContainer = styled.div`
  grid-row: 3/-3;
  grid-column: 3/-3;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const ProtocolSelectorTask = styled.div`
  font-size: 2vw;
`

export const ProtocolSelectorNextContainer = styled.div`
  grid-row: 3/-3;
  grid-column: -1/-3;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const ProtocolSelectorNext = styled.div`
  font-size: 1.4rem;
`

export const ProtocolSelectorContainer = styled.div`
  grid-row: -3/-1;
  grid-column: 4/-4;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const ProtocolSelectorButton = styled.button`
  font-size: 1.4rem;
  color: var(--blue);
  border-radius: 5px;
`
export const ProtocolInfoContainer = styled.div`
  grid-row: 2/-3;
  grid-column: 3/-3;
  display: grid;
  justify-items: left;
  align-items: center;
`
export const ProtocolInfo = styled.div`
  font-size: 1rem;
`
export const ProtocolControllerContainer = styled.div`
  grid-row: -3/-1;
  grid-column: 3/-3;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
`

export const ProtocolControllerButton = styled.button`
  font-size: 1rem;
  color: var(--blue);
  background-color: var(--white);
  border-radius: 5px;
  width: 90%;
`

export const DynamicLessonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 3fr 1fr;
  /* justify-items: center;
  align-items: center; */
`

export const DynamicLessonOnOffContainer = styled.div`
  grid-column: 1/-1;
  grid-row: 3/4;
  justify-self: center;
  align-self: center;
`
export const MainScreenManagerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  justify-items: center;
  align-items: center;
`
export const MainScreenControlButton = styled.button`
  font-size: 1.4rem;
  color: var(--blue);
  background-color: var(--white);
  border-radius: 5px;
  height: 40%;
  width: 90%;
`

export const DynamicLessonHeader = styled.div`
  grid-column: 1 / -1;
  font-size: 1.4rem;
  align-self: center;
  justify-self: center;
`
export const CenteredDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const DynamicLessonButtonContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: inherit;
`

export const DynamicLessonButton = styled.button<DynamicLessonButtonProps>`
  color: var(--blue);
  height: 40%;
  width: 70%;
  font-size: 1.5vw;
  border-radius: 5px;
  background-color: ${({ currentLessonSetting }) =>
    currentLessonSetting ? 'var(--red)' : 'var(--white)'};
  color: ${({ currentLessonSetting }) =>
    currentLessonSetting ? 'var(--white)' : 'var(--blue)'};
  align-self: center;
  justify-self: center;
`
export const DynamicLessonOnButton = styled(DynamicLessonButton)`
  grid-row: 2/3;
  grid-column: 1/-1;
`

export const DynamicLessonOffButtonContainer = styled.div`
  grid-row: 3/-1;
  grid-column: 1/-1;
  display: grid;
  justify-items: center;
  align-items: start;
`
export const DynamicLessonOffButton = styled.button`
  color: var(--white);
  background-color: var(--red);
  height: 80%;
  width: 70%;
  border-radius: 5px;
`
