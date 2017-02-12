import createHistory from 'history/createMemoryHistory'
import getCurrentRoute from './../getCurrentRoute'

describe('getCurrentRoute() util', () => {
  it('getCurrentRoute() works correctly', () => {
    const stack = [{
      key: '/foo',
      path: '/foo',
    }, {
      key: '/bar',
      path: '/bar',
    }]
    const history = createHistory({ initialEntries: ['/bar'] })
    const currentRoute = { key: '/bar', path: '/bar', strict: undefined, exact: undefined }
    expect(getCurrentRoute(stack, history.location)).toEqual(currentRoute)
  })
})
