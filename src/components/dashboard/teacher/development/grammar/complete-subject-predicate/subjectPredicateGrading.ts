export type SubjectPredicateGraderProps = {
  givenSubject: string
  correctSubject: string
  sentence: string
  noun: string
  nounType: string
  verb: string
  verbType: string
  givenPredicate: string
  // correctPredicate: string
  // prepositionalPhrases: string[]
  // object: string
}

// export const subjectPredicateGradingArgsObj: SubjectPredicateGraderArgs = {
//   givenSubject: '',
//   correctSubject: '',
//   sentence: '',
//   noun: '',
//   verb: '',
//   verbType: '',
//   givenPredicate: '',
//   correctPredicate: '',
//   prepositionalPhrases: [],
//   object: '',
// }

export const subjectPredicateGrader = ({
  givenSubject,
  correctSubject,
  givenPredicate,
  sentence,
  noun,
  nounType,
  verb,
  verbType,
}: // correctPredicate,
// prepositionalPhrases,
// object,
SubjectPredicateGraderProps) => {
  const subjectCheck = givenSubject.split(' ')
  const predicateCheck = givenPredicate.split(' ')

  if (givenPredicate === '.') {
    return {
      whatWentWrong: `Your subject can't be the whole sentence.`,
      howToFix: `Your subject needs to include the person, place, thing, or idea that the sentence is about, but not include an action, being, or feeling word.`,
      correct: false,
    }
  }

  for (const word of subjectCheck) {
    if (!sentence.split(' ').includes(word)) {
      return {
        whatWentWrong: `You've split a word!`,
        howToFix: `Only separate the sentence between words`,
        correct: false,
      }
    }
  }

  if (!subjectCheck.includes(noun)) {
    return {
      whatWentWrong: `"` + givenSubject + `" doesn't contain a noun. `,
      howToFix:
        'Your subject needs to include the person, place, thing, or idea that the sentence is about.',
      correct: false,
    }
  }
  if (subjectCheck.includes(verb)) {
    return {
      whatWentWrong: `Your subject contains a verb.`,
      howToFix:
        `Look at the statement and take out the ` +
        (verbType === 'action'
          ? `action word`
          : verbType === 'being'
          ? `being word (was or were)`
          : 'feeling word'),
      correct: false,
    }
  }
  if (predicateCheck[0] !== verb) {
    return {
      whatWentWrong: `Your subject is missing prepositional phrases that describe the person, place, idea or thing the sentence is about.`,
      howToFix: `Sometimes the noun and the verb aren't next to each other. Break the sentence right before the action, being, or feeling word.`,
      correct: false,
    }
  }
  if (givenSubject !== correctSubject) {
    return { whatWentWrong: `Your subject isn't correct`, correct: false }
  }
  return { message: 'Correct - Good job!', correct: true }
}
