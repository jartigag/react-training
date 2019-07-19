import { GetCommonComics } from '../GetCommonComics'
import { aComic, aComicCollection } from 'core/domain/model/__builders__/ComicBuilder'

describe('Get common comics', () => {
  const comicRepository = {
    findBy: jest.fn()
  }
  const GetCommonComicsService = GetCommonComics({ comicRepository })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('gets no comics if there are missing character ids', async () => {
    const comics = await GetCommonComicsService()

    expect(comics).toEqual([])
  })

  it('gets no comics if any character has no comic', async () => {
    comicRepository.findBy.mockImplementation(characterId => {
      if (characterId === 1) {
        return aComicCollection()
      }

      if (characterId === 2) {
        return []
      }
    })

    const comics = await GetCommonComicsService(1, 2)

    expect(comics).toEqual([])
  })

  it('gets common comics for 2 characters', async () => {
    comicRepository.findBy.mockImplementation(characterId => {
      if (characterId === 1) {
        return [aComic({ characters: ['test-character-1', 'test-character-2'] })]
      }

      if (characterId === 2) {
        return [aComic({ characters: ['test-character-2', 'test-character-3'] })]
      }
    })

    const comics = await GetCommonComicsService(1, 2)

    expect(comics).toEqual([aComic({ characters: ['test-character-1', 'test-character-2'] })])
  })
})
