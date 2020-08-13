import styled from 'styled-components'

export const TimerContainer = styled.div`
  display: grid;

  /* justify-items: center;
  align-items: center; */
  /* border-left: 1px solid var(--white); */
`

export const TimerControlsContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  justify-items: center;
  align-items: center;
`
export const TimerPresetContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  cursor: default;
`

export const ReduceTimer = styled.div`
  grid-row: 3/6;
  grid-column: 1/4;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
`

export const TimerPresetDisplay = styled.div`
  grid-row: 2/7;
  grid-column: 4/8;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 5rem;
`

export const IncreaseTimer = styled.div`
  grid-row: 3/6;
  grid-column: -1/-4;
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 3rem;
`

export const StartTimer = styled.button`
  grid-row: -2/-3;
  grid-column: 3/-3;
  font-size: 1.2vw;
  color: var(--blue);
`

// export const TimerPresetTimesContainer = styled.div`
//   display: grid;
//   grid-template-rows: 5fr 1fr;
//   height: 100%;
//   width: 100%;
// `

// export const TimerPreSetTimes = styled.div`
//   display: grid;
//   width: 100%;
//   height: 100%;
//   justify-items: center;
//   align-items: center;
//   font-size: 2rem;
//   grid-template-columns: repeat(3, 1fr);
//   /* grid-template-rows: 5fr 1fr; */
// `

// export const TimerStartButton = styled.button`
//   width: 70%;
//   display: grid;
//   justify-items: center;
//   align-items: center;
// `

export const TimeDisplayFormat = styled.div`
  font-size: 3rem;
  width: 10vw;
  display: grid;
  border-bottom: 1px solid var(--white);
  font-family: free-monospace;
  justify-items: center;
  align-items: center;
  height: 90%;
`
export const TimerControlsDisplay = styled.div`
  display: grid;
  width: 100%;
  height: 70%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 70%;
`
export const TimerControl = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 1.2rem;
`
export const ResetStyle = styled.div`
  display: grid;
  grid-column: span 3;
  justify-items: center;
  align-items: center;
  font-size: 1.2rem;
`
