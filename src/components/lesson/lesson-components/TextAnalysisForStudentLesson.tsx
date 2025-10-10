import {
  DisplayTitle,
  DoubleSidedContentContainer,
  IndividualContentContainer,
  ContentContainerTitle,
  TextAnalysisForStudentLessonContainer,
} from '../../dashboard/student/handbook/handbookStyles'

export type TextAnalysisForStudentLessonProps = {}

export const TextAnalysisForStudentLesson =
  ({}: TextAnalysisForStudentLessonProps) => {
    const problemSolutionWords = ['Problem', 'Solution', 'Issue', 'Compromise']
    return (
      <TextAnalysisForStudentLessonContainer>
        <DisplayTitle>Text Analysis Help</DisplayTitle>

        <DoubleSidedContentContainer style={{ fontSize: '2.8vh' }}>
          <div>
            <ContentContainerTitle>
              How to Make a Main Idea
            </ContentContainerTitle>
            <ul>
              <li>
                Read each sentence of the paragraph and split the sentence into
                Subject and Predicate. Then underline the subject and what the
                subjects are doing.
              </li>
              <li>
                Go back over the underlines to get an understanding of the
                paragraph.
              </li>
              <li>
                As a group, choose what you will write for the Main Idea and
                everyone has to write it. How? Ask these questions as a group:
                <ul>
                  <li>What is happening in the paragraph?</li>
                  <br />
                  <li>
                    Did something cause that or did that lead to something
                    happening?
                  </li>
                  <br />
                  <li>
                    Is the cause a problem and the effect a solution? Change it
                    to Problem and Solution
                  </li>
                  <br />
                  <li>
                    If none of these questions can be answered, it’s probably
                    description (but double check with me first)
                  </li>
                </ul>
                <li>Repeat for the next paragraph.</li>
              </li>
            </ul>
          </div>
          <div>
            <ContentContainerTitle>How to Carefully Read</ContentContainerTitle>
            <br />
            <ul>
              <li>
                Always look for commas in the sentence and start looking for the
                nouns and verbs to the left of the comma and then the right of
                the comma.
              </li>
              <br />
              <li>
                Look for the verb. Look for -ed endings, was, were, or had.{' '}
              </li>
              <li>
                Find out who or what was doing the action and underlne it and
                draw a line between the subject and the verb.
              </li>
              <ul>
                <li>
                  There may be more actions, so look throughout the rest of the
                  sentence for people/things doing things so split and underline
                  them too.
                </li>
              </ul>
              <br />
            </ul>
          </div>
        </DoubleSidedContentContainer>
      </TextAnalysisForStudentLessonContainer>
    )
  }
