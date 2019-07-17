import { CharacterRepository } from '../../domain/model/Character/CharacterRepository'

export const GetAllCharacters = async () => CharacterRepository.all()
