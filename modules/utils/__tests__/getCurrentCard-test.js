import getCurrentCard from './../getCurrentCard'

describe('getCurrentCard() util', () => {
  it('getCurrentCard() works correctly', () => {
    const route = { key: '/index@@h9208990' }
    const currentCard = {
      key: '/index',
      title: 'Index',
    }
    const cards = [{
      key: '/',
      title: 'Root',
    }, currentCard]
    expect(getCurrentCard(cards, route)).toEqual(currentCard)
  })
})
