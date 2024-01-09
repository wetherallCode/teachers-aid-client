import styled from 'styled-components'

export const ArticleReviewManagerContainer = styled.div`
  height: 95vh;
`
export const ArticleReviewManagerMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-top: 3px solid var(--white);
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
export const NoCourseDisplay = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 6vh;
`
export const ReviewerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-top: 3px solid var(--white);
  background: var(--white);
`
export const ReviewerCourseSelectContainer = styled.div`
  height: 95vh;
  background: var(--blue);
  color: var(--white);
  font-size: 4vh;
  cursor: pointer;
  display: grid;
  grid-template-rows: 5fr 1fr;
`
export const ReviewerCourseSelect = styled.div`
  display: grid;
  grid-auto-rows: 10%;
  justify-items: center;
  align-items: center;
`
export const ReviewerCourseSelectBack = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const ReviewMainDisplay = styled.div`
  height: 95vh;
  display: grid;
  grid-template-rows: 8% 7% 5% 1fr;
`

export const TitleContainer = styled.div`
  display: grid;
`
export const MarkingPeriodSelectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  font-size: 3vh;
`
export const CurrentMarkingPeriodContainer = styled.div`
  grid-column: 5/8;
  display: grid;
  justify-items: center;
  align-items: center;
`
export const MarkingPeriodSelectorBack = styled.div`
  grid-column: 4/5;
  justify-self: center;
  align-self: center;
`
export const MarkingPeriodSelectorForward = styled.div`
  grid-column: 8/9;
  justify-self: center;
  align-self: center;
`
export type ArticleReviewNeedsGrading = {
  needsGrading: boolean
}

export const Title = styled.div<ArticleReviewNeedsGrading>`
  align-self: center;
  justify-self: center;
  font-size: 5vh;
  color: ${({ needsGrading }) => (needsGrading ? 'var(--red)' : 'var(--blue)')};
`

export const DatesToReviewContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  border-bottom: 3px solid var(--blue);
  margin-left: 5%;
  margin-right: 5%;
`

export type DateToReviewProps = {
  selected: boolean
  needsGradingIndicator: boolean
}

export const DateToReview = styled.div<DateToReviewProps>`
  text-align: center;
  font-size: 3vh;
  cursor: pointer;
  color: ${({ selected, needsGradingIndicator }) =>
    selected
      ? 'var(--grey)'
      : needsGradingIndicator
        ? 'var(--red)'
        : 'var(--blue)'};
`
export const ReviewListContainer = styled.div`
  margin-top: 5%;

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
export type ReturnNameProps = {
  returned: boolean
}
export const ReviewName = styled.div<ReturnNameProps>`
  display: grid;
  justify-items: left;
  align-items: center;
  color: ${({ returned }) => (returned ? 'var(--blue)' : 'var(--red)')};
`

export const ReturnReview = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  cursor: pointer;
`
export const ReturnedStatus = styled.div`
  color: var(--red);
`
