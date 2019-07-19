import { Comic } from 'core/domain/model/Comic/Comic'

export const aComic = ({ id = 1, title = 'test', characters = [] }) => {
  return new Comic(id, title, characters)
}

export const aComicCollection = (items = 2) => {
  const comcis = []
  for (let i = 0; i < items; i++) {
    comcis.push(aComic({ id: i, title: `Title-${i}` }))
  }

  return comcis
}
