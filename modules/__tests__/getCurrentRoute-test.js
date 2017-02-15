import createHistory from 'history/createMemoryHistory'
import getCurrentRoute from './../getCurrentRoute'

describe('getCurrentRoute() util', () => {
  it('getCurrentRoute() works correctly', () => {
    const stack = [{ key: '/foo', path: '/foo' }, { key: '/bar', path: '/bar' }]
    const history = createHistory({ initialEntries: ['/bar'] })
    const currentRoute = { key: '/bar' }
    expect(getCurrentRoute(stack, history.location)).toEqual(currentRoute)
  })
})
