import { api } from 'core/infrastructure/api'
import { Comic } from 'core/domain/model/Comic/Comic'

const findBy = async characterId => {
  const comicsDTO = await api.comics(characterId)

  return comicsDTO.map(comicDTO => new Comic(comicDTO.id, comicDTO.title, comicDTO.characters))
}

export const ApiComicRepository = {
  findBy
}
