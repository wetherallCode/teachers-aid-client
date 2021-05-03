import React, { Dispatch, FC, SetStateAction } from 'react'
import {
	findTemporaryTasks_findTemporaryTasks_temporaryTasks,
	// gradeTemporaryTask,
	// gradeTemporaryTaskVariables,
} from '../../../../../schemaTypes'
// import { responsibilityPointConverter } from '../../../../../utils'
import { useTemporaryTasksContextProvider } from './state-n-styles/TemporaryTasksContext'
import { MarkAbsentContainer } from './state-n-styles/temporaryTaskStyles'

export type MarkAbsentProps = {
	setStudentPresent: Dispatch<SetStateAction<boolean>>
	studentPresent: boolean
	task: findTemporaryTasks_findTemporaryTasks_temporaryTasks
	// gradeTask: (
	//   options?:
	//     | MutationFunctionOptions<gradeTemporaryTask, gradeTemporaryTaskVariables>
	//     | undefined
	// ) => void
}

<<<<<<< HEAD
export const MarkAbsent: FC<MarkAbsentProps> = ({
  setStudentPresent,
  studentPresent,
  task,
  gradeTask,
}) => {
  const [, event] = useTemporaryTasksContextProvider()
  // const { grade } = useGradeCalculator(task.student._id!, task.markingPeriod)
  return (
    <MarkAbsentContainer>
      <input
        type='checkbox'
        disabled={task.answered}
        checked={!studentPresent}
        onChange={() => {
          setStudentPresent((studentPresent) => !studentPresent)

          gradeTask({
            variables: {
              input: {
                _id: task._id!,
                answered: task.answered,
                studentPresent,
                lastGrade: task.lastGrade,
                // responsibilityPoints: responsibilityPointConverter(60, 2),
                // responsibilityPoints: responsibilityPointConverter(grade, 2),
                responsibilityPoints: 2,
              },
            },
          })
          studentPresent &&
            event({
              type: 'ADD_TO_ABSENT_LIST',
              payload: {
                taskNumber: task.taskNumber,
                studentIdToAdd: task.student._id!,
              },
            })
          !studentPresent &&
            event({
              type: 'DELETE_FROM_ABSENT_LIST',
              payload: {
                taskNumber: task.taskNumber,
                studentIdToDelete: task.student._id!,
              },
            })
        }}
      />
    </MarkAbsentContainer>
  )
=======
export const MarkAbsent: FC<MarkAbsentProps> = ({ setStudentPresent, studentPresent, task }) => {
	const [, event] = useTemporaryTasksContextProvider()
	// const { grade } = useGradeCalculator(task.student._id!, task.markingPeriod)
	return (
		<MarkAbsentContainer>
			<input
				type='checkbox'
				disabled={task.answered}
				checked={!studentPresent}
				onChange={() => {
					setStudentPresent((studentPresent) => !studentPresent)

					// gradeTask({
					//   variables: {
					//     input: {
					//       _id: task._id!,
					//       answered: task.answered,
					//       studentPresent,
					//       lastGrade: task.lastGrade,
					//       // responsibilityPoints: responsibilityPointConverter(60, 2),
					//       responsibilityPoints: responsibilityPointConverter(grade, 2),
					//     },
					//   },
					// })
					studentPresent &&
						event({
							type: 'ADD_TO_ABSENT_LIST',
							payload: {
								taskNumber: task.taskNumber,
								studentIdToAdd: task.student._id!,
							},
						})
					!studentPresent &&
						event({
							type: 'DELETE_FROM_ABSENT_LIST',
							payload: {
								taskNumber: task.taskNumber,
								studentIdToDelete: task.student._id!,
							},
						})
				}}
			/>
		</MarkAbsentContainer>
	)
>>>>>>> 2409249a9f47e5f0d4ca4d6ee96769024d315976
}
