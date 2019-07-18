import { GetAllCharacters } from './GetAllCharacters'
import { characterRepository } from 'core/domain/model/Character/CharacterRepository'

export const CharacterService = {
  all: GetAllCharacters({ characterRepository })
}
