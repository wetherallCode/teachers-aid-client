import styled from 'styled-components'

export const StudentControlPanelContainer = styled.div`
  background-color: var(--grey);
  color: var(--white);
  display: grid;
  grid-template-rows: 1fr 10fr;
`

export const StudentControlButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
`

export const ControlButtons = styled.button`
  color: var(--blue);
  background-color: var(--white);
  width: 15vh;
  font-size: 2.5vh;
`

export const StudentInfoContainer = styled.div`
  background-color: var(--blue);
  grid-area: StudentInfo;
  border-left: 3px solid var(--white);
  display: grid;
  grid-template-rows: 2fr 3fr;
`

export type StudentInfoDisplayProps = {
  absent?: boolean
}

export const StudentInfoDisplay = styled.div<StudentInfoDisplayProps>`
  background-color: ${({ absent }) => (absent ? 'var(--red)' : 'var(--blue)')};
  color: var(--white);
  border-bottom: 3px solid var(--white);
  display: grid;
  justify-items: center;
  align-items: center;
`
export const StudentNameContainer = styled.div`
  font-size: 3vw;
  text-align: center;
`
export const AttendanceContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export type AttendanceButtonProps = {
  created: boolean
  lateButton: boolean
}

export const AttendanceButton = styled.button<AttendanceButtonProps>`
  background-color: ${({ created }) =>
    created ? 'var(--red)' : 'var(--blue)'};
  color: var(--white);
  font-size: ${({ lateButton }) => (lateButton ? '2vh' : '2.5vh')};
  border: 1px solid var(--white);
  box-shadow: 2px 2px 2px black;
  border-radius: 5px;
  width: 25vh;
  height: 5vh;
`

export const ProtocolDisplayContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 10fr;
  background-color: var(--grey);
`

export const ProtocolTitle = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 4vh;
  text-decoration: underline;
`
export const GroupProtocolAssessorContainer = styled.div`
  display: grid;
  padding-bottom: 2%;
`
export const PartnerContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 3fr;
`
export const CenteredTitle = styled.div`
  justify-self: center;
  align-self: center;
`

export const PartnerListContainer = styled.div`
  display: grid;
`
export const PartnerListItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  height: 2vh;
`
export const PartnerRemoveContainer = styled.div`
  color: var(--white);
  background-color: var(--red);
  display: grid;
  justify-items: center;
`
export const DiscussionContainer = styled.div`
  display: grid;
  grid-row-gap: 2%;
`
export const AssessmentContainer = styled.div`
  display: grid;
  grid-row-gap: 2%;
`

export type AssessorButtonProps = {
  selected: boolean
}

export const AssessorButton = styled.button<AssessorButtonProps>`
  font-size: 2vh;
  background-color: ${({ selected }) =>
    selected ? 'var(--blue)' : 'var(--white)'};
  color: ${({ selected }) => (selected ? 'var(--white)' : 'var(--blue)')};
  width: 90%;
  justify-self: center;
  border-radius: 5px;
`
export const StudentBehaviorButtonContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export type StudentBehaviorButtonProps = {
  goodBehavior: boolean
  ready?: boolean
}

export const StudentBehaviorButton = styled.button<StudentBehaviorButtonProps>`
  background-color: ${({ goodBehavior, ready }) =>
    goodBehavior ? 'var(--blue)' : 'var(--red)'};
  color: var(--white);
  border-radius: 5px;
  width: 75%;
  height: 7vh;
  font-size: 100%;
`

export const BehaviorRemoverContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  color: var(--blue);
  font-size: 3vh;
`

export const BehaviorRemoverTitleContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`
export const BehaviorItemContainer = styled.div`
  display: grid;
  grid-auto-rows: 15%;
`

export const BehaviorItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin-bottom: 1%;
`
export const RemoveBehaviorButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
`
