import { MutationFunctionOptions } from '@apollo/client'
import React, { FC } from 'react'
import {
	findTemporaryTasks_findTemporaryTasks_temporaryTasks,
	gradeTemporaryTask,
	gradeTemporaryTaskVariables,
} from '../../../../../schemaTypes'
import { responsibilityPointConverter } from '../../../../../utils'
import { MarkCompleteButton, MarkCompleteContainer } from './state-n-styles/temporaryTaskStyles'

export type MarkCompleteProps = {
	answered: boolean
	task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
	studentPresent: boolean
	gradeTask: (
		options?: MutationFunctionOptions<gradeTemporaryTask, gradeTemporaryTaskVariables> | undefined
	) => void
	grade: number
}

export const MarkComplete: FC<MarkCompleteProps> = ({
	answered,
	studentPresent,
	gradeTask,
	task,
	grade,
}) => {
<<<<<<< HEAD
  // const { grade } = useGradeCalculator(task.student._id!, task.markingPeriod)
  return (
    <MarkCompleteContainer>
      <MarkCompleteButton
        answered={answered}
        studentPresent={studentPresent}
        onClick={() => {
          // studentPresent && setAnswered()
          studentPresent &&
            gradeTask({
              variables: {
                input: {
                  _id: task._id!,
                  answered: !answered,
                  studentPresent,
                  lastGrade: task.lastGrade,
                  // responsibilityPoints: responsibilityPointConverter(100, 2),
                  responsibilityPoints: 2,
                },
                // },
              },
            })
        }}
      >
        {answered ? 'Completed' : 'Incomplete'}
      </MarkCompleteButton>
    </MarkCompleteContainer>
  )
=======
	// const { grade } = useGradeCalculator(task.student._id!, task.markingPeriod)
	return (
		<MarkCompleteContainer>
			<MarkCompleteButton
				answered={answered}
				studentPresent={studentPresent}
				onClick={() => {
					studentPresent &&
						gradeTask({
							variables: {
								input: {
									_id: task._id!,
									answered: !answered,
									studentPresent,
									lastGrade: task.lastGrade,
									responsibilityPoints: responsibilityPointConverter(grade, 2),
								},
								// },
							},
						})
				}}>
				{answered ? 'Completed' : 'Incomplete'}
			</MarkCompleteButton>
		</MarkCompleteContainer>
	)
>>>>>>> 2409249a9f47e5f0d4ca4d6ee96769024d315976
}
