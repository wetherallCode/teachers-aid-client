import styled from 'styled-components'

export const RegisterStudentContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  height: 100%;
`
export const AddStudentContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr 2fr 1fr;
  height: 95vh;
`
export const PageTitle = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 5vh;
  text-decoration: underline;
`

export const FormContainer = styled.form`
  display: grid;
  grid-template-rows: 5fr 1fr;
`
export const InformationContainer = styled.div`
  display: grid;
  padding-right: 5%;
`
export const InformationDetailInputContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  align-items: center;
  /* justify-items: center; */
  font-size: 3vh;
  margin-left: 5%;
`

export const YesNoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`
export type YesNoSelectProps = { selected: boolean }

export const YesNoSelect = styled.div<YesNoSelectProps>`
  color: ${({ selected }) => (selected ? 'var(--red)' : 'var(--blue)')};
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
  cursor: pointer;
`
export const InformationInput = styled.input`
  width: 80vh;
  height: 5vh;
  background-color: transparent;
  font-size: 3vh;
  padding-left: 2%;
  color: var(--blue);
  border: 1px solid var(--blue);
  border-radius: 5px;
`
export const BottomButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`

export const FullScreenButtonContainer = styled(BottomButtonContainer)`
  height: 100%;
`

export const BottomButton = styled.button`
  width: 45vh;
  height: 5vh;
  background-color: var(--blue);
  color: var(--white);
  font-size: 3vh;
`

export const AdditionalStudentSelect = styled.select`
  width: 80vh;
  height: 5vh;
  background-color: transparent;
  font-size: 3vh;
  padding-left: 2%;
  color: var(--blue);
  border: 1px solid var(--blue);
  border-radius: 5px;
`
