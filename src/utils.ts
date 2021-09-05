import { InformationStructureEnum, RubricEntryInput } from './schemaTypes'

export const primaryGradeCalculator = (
  earnedPoints: number,
  maxPoints: number
) => {
  return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 50
}

export const secondaryGradeCalculator = (
  earnedPoints: number,
  maxPoints: number
) => {
  return (Math.round(1000 * (earnedPoints / maxPoints)) / 1000) * 35
}

export const supportiveGradeCalculator = (points: number) => {
  return (Math.round(1000 * points) / 1000) * 0.15
}

export const responsibilityPointConverter = (
  grade: number,
  pointTotal: number
) => {
  if (grade < 60) {
    return pointTotal * 1.5
  } else if (grade >= 60 && grade < 70) {
    return pointTotal * 0.8
  } else if (grade >= 70 && grade < 80) {
    return pointTotal * 0.75
  } else if (grade >= 80 && grade < 90) {
    return pointTotal * 0.5
  } else if (grade >= 90 && grade < 100) {
    return pointTotal * 0.25
  } else return pointTotal * 0.1
}

export const totalGrade = (
  primaryGrade: number,
  secondaryGrade: number,
  supportiveGrade: number
) => {
  const number = Number(
    Number(primaryGrade) + Number(secondaryGrade) + Number(supportiveGrade)
  ).toFixed(3)

  return Math.round(Number(number) * 10) / 10
}

export const letterGrade = (percentageGrade: number) => {
  if (percentageGrade > 89) {
    return 'A'
  }
  if (percentageGrade > 79 && percentageGrade < 90) {
    return 'B'
  }
  if (percentageGrade > 69 && percentageGrade < 80) {
    return 'C'
  }
  if (percentageGrade > 59 && percentageGrade < 70) {
    return 'D'
  } else return 'F'
}
export const capitalizer = (word: string) => {
  return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
}
export const sentenceCapitalizer = (sentence: string) => {
  const splitSentence = sentence.split('')
  // console.log(splitSentence[0].toUpperCase() + splitSentence.slice(1).join(''))
  return (
    splitSentence[0].toUpperCase() +
    splitSentence.slice(1).join(' ').replace(' | ', '')
  )
}

export const timeAFunction = (startTime: string, endTime: string) => {
  const startTimeMinutes = +startTime
    .split('')
    .slice(startTime.length - 10, startTime.length - 8)
    .join('')
  const startTimeSeconds = +startTime
    .split('')
    .slice(startTime.length - 7, startTime.length - 1)
    .join('')
  const endTimeMinutes = +endTime
    .split('')
    .slice(endTime.length - 10, endTime.length - 8)
    .join('')
  const endTimeSeconds = +endTime
    .split('')
    .slice(endTime.length - 7, endTime.length - 1)
    .join('')
  return endTimeMinutes - startTimeMinutes === 0
    ? endTimeSeconds - startTimeSeconds
    : endTimeSeconds -
        startTimeSeconds +
        (60 * endTimeMinutes - startTimeMinutes)
}

export const sortByRubricEntryScore = (
  a: RubricEntryInput,
  b: RubricEntryInput
) => {
  if (a.score < b.score) {
    return 1
  } else return -1
}

export const dateInputConverter = (date: string) => {
  const year = new Date(date).getFullYear()
  const day =
    Number(new Date(date).getDate()) < 10
      ? '0' + new Date(date).getDate()
      : new Date(date).getDate()
  const month =
    Number(new Date(date).getMonth() + 1) < 10
      ? '0' + Number(new Date(date).getMonth() + 1).toString()
      : new Date(date).getMonth() + 1
  return year + '-' + month + '-' + day
}

