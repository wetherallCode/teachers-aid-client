import { Machine } from 'xstate'
import { StudentSeatInput } from '../../../../../../../schemaTypes'

export type assignSeatsMachineSchema = {
  states: {
    assignSeats: {}
  }
}
export type assignSeatsMachineEvent =
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SET_COURSE_ID'; payload: string }
  | { type: 'LOAD_SEATS'; payload: StudentSeatInput[] }
  | {
      type: 'ASSIGN_SEAT'
      payload: { seat: StudentSeatInput; location: number }
    }
  | { type: 'ADD_SEATS'; payload: StudentSeatInput }

export type assignSeatsMachineContext = {
  seat: StudentSeatInput
}

export const assignSeatsMachine = Machine<
  assignSeatsMachineContext,
  assignSeatsMachineSchema,
  assignSeatsMachineEvent
>({
  id: 'assignSeats',
  initial: 'assignSeats',
  context: {
    seat: {
      deskNumber: 0,
      studentId: null,
    },
  },
  states: {
    assignSeats: {
      on: {
        // SET_COURSE_ID: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       seatToAssign: { ...ctx.seatsToAssign, courseId: evt.payload },
        //     }
        //   }),
        // },
        // LOAD_SEATS: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       seatsToAssign: {
        //         ...ctx.seatsToAssign,
        //         assignedSeats: evt.payload,
        //       },
        //     }
        //   }),
        // },
        // ASSIGN_SEAT: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       seat: {
        //         deskNumber: evt.payload,
        //         studentId: evt.payload,
        //       },
        //     }
        //   }),
        // },
        // ADD_SEATS: {
        //   actions: assign((ctx, evt) => {
        //     return {
        //       ...ctx,
        //       seatsToAssign: {
        //         ...ctx.seatsToAssign,
        //         assignedSeats: [
        //           ...ctx.seatsToAssign.assignedSeats,
        //           evt.payload,
        //         ],
        //       },
        //     }
        //   }),
      },
    },
  },
})
