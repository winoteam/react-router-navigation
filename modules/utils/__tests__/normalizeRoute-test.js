import createHistory from 'history/createMemoryHistory'
import normalizeRoute from './../normalizeRoute'

describe('normalizeRoute() util', () => {
  it('normalizeRoute() works correctly', () => {
    const input = normalizeRoute({ key: `/foo@@${Date.now()}`})
    const output = { key: '/foo' }
    expect(input).toEqual(output)
  })
})
