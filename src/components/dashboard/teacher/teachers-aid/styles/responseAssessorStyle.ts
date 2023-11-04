import styled from 'styled-components'

export const ResponseTitle = styled.div`
  font-size: 4vh;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 2vh;
`

export const ResponseContainer = styled.div`
  display: grid;
  /* grid-auto-rows: 8vh; */
  grid-row-gap: 2vh;
  overflow: scroll;
  height: 50vh;
`

export const ResponseRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
`
export const NameOfResponder = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  /* margin-left: 3%; */
`
export const ResponseButtonContainer = styled.div`
  display: grid;
  align-self: center;
  justify-self: start;
  text-align: center;
`

export type AssessmentButtonType = {
  assessed: boolean
}

export const AssessmentButton = styled.button<AssessmentButtonType>`
  background-color: ${({ assessed }) => {
    return assessed ? 'var(--blue)' : 'var(--grey)'
  }};
  color: ${({ assessed }) => (assessed ? 'var(--white)' : 'var(--blue)')};
`
export const AssessmentManagerButton = styled.button`
  height: 50%;
`
export const CancelAssessmentButton = styled.button`
  background-color: var(--red);
  color: var(--white);
  width: 15vw;
`
export const ResponseAssessorCategoriesContainer = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  font-size: 2vh;
  cursor: pointer;
`
export const ResponseAssessorCategoriesSelectables = styled.div``
