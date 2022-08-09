import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const BehaviorHomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 95vh;
`
export const BehaviorHomeTitleDiv = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 5vh;
  border-bottom: 3px solid var(--blue);
`
export const BehaviorHomeDisplay = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
`
export const BehaviorLinksContainer = styled.div`
  background-color: var(--blue);
  display: grid;
  grid-auto-flow: rows;
  /* grid-template-rows: 10%; */
  justify-items: center;
  align-items: center;
  border-top: 3px solid var(--white);
`

export const BehaviorLink = styled(Link)`
  text-decoration: none;
  font-size: 3vh;
  color: var(--white);
`

export const BehaviorListContainer = styled.div`
  height: 75vh;
  overflow: scroll;
`
