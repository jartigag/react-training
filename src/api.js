export const api = {
  characters: async () => {
    const response = await fetch('/characters.json')
    return response.json()
  },

  comics: async characterId => {
    const response = await fetch(`/comics-${characterId}.json`)
    return response.json()
  },

  allComics: async () => {
    const response = await fetch('/comics.json')
    return response.json()
  }
}
