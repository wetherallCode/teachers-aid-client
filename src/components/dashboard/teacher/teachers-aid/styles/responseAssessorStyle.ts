import styled from 'styled-components'

export const ResponseTitle = styled.div`
  font-size: 3vw;
  text-decoration: underline;
  text-align: center;
  margin-bottom: 2vh;
`

export const ResponseContainer = styled.div`
  display: grid;
  grid-auto-rows: 4vh;
  grid-row-gap: 2vh;
  overflow: scroll;
  height: 55vh;
`

export const ResponseRowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
`
export const NameOfResponder = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  /* margin-left: 3%; */
`
export const ResponseButtonContainer = styled.div`
  display: grid;
  grid-gap: 1vw;
  grid-auto-flow: column;
  justify-self: center;
`

export type AssessmentButtonType = {
  assessed: boolean
}

export const AssessmentButton = styled.button<AssessmentButtonType>`
  background-color: ${({ assessed }) => {
    return assessed ? 'var(--blue)' : 'var(--grey)'
  }};
  color: ${({ assessed }) => (assessed ? 'var(--white)' : 'var(--blue)')}; ;
`

export const CancelAssessmentButton = styled.button`
  background-color: var(--red);
  color: var(--white);
  width: 15vw;
`
