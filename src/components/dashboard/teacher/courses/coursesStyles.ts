import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const CourseDirectoryContainer = styled.div`
  display: grid;
  height: 95vh;
  grid-template-rows: 1fr 6fr;
`
export const CourseDirectoryTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
`
export const IndividualCourseDirectContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
  padding: 2vh;
  grid-gap: 1vh;
`

export type IndividualCourseBlockContainerProps = {
  highlighted: boolean
}

export const IndividualCourseBlockContainer = styled(
  Link
)<IndividualCourseBlockContainerProps>`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: ${({ highlighted }) => (highlighted ? 'var(--white)' : 'var(--blue)')};
  background-color: ${({ highlighted }) =>
    highlighted ? 'var(--blue)' : 'var(--white)'};
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
    /* color: var(--white); */
    /* background-color: var(--blue); */
  }
`

export const CourseManagerHomeContainer = styled.div`
  height: 95vh;
  display: grid;
  grid-template-rows: 1fr 6fr;
`
export const CourseManagerHomeTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
`
export const CourseManagerHomeTitleBackLink = styled.div`
  cursor: pointer;
`
export const CourseMenuContainer = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
  padding: 2vh;
  grid-gap: 1vh;
`
export const CourseMenuItemBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`
export const CourseMenuItemBlockLink = styled(Link)`
  display: grid;
  grid-template-rows: 1fr 1fr;
  border: 1px solid var(--blue);
  border-radius: 10px;
  justify-items: center;
  align-items: center;
  text-decoration: none;
  color: var(--blue);
  :hover {
    box-shadow: 2px 2px 2px var(--blue);
  }
`
