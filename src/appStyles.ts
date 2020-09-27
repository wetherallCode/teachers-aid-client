import styled from 'styled-components'

export const Standard8x12Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
`
export const Standard7x12Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(7, 1fr);
`
export const Standard4x6Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
`

export const LineInput = styled.input`
  border: 1px solid var(--white);
  border-bottom: 1px solid var(--blue);
`
