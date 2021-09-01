import styled from 'styled-components'

export const AssignedSeat = styled.div`
  background: var(--blue);
  color: var(--white);
  height: 100%;
  display: grid;
  align-items: center;
  border-radius: 5%;
`
export const UnassignedSeat = styled.div`
  background: var(--grey);
  color: var(--blue);
  height: 100%;
  display: grid;
  align-items: center;
  border-radius: 5%;
`
export const NameContainer = styled.div`
  display: grid;
  justify-items: center;
  font-size: 2vh;
`
export const AssignedDeskNumber = styled.div`
  justify-self: center;
  font-size: 1vh;
`
export const UnassignedDeskNumber = styled.div`
  justify-self: center;
  align-self: center;
  font-size: 1vh;
`
export const DeleteSelector = styled.div`
  justify-self: center;
  font-size: 1.2vh;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const StudentSelector = styled.select`
  width: 80%;
  font-size: 1.5vh;
  justify-self: center;
`
// export const CenteredDeskItem = styled.div`
//   justify-self: center;
//   font-size: 2vh;
// `
