import isUndefined from 'lodash/isUndefined'

export const GetCommonComics = ({ comicRepository }) => async (firstCharacterId, secondCharacterId) => {
  if (isUndefined(firstCharacterId) || isUndefined(secondCharacterId)) {
    return []
  }

  const [firstCharacterComics, secondCharacterComics] = await Promise.all([
    comicRepository.findBy(firstCharacterId),
    comicRepository.findBy(secondCharacterId)
  ])

  return firstCharacterComics.filter(comic1 => secondCharacterComics.some(comic2 => comic1.id === comic2.id))
}
