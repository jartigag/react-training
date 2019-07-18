import { GetCommonComics } from './GetCommonComics'
import { comicRepository } from 'core/domain/model/Comic/ComicRepository'

export const ComicService = {
  common: GetCommonComics({ comicRepository })
}
