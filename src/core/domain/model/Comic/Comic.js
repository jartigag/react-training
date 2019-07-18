export class Comic {
  constructor(id, title, characters) {
    this.id = id
    this.title = title
    this.characters = characters
  }

  getId() {
    return this.id
  }

  getTitle() {
    return this.title
  }

  getCharacters() {
    return this.characters
  }

  equals(other) {
    return other instanceof Comic && other.id === this.id
  }
}
