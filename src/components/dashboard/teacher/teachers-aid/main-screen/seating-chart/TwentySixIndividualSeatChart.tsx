import React from 'react'
import {
	DeskContainer,
	FiveRowColumn,
	IndividualDeskContainer,
	TwentySixIndividualSeatFloorPlan,
} from '../../styles/seatingChartStyles'
import { Desk } from './Desk'

export type TwentySixIndividualSeatChartProps = {}

export const TwentySixIndividualSeatChart = ({}: TwentySixIndividualSeatChartProps) => {
	return (
		<TwentySixIndividualSeatFloorPlan>
			<FiveRowColumn>
				<div></div>
				<div></div>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={5} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={6} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={11} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={12} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={17} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={18} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={23} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={24} />
					</DeskContainer>
				</IndividualDeskContainer>
			</FiveRowColumn>

			<FiveRowColumn>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={1} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={2} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={7} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={8} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={13} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={14} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={19} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={20} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={25} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={26} />
					</DeskContainer>
				</IndividualDeskContainer>
			</FiveRowColumn>

			<FiveRowColumn>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={3} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={4} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={9} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={10} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={15} />
					</DeskContainer>
				</IndividualDeskContainer>
				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={16} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={21} />
					</DeskContainer>
				</IndividualDeskContainer>

				<IndividualDeskContainer>
					<DeskContainer>
						<Desk deskNumber={22} />
					</DeskContainer>
				</IndividualDeskContainer>
				<div></div>
				<div></div>
			</FiveRowColumn>
		</TwentySixIndividualSeatFloorPlan>
	)
}
