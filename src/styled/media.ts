const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`

export const media = {
  custom: customMediaQuery,
  macBookPro16: customMediaQuery(1792),
  macBook: customMediaQuery(1280),
  iPad: customMediaQuery(1024),
  iPhone: customMediaQuery(375),
}
