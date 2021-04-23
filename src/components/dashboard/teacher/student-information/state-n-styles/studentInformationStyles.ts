import styled from 'styled-components'

export const StudentInformationContainer = styled.div`
  height: 95vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  background-color: var(--white);
  color: var(--blue);
`

export const StudentInformationTitlePageHeader = styled.div`
  padding-top: 10vh;
  font-size: 4vh;
  text-align: center;
`

export const StudentNameSelectContainer = styled.div`
  background-color: var(--blue);
  color: var(--white);
  display: grid;
  grid-template-rows: 1fr 4fr;
  border-top: 3px solid var(--white);
`

export const StudentNameSelectorContainer = styled.div`
  display: grid;
  font-size: 3vh;
`

export const SelectStudentTitle = styled.div`
  justify-self: center;
  align-self: end;
`
export const StudentSelectInput = styled.input`
  justify-self: center;
  align-self: center;
  height: 4vh;
  width: 75%;
  font-size: 3vh;
  color: var(--white);
  background-color: transparent;
  border-top: 1px solid var(--blue);
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  border-bottom: 1px solid var(--white);
`

export const StudentNameListContainer = styled.div`
  display: grid;
  grid-auto-rows: 5%;
  justify-items: center;
  align-items: center;
  font-size: 2.5vh;
  height: 70vh;
  overflow: scroll;
`

export const InformationContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 5% 7fr 1fr;
`

export const StudentNameHeader = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
  text-decoration: underline;
`
export const InformationTypeSelectorContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
`

export type InformationTypeTabProps = {
  selected: boolean
}

export const InformationTypeTab = styled.div<InformationTypeTabProps>`
  border-top: 1px solid var(--blue);
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  border-bottom: ${({ selected }) => {
    return selected ? '1px solid var(--white)' : '1px solid var(--blue)'
  }};
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-size: 2.5vh;
`
export const InformationPageOutline = styled.div`
  border-right: 1px solid var(--blue);
  border-left: 1px solid var(--blue);
`

export const ProtocolInformationContainer = styled(InformationPageOutline)``
export const StudentInformationDisplayContainer = styled(
  InformationPageOutline
)``
export const ContactInformationContainer = styled(InformationPageOutline)``
export const AssignmentInformationContainer = styled(InformationPageOutline)`
  display: grid;
  grid-template-rows: 1fr 8fr;
`
export const MarkingPeriodSelectorSwitchContainer = styled(
  InformationPageOutline
)`
  border-bottom: 1px solid var(--blue);
  display: grid;
  justify-items: center;
  align-items: center;
`

export const AssignmentInformationAssignmentSwitchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

export type AssignmentSwitchProps = {
  selected: boolean
}

export const AssignmentSwitch = styled.div<AssignmentSwitchProps>`
  justify-self: center;
  align-self: center;
  font-size: 2vh;
  cursor: pointer;
  text-decoration: ${({ selected }) => (selected ? 'underline' : 'none')};
`

export const AssignmentInformationDisplayContainer = styled.div`
  height: 50vh;
  display: grid;
  grid-template-rows: 1fr 15fr;

  margin: 1%;
  border: 1px solid var(--grey);
`

export const AssignmentInformationContainerHeader = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  border-bottom: 1px solid var(--grey);
`

export const AssignmentInformationStyle = styled.div`
  overflow: scroll;
  height: 100%;
`
export type IndividualAssignmentDisplayProps = {
  everyOtherLine: boolean
  lastLine: boolean
}
export const IndividualAssignmentDisplay = styled.div<IndividualAssignmentDisplayProps>`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  border-bottom: ${({ lastLine }) =>
    lastLine ? '1px solid var(--grey)' : 'none'};
  background-color: ${({ everyOtherLine }) =>
    everyOtherLine ? 'var(--grey)' : 'var(--white)'};
`
