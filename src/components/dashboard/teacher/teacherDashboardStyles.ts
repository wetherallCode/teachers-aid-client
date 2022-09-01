import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const TeacherDashboardContainer = styled.div`
  display: grid;
  height: 95vh;
  grid-template-rows: 1fr 2fr;
`

export const TeacherHomeScreenOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: row;
  grid-gap: 1vh;
  padding: 2vh;
`

export const TeacherDirectoryOptions = styled.div`
  display: grid;
  /* grid-template-rows: 1fr 1fr; */
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  font-size: 3vh;
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`
export const TeacherDirectoryOptionsLink = styled(Link)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  font-size: 3vh;
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`
export const SchoolDayContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`

export const CreateSchoolDayButton = styled.button`
  width: 80%;
  font-size: 2vh;
  background-color: var(--blue);
  color: var(--white);
  grid-column: 1/-1;
  align-self: center;
  justify-self: center;
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`

export const CreateSchoolDayContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  height: 100%;
  width: 100%;
`
export const CreateSchoolDayCenteredItem = styled.div`
  grid-column: 1/-1;
  align-self: center;
  justify-self: center;
`
export const CreateSchoolDayInformationContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`
