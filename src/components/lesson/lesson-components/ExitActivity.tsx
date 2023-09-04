import {
  findLessonByCourseAndDate_findLessonByCourseAndDate_lesson,
  me_me,
} from '../../../schemaTypes'
import {
  LessonComponentTitleContainer,
  LessonComponentDetailsContainer,
  LessonComponentDetailsStyle,
  LessonMainScreen,
} from '../state-n-styles/lessonStyles'
import { ExitActivityResponse } from './ExitActivityResponse'

export type ExitActivityProps = {
  lesson: findLessonByCourseAndDate_findLessonByCourseAndDate_lesson
  me: me_me
  setPolling: React.Dispatch<React.SetStateAction<number>>
}

export const ExitActivity = ({ lesson, me, setPolling }: ExitActivityProps) => {
  return (
    <>
      <LessonComponentTitleContainer>Exit Ticket</LessonComponentTitleContainer>
      <LessonComponentDetailsContainer>
        {me.__typename === 'Student' && (
          <>
            {lesson.afterActivity.isActive && (
              <ExitActivityResponse
                lesson={lesson}
                me={me}
                setPolling={setPolling}
              />
            )}
          </>
        )}
      </LessonComponentDetailsContainer>
    </>
  )
}
