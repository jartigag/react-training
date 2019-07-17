export class Comic {
  constructor(id, title, characters) {
    this.id = id
    this.title = title
    this.characters = characters
  }

  id() {
    return this.id
  }

  title() {
    return this.title
  }

  characters() {
    return this.characters
  }

  equals(other) {
    return other instanceof Comic && other.id === this.id
  }
}