export const dateConverter = (date: string) => {
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

export const splitSentenceByWord = (originalSentence: string) => {
  const splitOriginalSentence = originalSentence.split(' ')

  const endingPunctuation =
    originalSentence[originalSentence.length - 1].split('')[
      originalSentence[originalSentence.length - 1].split('').length - 1
    ]

  const lastWord = splitOriginalSentence[splitOriginalSentence.length - 1]
    .split('')
    .slice(
      0,
      splitOriginalSentence[splitOriginalSentence.length - 1].split('').length -
        1
    )
    .join('')

  return [
    ...splitOriginalSentence.slice(0, splitOriginalSentence.length - 1),
    lastWord,
    endingPunctuation,
  ]
}

export const macBookPro = window.screen.width === 1792
export const macBook = window.screen.width === 1280
export const ipad = window.screen.width === 1024
export const iPhone = window.screen.width === 375

export const todaysLocaleDate: string = new Date()
  .toLocaleString()
  .substring(0, 9)

export const sortByLetter = (a: any, b: any) => {
  let nameA = a.name.toUpperCase() // ignore upper and lowercase
  let nameB = b.name.toUpperCase() // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

export const apostopheRemover = (word: string) => {
  return word.split("'").join('')
}

export const phraseCapitalizer = (phrase: string) => {
  return phrase
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join(' ')
}

export const underscoreEliminator = (string: string) => {
  return string.split('_').join(' ')
}

export const timeChanger = (value: string) => {
  const hour = value.slice(0, 2)
  const minute = value.slice(2, 6)
  const regHour = +hour > 12 ? +hour - 12 : +hour
  const ampm = +hour > 11 ? ' PM' : ' AM'
  const time = regHour + minute + ':00' + ampm
  return time
}

export const irregularPastTenseVerbList = (verb: string) => {
  const lowerCaseVerb = verb.toLowerCase()

  if (lowerCaseVerb === 'run') {
    return 'ran'
  }
  if (lowerCaseVerb === 'get') {
    return 'got'
  }
  if (lowerCaseVerb === 'fight') {
    return 'fought'
  }
  if (lowerCaseVerb === 'have') {
    return 'had'
  }
  if (lowerCaseVerb === 'begin') {
    return 'began'
  }
  if (lowerCaseVerb === 'bring') {
    return 'brought'
  }
  if (lowerCaseVerb === 'buy') {
    return 'bought'
  }
  if (lowerCaseVerb === 'break') {
    return 'broke'
  }
  if (lowerCaseVerb === 'write') {
    return 'wrote'
  }
  if (lowerCaseVerb === 'take') {
    return 'took'
  }
  if (lowerCaseVerb === 'send') {
    return 'sent'
  }
  if (lowerCaseVerb === 'sell') {
    return 'sold'
  }
  if (lowerCaseVerb === 'pay') {
    return 'paid'
  }
  if (lowerCaseVerb === 'meet') {
    return 'met'
  }
  if (lowerCaseVerb === 'make') {
    return 'made'
  }
  if (lowerCaseVerb === 'lose') {
    return 'lost'
  }
  if (lowerCaseVerb === 'go') {
    return 'went'
  }
  if (lowerCaseVerb === 'give') {
    return 'gave'
  }
  if (lowerCaseVerb === 'feel') {
    return 'felt'
  }
  if (lowerCaseVerb === 'do') {
    return 'did'
  }
  if (lowerCaseVerb === 'become') {
    return 'became'
  }
  if (lowerCaseVerb === 'choose') {
    return 'chose'
  }
  if (lowerCaseVerb === 'come') {
    return 'came'
  }

  return verb
}

export const verbsThatChangeInIngFormList = (verb: string) => {
  const lowerCaseVerb = verb.toLowerCase()

  if (lowerCaseVerb === 'run') {
    return 'running'
  }
  if (lowerCaseVerb === 'get') {
    return 'getting'
  }
  if (lowerCaseVerb === 'begin') {
    return 'beginning'
  }
  if (lowerCaseVerb === 'sell') {
    return 'selling'
  }
  if (lowerCaseVerb === 'hit') {
    return 'hitting'
  }
  if (lowerCaseVerb === 'win') {
    return 'winning'
  }
  if (lowerCaseVerb === 'plan') {
    return 'planning'
  }
  if (lowerCaseVerb === 'were' || lowerCaseVerb === 'was') {
    return 'being'
  }

  return verb
}

export const verbsThatChangeInIngFormat = (word: string) => {
  return verbsThatChangeInIngFormList(word) !== word
    ? verbsThatChangeInIngFormList(word)
    : word.charAt(word.length - 1) === 'e'
    ? word.slice(0, word.length - 1) + 'ing'
    : word + 'ing'
}

export const isLetterUpperCase = (letter: string) => /^[A-Z]*$/.test(letter)

export const twentyFourStudentClassSize = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
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
