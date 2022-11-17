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
            <ContentContainerTitle>Cause and Effect</ContentContainerTitle>
            <ul>
              <li>
                For each action, ask your self: Why did that action happen? If
                there is another action in the paragraph (or one of the
                paragraphs that came before) that made it happen; that is the
                cause.
                <ul>
                  <li>
                    One cause may have many effects, so don't think it is always
                    one cause to an effect.
                  </li>
                  <li>One effect may have two or more causes.</li>
                  <li>
                    Look for key words to show cause and effect: because, as a
                    result, therefore, consequently, due to...{' '}
                  </li>
                  <li>
                    Label causes with the letter C and effects with the letter E
                    to help keep track.
                  </li>
                </ul>
                <li>
                  Use that cause and effect relationship to form your main idea
                  for that paragraph.
                </li>
                <ul>
                  <li>
                    Remember the word "because" helps to form cause and effect
                    sentences.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div>
            <ContentContainerTitle>Problem and Solution</ContentContainerTitle>

            <ul>
              <li>
                If there is no obvious cause and effect, look for problems.
              </li>
              <ul>
                <li>
                  Problems are things that get in the way of people's goals.
                </li>
                <li>
                  Label goals with the letter G and P for things that get in the
                  way.
                </li>
                <li>
                  For your main idea, build a sentence that explains the goal
                  and who or what is getting in the way of that goal.
                </li>
              </ul>
              <br />
              <li>
                Many times the problems are discussed in one paragraph and then
                solved in the next paragraph or so.
              </li>
              <ul>
                <li>
                  For your main idea: Build a sentence that shows the problem
                  and then explain what was done that achieved the goal.
                </li>
                <li>Label solutions with an S.</li>
              </ul>
              <br />
              <li>
                Look for key words to show problem and solution: problem,
                solution, compromise, issue...{' '}
              </li>
            </ul>
          </div>
        </DoubleSidedContentContainer>
      </TextAnalysisForStudentLessonContainer>
    )
  }
