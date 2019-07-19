import { ApiComicRepository } from '../ApiComicRepository'
import { api } from 'core/infrastructure/api'
import { aCharacter } from 'core/domain/model/__builders__/CharacterBuilder'
import { aComicCollection } from 'core/domain/model/__builders__/ComicBuilder'
import comicsFixture from './__fixtures__/comics'

describe('Api comic repository', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('finds comic by character id', async () => {
    jest.spyOn(api, 'comics').mockResolvedValue(comicsFixture)

    const comics = await ApiComicRepository.findBy(aCharacter({}).getId())

    expect(comics).toEqual(aComicCollection())
  })
})
