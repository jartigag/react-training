import { GetAllCharacters } from '../GetAllCharacters'
import { aCharacterCollection } from 'core/domain/model/__builders__/CharacterBuilder'

describe('Get all characters', () => {
  it('gets all characters from a character repository', async () => {
    const characterRepository = {
      all: jest.fn()
    }
    const expectedCharacters = aCharacterCollection()
    characterRepository.all.mockResolvedValue(expectedCharacters)
    const GetAllCharactersService = GetAllCharacters({ characterRepository })

    const characters = await GetAllCharactersService()

    expect(characterRepository.all).toHaveBeenCalled()
    expect(characters).toEqual(expectedCharacters)
  })
})
