import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useEnumContextProvider } from '../../../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../../../contexts/UserContext'
import { me_me_Teacher } from '../../../../../../../schemaTypes'

export type SecondaryGradesProps = {}

export const SecondaryGrades = ({}: SecondaryGradesProps) => {
	const { course } = useParams()
	const { markingPeriodEnum } = useEnumContextProvider()
	const [markingPeriod] = useMarkingPeriodContextProvider()
	const me: me_me_Teacher = useUserContextProvider()

	const [courseName] = me.teachesCourses.filter((courseToFind) => courseToFind._id === course)

	const [markingPeriodSelect, setMarkingPeriodSelect] = useState(
		markingPeriod.context.currentMarkingPeriod
	)
	const [rosterList, setRosterList] = useState<any[]>([])
	const [csvToggle, setCsvToggle] = useState(false)
	console.log(csvToggle)
	return <div>Secondary Grades</div>
}
