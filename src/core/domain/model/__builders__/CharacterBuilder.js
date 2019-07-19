import { Character } from 'core/domain/model/Character/Character'

export const aCharacter = ({ id = 1, name = 'test' }) => {
  return new Character(id, name)
}

export const aCharacterCollection = (items = 2) => {
  const characters = []
  for (let i = 0; i < items; i++) {
    characters.push(aCharacter({ id: i, name: `Name-${i}` }))
  }

  return characters
}
