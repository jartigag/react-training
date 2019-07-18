import { ApiCharacterRepository } from 'core/infrastructure/domain/model/Character/ApiCharacterRepository'

export const CharacterRepository = {
  all: () => Promise.reject('[CharacterRepository#all] must be implemented')
}

export const characterRepository = Object.assign({}, CharacterRepository, ApiCharacterRepository)
