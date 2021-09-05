import styled from 'styled-components'

export const CreateCourseContainer = styled.div`
  display: grid;
  height: 95vh;
  grid-template-rows: 1fr 3fr;
`
export const CreateCourseInformationContainer = styled.div`
  display: grid;
  height: 95vh;
  grid-template-rows: 1fr 7fr;
`
export const CreateCourseContainerTitleContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  /* height: ${95 / 4}vh; */
  font-size: 5vh;
  text-decoration: underline;
`

export const CreateCourseBodyContainer = styled.form`
  display: grid;
  grid-template-rows: 1fr 3fr;
`
export const CreateCourseInfoBodyContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
`
export const CourseTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: center;
  justify-items: center;
  font-size: 3vh;
`

export const CourseTitleInput = styled.input`
  width: 80vh;
  height: 5vh;
  background-color: transparent;
  font-size: 3vh;
  padding-left: 2%;
  color: var(--blue);
`

export const CourseTitleButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`

export const CourseTitleButton = styled.button`
  width: 45vh;
  height: 5vh;
  background-color: var(--blue);
  color: var(--white);
  font-size: 3vh;
`
export const CourseInformationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const CourseInformationColumnContainer = styled.div`
  display: grid;
`

export const TimeSelectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  justify-items: center;
  font-size: 2vh;
`

export const TimeSelectionInput = styled.input`
  justify-self: left;
  background-color: transparent;
  color: var(--blue);
  border: 1px solid var(--blue);
  height: 4vh;
  font-size: 3vh;
`
