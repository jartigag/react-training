import { ApiComicRepository } from 'core/infrastructure/domain/model/Comic/ApiComicRepository'

export const ComicRepository = {
  findBy: () => Promise.reject('[ComicRepository#findBy] must be implemented')
}

export const comicRepository = Object.assign({}, ComicRepository, ApiComicRepository)
