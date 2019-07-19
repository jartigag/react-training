import { ApiCharacterRepository } from '../ApiCharacterRepository'
import { api } from 'core/infrastructure/api'
import charactersFixture from './__fixtures__/characters'
import { aCharacterCollection } from 'core/domain/model/__builders__/CharacterBuilder'

describe('Api character repository', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('finds all characters', async () => {
    jest.spyOn(api, 'characters').mockResolvedValue(charactersFixture)

    const characters = await ApiCharacterRepository.all()

    expect(characters).toEqual(aCharacterCollection())
  })
})
