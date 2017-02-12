import createHistory from 'history/createMemoryHistory'
import shouldStackUpdate from './../shouldStackUpdate'

describe('shouldStackUpdate() util', () => {
  it('shouldStackUpdate() returns true when paths are different', () => {
    const currentRoute = { key: '/foo', path: '/foo' }
    const nextRoute = { key: '/bar', path: '/bar' }
    const routerHistory = createHistory({
      initialIndex: 1,
      initialEntries: ['/foo', '/bar'],
    })
    const previousLocation = { pathname: '/foo' }
    const input = shouldStackUpdate(currentRoute, nextRoute, routerHistory, previousLocation)
    expect(input).toBeTruthy()
  })
  it('shouldStackUpdate() returns false when paths are equal', () => {
    const currentRoute = { key: '/foo', path: '/foo' }
    const nextRoute = { key: '/foo', path: '/foo' }
    const routerHistory = createHistory({
      initialIndex: 0,
      initialEntries: ['/foo'],
    })
    const previousLocation = { pathname: '/foo' }
    const input = shouldStackUpdate(currentRoute, nextRoute, routerHistory, previousLocation)
    expect(input).toBeFalsy()
  })
  it('shouldStackUpdate() returns true when paths (with params) are equal and pathnames are different (1)', () => {
    const currentRoute = { key: '/article/:id', path: '/article/:id' }
    const nextRoute = { key: '/article/:id', path: '/article/:id' }
    const routerHistory = {
      ...createHistory({
        initialIndex: 0,
        initialEntries: ['/article/1', '/article/2'],
      }),
    }
    const previousLocation = { pathname: '/article1' }
    const input = shouldStackUpdate(currentRoute, nextRoute, routerHistory, previousLocation)
    expect(input).toBeTruthy()
  })
  it('shouldStackUpdate() returns true when paths (with params) are equal and pathnames are different (2)', () => {
    const currentRoute = { key: '/article/:id', path: '/article/:id' }
    const nextRoute = { key: '/article/:id', path: '/article/:id' }
    const routerHistory = {
      ...createHistory({
        initialIndex: 1,
        initialEntries: ['/article/1', '/article/2'],
      }),
    }
    const previousLocation = { pathname: '/article1' }
    const input = shouldStackUpdate(currentRoute, nextRoute, routerHistory, previousLocation)
    expect(input).toBeTruthy()
  })
  it('shouldStackUpdate() returns false when paths (without params) are equal and pathname are different', () => {
    const currentRoute = { key: '/app', path: '/app' }
    const nextRoute = { key: '/app', path: '/app' }
    const routerHistory = {
      ...createHistory({
        initialIndex: 1,
        initialEntries: ['/app', '/app/article'],
      }),
    }
    const previousLocation = { pathname: '/app' }
    const input = shouldStackUpdate(currentRoute, nextRoute, routerHistory, previousLocation)
    expect(input).toBeFalsy()
  })
})
