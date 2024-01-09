import styled from 'styled-components'
import {
  LineInput,
  Standard7x12Container,
  Standard8x12Container,
} from '../../../../../../appStyles'
import { AssignmentDetailsContainer } from '../../essays/assigned-essays/state-and-styles/assignedEssayStyles'
import {
  ReadingGuideContainer,
  ReadingGuideHeader,
  ReadingGuideInfoContainer,
  ReadingGuideInfoSwitchButtonContainer,
  ReadingGuideToCompleteContainer,
} from '../../readingGuides/state-and-styles/readingGuideStyles'

export const ArticleReviewContainer = styled(ReadingGuideContainer)``
export const ArticleReviewInfoContainer = styled(ReadingGuideInfoContainer)`
  overflow: scroll;
`
export const ArticleReviewHelpHeader = styled.div`
  grid-row: 1/2;
  grid-column: 1/-1;
  justify-self: center;
  align-self: center;
  text-decoration: underline;
`
export const ArticleReviewHelpBody = styled.div`
  grid-row: 2/-1;
  grid-column: 1/-1;
`
export const ArticleReviewDetalisContainer = styled(AssignmentDetailsContainer)`
  grid-template-rows: 1fr 1fr;
`
export const ArticleReviewInfoSwitchButtonContainer = styled(
  ReadingGuideInfoSwitchButtonContainer,
)``

export const ArticleReviewToCompleteContainer = styled(
  ReadingGuideToCompleteContainer,
)``

export type ArticleReviewSubmitButtonProps = {
  toggled: boolean
}

export const ArticleReviewSubmitButton = styled.button<ArticleReviewSubmitButtonProps>`
  grid-row: 8/9;
  grid-column: 1/-1;
  background-color: ${({ toggled }) =>
    toggled ? 'var(--red)' : 'var(--blue)'};
  color: var(--white);
  width: 50%;
  height: 40%;
  justify-self: center;
  font-size: 2vw;
  align-self: center;
`
export const ArticleReviewHeader = styled(ReadingGuideHeader)``
export const ArticleReviewToCompleteInformationContainer = styled(
  Standard7x12Container,
)`
  grid-row: 2/8;
  grid-column: 1/-1;
`

export const Required = styled.span`
  color: var(--red);
`
export const ArticleReviewInputs = styled(LineInput)`
  width: 90%;
  height: 50%;
  font-size: 2vw;
  color: var(--blue);
`

export const ArticleReviewArticleNameContainer = styled.div`
  grid-row: 1/2;
  grid-column: 2/-1;
  font-size: 2vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-items: left;
  align-items: center;
`

export const ArticleReviewArticleNameInput = styled(ArticleReviewInputs)`
  width: 90%;
`

export const ArticleReviewArticleLinkContainer = styled.div`
  grid-row: 2/3;
  grid-column: 2/-1;
  font-size: 2vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-items: left;
  align-items: center;
`
export const ArticleReviewArticleLinkInput = styled(ArticleReviewInputs)`
  width: 90%;
`

export const ArticleReviewAuthorContainer = styled.div`
  grid-row: 3/4;
  grid-column: 2/-1;
  font-size: 2vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-items: left;
  align-items: center;
`
export const ArticleReviewAuthorInput = styled(ArticleReviewInputs)`
  width: 90%;
  height: 40%;
`
export const ArticleReviewIssueContainer = styled.div`
  grid-row: 4/5;
  grid-column: 2/-1;
  font-size: 2vw;
  display: grid;

  justify-items: left;
  align-items: center;
`
export const ArticleReviewIssueInput = styled(ArticleReviewInputs)`
  width: 90%;
`
export const ArticleReviewBiasContainer = styled.div`
  grid-row: 5/6;
  grid-column: 2/-1;
  font-size: 2vw;
  display: grid;

  justify-items: left;
  align-items: center;
`
export const ArticleReviewBiasSelect = styled.select`
  width: 40%;
  height: 70%;
  color: inherit;
  font-size: 2vw;
`
export const ArticleReviewSolutionsContainer = styled.div`
  grid-row: 6/7;
  grid-column: 2/-1;
  font-size: 2vw;
  display: grid;

  justify-items: left;
  align-items: center;
`
export const ArticleReviewSolutionsInput = styled.textarea`
  width: 90%;
  height: 100%;
  color: var(--blue);
  font-family: inherit;
`
export const ArticleReviewArticleImportanceContainer = styled.div`
  grid-row: 7/8;
  grid-column: 2/-1;
  font-size: 2vw;
  display: grid;

  justify-items: left;
  align-items: center;
`
export const ArticleReviewArticleImportanceInput = styled.textarea`
  width: 90%;
  height: 100%;
  color: var(--blue);
  font-family: inherit;
`
