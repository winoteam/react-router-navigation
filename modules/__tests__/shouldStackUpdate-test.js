import createHistory from 'history/createMemoryHistory'
import shouldStackUpdate from './../shouldStackUpdate'

describe('shouldStackUpdate() util', () => {
  it('shouldStackUpdate() returns true when paths are different', () => {
    const currentCard = { path: '/foo' }
    const nextCard = { path: '/bar' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/foo'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/foo', '/bar'],
    })
    const input = shouldStackUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeTruthy()
  })
  it('shouldStackUpdate() returns false when paths are equal', () => {
    const currentCard = { path: '/foo' }
    const nextCard = { path: '/foo' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/foo'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 0,
      initialEntries: ['/foo'],
    })
    const input = shouldStackUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeFalsy()
  })
  it('shouldStackUpdate() returns true when paths (with params) are equal and pathnames are different (1)', () => {
    const currentCard = { path: '/article/:id' }
    const nextCard = { path: '/article/:id' }
    const currentRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/article/1', '/article/2'],
    })
    const nextRouterHistory = createHistory({
      initialEntries: ['/article/1', '/article/2'],
    })
    const input = shouldStackUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeTruthy()
  })
  it('shouldStackUpdate() returns true when paths (with params) are equal and pathnames are different (2)', () => {
    const currentCard = { path: '/article/:id' }
    const nextCard = { path: '/article/:id' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/article1'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/article/1', '/article/2'],
    })
    const input = shouldStackUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeTruthy()
  })
  it('shouldStackUpdate() returns false when paths (without params) are equal and pathname are different', () => {
    const currentCard = { path: '/app' }
    const nextCard = { path: '/app' }
    const currentRouterHistory = createHistory({
      initialEntries: ['/app'],
    })
    const nextRouterHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/app', '/app/article'],
    })
    const input = shouldStackUpdate(currentCard, nextCard, currentRouterHistory, nextRouterHistory)
    expect(input).toBeFalsy()
  })
})
