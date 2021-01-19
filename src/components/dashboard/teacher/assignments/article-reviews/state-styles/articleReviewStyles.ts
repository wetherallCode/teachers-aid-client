import styled from 'styled-components'

export const ReviewList = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-auto-rows: 3vh;
  width: 50%;
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  border-top: 1px solid var(--blue);
`
export const ReviewName = styled.div`
  display: grid;
  justify-items: left;
  align-items: center;
`

export const ReturnReview = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`
export const ReturnedStatus = styled.div`
  color: var(--red);
`
