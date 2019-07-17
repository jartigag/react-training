import isUndefined from 'lodash/isUndefined'
import { ComicRepository } from 'core/domain/model/Comic/ComicRepository'

export const GetCommonComics = async (firstCharacterId, secondCharacterId) => {
  if (isUndefined(firstCharacterId) || isUndefined(secondCharacterId)) {
    return []
  }

  const [firstCharacterComics, secondCharacterComics] = await Promise.all([
    ComicRepository.findBy(firstCharacterId),
    ComicRepository.findBy(secondCharacterId)
  ])

  return firstCharacterComics.filter(comic1 => secondCharacterComics.some(comic2 => comic1.id === comic2.id))
}
