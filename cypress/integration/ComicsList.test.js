import { ComicsListPage } from './pages/ComicsList'
import { context } from './context'

describe('ComicsList', () => {
  const comicsListPage = new ComicsListPage()

  it('selects two characters and show its comics', () => {
    context.loginUser()

    comicsListPage
      .visit()
      .selectFirstCharacter('Captain America')
      .selectSecondCharacter('Hulk')

    expect(comicsListPage.isShowingComicList()).to.be.true
  })
})
