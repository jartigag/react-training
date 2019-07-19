import { GetAllCharacters } from '../GetAllCharacters'
import { Character } from 'core/domain/model/Character/Character'

describe('Get all characters', () => {
  it('gets all characters from a character repository', async () => {
    const characterRepository = {
      all: jest.fn()
    }
    const expectedCharacters = [new Character(1, 'test')]
    characterRepository.all.mockResolvedValue(expectedCharacters)
    const GetAllCharactersService = GetAllCharacters({ characterRepository })

    const characters = await GetAllCharactersService()

    expect(characterRepository.all).toHaveBeenCalled()
    expect(characters).toEqual(expectedCharacters)
  })
})
