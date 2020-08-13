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

export const ProtocolManagerContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`
export const DynamicLessonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 3fr;
  justify-items: center;
  align-items: center;
`
export const DynamicLessonHeader = styled.div`
  grid-column: 1 / 4;
  font-size: 1.4rem;
`
export const CenteredDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const DynamicLessonButton = styled.button<DynamicLessonButtonProps>`
  color: var(--blue);
  height: 20%;
  width: 70%;
  border-radius: 5px;
  background-color: ${({ currentLessonSetting }) =>
    currentLessonSetting ? 'var(--red)' : 'var(--white)'};
  color: ${({ currentLessonSetting }) =>
    currentLessonSetting ? 'var(--white)' : 'var(--blue)'};
`
