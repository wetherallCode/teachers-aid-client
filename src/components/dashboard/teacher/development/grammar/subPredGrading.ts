export type SubjectPredicateGraderArgs = {
  givenSubject: string
  correctSubject: string
  noun: string
  verb: string
  givenPredicate: string
  correctPredicate: string
  prepositionalPhrases: string[]
}

export const subjectPredicateGradingArgsObj: SubjectPredicateGraderArgs = {
  givenSubject: '',
  correctSubject: '',
  noun: '',
  verb: '',
  givenPredicate: '',
  correctPredicate: '',
  prepositionalPhrases: [],
}

export const subjectPredicateGrader = ({
  givenSubject,
  correctSubject,
  noun,
  verb,
  givenPredicate,
  correctPredicate,
  prepositionalPhrases,
}: SubjectPredicateGraderArgs) => {
  const subjectCheck = givenSubject.split(' ')
  const predicateCheck = correctPredicate.split(' ')
  console.log(noun)
  console.log(subjectCheck)
  console.log(!subjectCheck.includes(noun))
  if (!subjectCheck.includes(noun)) {
    return 'Your subject needs to include the person, place, thing, or idea that the sentence is about.'
  }
  if (!subjectCheck.includes(verb)) {
    return 'Your subject needs to include the person, place, thing, or idea that the sentence is about.'
  }
  if (givenSubject !== correctSubject) {
    return `Your subject isn't correct`
  }
  return 'correct'
}
