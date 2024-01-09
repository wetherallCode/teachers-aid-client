import { useMarkingPeriodContextProvider } from '../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useGradeCalculator } from '../../../../hooks/useGradeCalculator'
import { me_me_Student } from '../../../../schemaTypes'
import {
  DisclaimerContainer,
  StudentGradeBreakdownContainer,
  StudentGradeBreakdownContainerTitle,
} from './studentGradeBreakdownStyles'
import { AssignmentFinder } from './assignment-grades/AssignmentFinder'

export type GradesProps = { me: me_me_Student }

export const Grades = ({ me }: GradesProps) => {
  const [markingPeriodState] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = markingPeriodState.context

  const { grade, loading } = useGradeCalculator({
    studentId: me._id!,
    markingPeriod: currentMarkingPeriod,
    polling: false,
    pollInterval: 1000,
  })

  if (loading) return <div>loading</div>

  return (
    <StudentGradeBreakdownContainer>
      <StudentGradeBreakdownContainerTitle>
        Grade Breakdown
      </StudentGradeBreakdownContainerTitle>

      <AssignmentFinder me={me} currentMarkingPeriod={currentMarkingPeriod} />

      <StudentGradeBreakdownContainerTitle>
        Overall Grade: {grade}%
      </StudentGradeBreakdownContainerTitle>
      <DisclaimerContainer>
        <div>
          Your grades are constantly changing. Look at your averages and find
          where you can make improvements.
        </div>
        <br />
        <div>
          These grades are more up to date than Genesis grades. Though I update
          Genesis everyday, they won't always be accurate as the grades on this
          website.
        </div>
      </DisclaimerContainer>
    </StudentGradeBreakdownContainer>
  )
}
