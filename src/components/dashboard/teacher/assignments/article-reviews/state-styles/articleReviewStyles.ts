import styled from 'styled-components'

export const ArticleReviewManagerContainer = styled.div`
  height: 95vh;
`
export const ArticleReviewManagerMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-top:3px solid var(--white);
  
`
export const ArticleReviewFunctionSelect = styled.div`
 height: 95vh;
  background: var(--blue);
  color: var(--white);
  display: grid;
  grid-auto-rows: 10%;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
`

export const ArticleReviewMainMenuDisplay = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 6vh;

`

export const ReviewerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-top:3px solid var(--white);
  background: var(--white);
`
export const ReviewerCourseSelect = styled.div`
 height: 95vh;
  background: var(--blue);
  color: var(--white);
  display: grid;
  grid-auto-rows: 10%;
  justify-items: center;
  align-items: center;
  font-size: 4vh;
`

export const ReviewMainDisplay = styled.div`
  height: 95vh;
  display: grid;
  grid-template-rows: 10% 5% 1fr;

`

export const TitleContainer= styled.div`
  display: grid;

`

export type ArticleReviewNeedsGrading ={
  needsGrading: boolean
}

export const Title = styled.div<ArticleReviewNeedsGrading>`
  align-self: center;
  justify-self: center;
  font-size: 5vh;
  color: ${({ needsGrading }) => (needsGrading ? 'var(--red)' : 'var(--blue)')};
`


export const DatesToReviewContainer = styled.div`
  display:grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  border-bottom: 3px solid var(--blue);
  margin-left: 5%;
  margin-right: 5%;
`

export const DateToReview = styled.div`
 text-align: center;
 font-size: 3vh;
`
export const ReviewListContainer = styled.div`
  margin-top: 5%;
  border-top: 1px solid var(--blue);
  overflow: scroll;
`

export const ReviewList = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-auto-rows: 3vh;
  /* width: 50%; */
  border-left: 1px solid var(--blue);
  border-right: 1px solid var(--blue);
  border-bottom: 1px solid var(--blue);
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
