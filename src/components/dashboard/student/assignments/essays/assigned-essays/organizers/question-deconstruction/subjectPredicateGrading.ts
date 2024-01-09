import { NounTypeEnum, VerbTypeEnum } from '../../../../../../../../schemaTypes'

export type SubjectPredicateGraderProps = {
  givenSubject: string
  correctSubject: string
  sentence: string
  noun: string[]
  nounType: NounTypeEnum
  compoundNoun: boolean
  verb: string
  verbType: VerbTypeEnum
  givenPredicate: string
  helpingVerb: string
}

export const subjectPredicateGrading = ({
  givenSubject,
  givenPredicate,
  sentence,
  noun,
  verb,
  verbType,
  helpingVerb,
}: SubjectPredicateGraderProps) => {
  const subjectCheck = givenSubject.split(' ')
  const predicateCheck = givenPredicate.split(' ')
  const verbPhraseCheck = verb.split(' ').length > 1
  const verbPhraseSplitter = verb.split(' ')
  const verbPunctuationSplitter = verb.split('')
  console.log(subjectCheck.join(' '))
  const wholeVerb = helpingVerb === 'did' ? verb : helpingVerb
  // console.log(subjectCheck)
  if (givenPredicate === '.' || givenPredicate === '?') {
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

  if (!subjectCheck.includes(noun[noun.length - 1])) {
    return {
      whatWentWrong:
        `"` + givenSubject + `" doesn't contain a noun or the complete noun.`,
      howToFix:
        'Your subject needs to include the person, place, thing, or idea that the sentence is about. If it is a name, it may be two words.',
      correct: false,
    }
  }
  for (const word of verbPhraseSplitter) {
    if (
      verbPhraseCheck &&
      subjectCheck.includes(word) &&
      !givenSubject.includes(verb)
    ) {
      return {
        whatWentWrong: `You've split the verb phrase!`,
        howToFix: `Separate the sentence before the verb phrase. In many cases you are splitting the sentence between the helping verb and the action verb that goes with it.`,
        correct: false,
      }
    }
  }
  if (
    subjectCheck.join(' ').includes(verb) ||
    subjectCheck.includes(helpingVerb)
  ) {
    console.log(subjectCheck)

    return {
      whatWentWrong: `Your subject (left side of the divider) contains a verb.`,
      howToFix:
        `Look at the statement and make sure the ` +
        (verbType === VerbTypeEnum.ACTION
          ? `action word isn't in the subject.`
          : verbType === VerbTypeEnum.BEING
            ? `being word (${helpingVerb}) isn't in the subject.`
            : verbType === VerbTypeEnum.HAVING
              ? `word have or had isn't in the subject.`
              : `feeling word isn't in the subject.`),
      correct: false,
    }
  }

  if (
    verbPhraseCheck
      ? predicateCheck[0] !== verbPhraseSplitter[0]
      : predicateCheck[0] !== wholeVerb
  ) {
    return {
      whatWentWrong: `Your subject is missing prepositional phrases that describe the person, place, idea or thing the sentence is about.`,
      howToFix: `Sometimes the noun and the verb aren't next to each other. Break the sentence right before the action, being, or feeling word.`,
      correct: false,
    }
  }
  return { message: 'Correct - Good job!', correct: true }
}
