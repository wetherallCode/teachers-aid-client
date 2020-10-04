import {
  InformationStructureEnum,
  AcademicOutcomeTypes,
  ProtocolActivityTypes,
} from './schemaTypes'

export const capitalizer = (word: string) => {
  return word.substring(0, 1) + word.substring(1).toLowerCase()
}

export const dateConverter = (date: string) => {
  console.log(date)
  //  '2020-10-03'
  if (date.charAt(5) === '0' && date.charAt(8) === '0') {
    return (
      date.substring(6, 7) +
      '/' +
      date.substring(9) +
      '/' +
      date.substring(0, 4)
    )
  } else if (date.charAt(5) === '0' && date.charAt(8) !== '0') {
    return (
      date.substring(6, 7) +
      '/' +
      date.substring(8) +
      '/' +
      date.substring(0, 4)
    )
  } else if (date.charAt(5) !== '0' && date.charAt(8) === '0') {
    return (
      date.substring(5, 7) +
      '/' +
      date.substring(9) +
      '/' +
      date.substring(0, 4)
    )
  } else
    return (
      date.substring(5, 7) +
      '/' +
      date.substring(8) +
      '/' +
      date.substring(0, 4)
    )
}

export const timeConverter = (time: string) => {
  let convertedTime: string[] = []
  if (time.split('').length === 10) {
    convertedTime = ['0', ...time.split('')]
    return convertedTime.join('')
  }

  return time
}

export const timeFinder = (time: string) => {
  return `${new Date().toLocaleDateString()}, ${time}`
}

export const time = new Date().toLocaleString()
export const militaryTime = new Date().toLocaleTimeString('en-US', {
  hour12: false,
})
export const date = new Date().toLocaleDateString()
export const noon = `${new Date().toLocaleDateString()}, 12:00:00 PM`
export const evening = `${new Date().toLocaleDateString()}, 5:00:00 PM`

export const dueTimeDisplay = (time: string) =>
  time.substring(0, 1) === '0'
    ? time.substring(1, 5) + ' ' + time.substring(9, 11)
    : time.substring(0, 5) + ' ' + time.substring(9, 11)

export const informationStructure = (item: InformationStructureEnum) => {
  return item === 'SEQUENCE'
    ? 'Sequence'
    : item === 'CAUSE_EFFECT'
    ? 'Cause and Effect'
    : item === 'PROBLEM_SOLUTION'
    ? 'Problem and Solution'
    : 'Compare and Contrast'
}

export const academicOutcomeTypes = (outcomes: AcademicOutcomeTypes) =>
  outcomes === AcademicOutcomeTypes.SCHEMA_BUIDING
    ? 'Schema Building'
    : outcomes === AcademicOutcomeTypes.LOGIC_BUILDING
    ? 'Logic Building'
    : 'Socratic Question'

export const protocolActivityTypes = (activities: ProtocolActivityTypes) =>
  activities === ProtocolActivityTypes.INDIVIDUAL
    ? 'Individual'
    : 'Think Pair Share'

export const macBookPro = window.screen.width === 1792
export const macBook = window.screen.width === 1280
export const ipad = window.screen.width === 1024
export const iPhone = window.screen.width === 375

export const todaysLocaleDate: string = new Date()
  .toLocaleString()
  .substring(0, 9)

// export const sortByLastName = (a: string, b: string) => {
//   let lastNameA = a.lastName.toLowerCase()
//   let lastNameB = b.lastName.toLowerCase()

//   if (lastNameA < lastNameB) {
//     return -1
//   }
//   if (lastNameA > lastNameB) {
//     return 1
//   }
//   return 0
// }

export const twentyFourStudentClassSize = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
]

export const twelveStudentClassSize = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const redCohort = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
]
export const whiteCohort = [
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
