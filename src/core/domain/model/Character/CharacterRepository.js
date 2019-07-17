import { api } from 'core/infrastructure/api'
import { Character } from './Character'

const all = async () => {
  const charactersDTO = await api.characters()

  return charactersDTO.map(characterDTO => new Character(characterDTO.id, characterDTO.name))
}

export const CharacterRepository = {
  all
}
