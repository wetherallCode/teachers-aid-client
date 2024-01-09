import { MutationFunctionOptions } from '@apollo/client'
import React from 'react'
import {
  assignRegularSeats,
  assignRegularSeatsVariables,
  findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats,
  findCourseByIdForStudentRegistration_findCourseById_course_hasStudents,
} from '../../../../../../schemaTypes'

import {
  TwentySixIndividualSeatFloorPlan,
  FiveRowColumn,
  IndividualDeskContainer,
  DeskContainer,
  ThirtySeatPairsFloorPlan,
  PairSeatingGroup,
  LeftSide,
  RightSide,
} from '../../../teachers-aid/styles/seatingChartStyles'
import { AssignedDesk } from './AssignedDesk'

export type ThirtySeatPairSeatingChartProps = {
  course: string
  assignedSeats: findCourseByIdForStudentRegistration_findCourseById_course_hasCourseInfo_assignedSeats[]
  assignSeats: (
    options?:
      | MutationFunctionOptions<assignRegularSeats, assignRegularSeatsVariables>
      | undefined,
  ) => void
  studentsInCourse: findCourseByIdForStudentRegistration_findCourseById_course_hasStudents[]
}

export const ThirtySeatPairSeatingChart = ({
  course,
  assignedSeats,
  assignSeats,
  studentsInCourse,
}: ThirtySeatPairSeatingChartProps) => {
  return (
    <>
      {/* <TwentySixIndividualSeatFloorPlan> */}
      <ThirtySeatPairsFloorPlan>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 1)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 2)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 3)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 4)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 5)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 6)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 7)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 8)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 9)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 10)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 11)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 12)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 13)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 14)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 15)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 16)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 17)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 18)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 19)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 20)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 21)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 22)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 23)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 24)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 25)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 26)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 27)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 28)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide>
        </PairSeatingGroup>
        <PairSeatingGroup>
          <LeftSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 29)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </LeftSide>
          {/* <RightSide>
            <DeskContainer>
              <AssignedDesk
                assignedSeats={assignedSeats}
                course={course}
                assignSeats={assignSeats}
                desk={assignedSeats.filter((desk) => desk.deskNumber === 30)[0]}
                studentsInCourse={studentsInCourse}
              />
            </DeskContainer>
          </RightSide> */}
        </PairSeatingGroup>
      </ThirtySeatPairsFloorPlan>
      {/* </TwentySixIndividualSeatFloorPlan> */}
    </>
  )
}
