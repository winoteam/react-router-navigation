import { matchPath } from 'react-router'
import StateUtils from './../StateUtils'

describe('StateUtils', () => {
  describe('initialize', () => {
    it('should return initial state from nodes', () => {
      const nodes = [{ path: '/a' }, { path: '/b' }, { path: '/c' }]
      const location = { pathname: '/a' }
      const history = [{ pathname: '/b' }, location]
      const buildFrom = 'nodes'
      expect(
        StateUtils.initialize(nodes, location, history, buildFrom),
      ).toMatchObject({
        index: 0,
        routes: [
          {
            match: { isExact: true, params: {}, path: '/a', url: '/a' },
            name: '/a',
          },
          {
            match: { isExact: true, params: {}, path: '/b', url: '/b' },
            name: '/b',
          },
          { match: null, name: '/c' },
        ],
      })
    })

    it('should return initial state from history', () => {
      const nodes = [{ path: '/a' }, { path: '/b' }, { path: '/c' }]
      const location = { pathname: '/a' }
      const history = [{ pathname: '/b' }, location]
      const buildFrom = 'history'
      expect(
        StateUtils.initialize(nodes, location, history, buildFrom),
      ).toMatchObject({
        index: 1,
        routes: [
          {
            match: { isExact: true, params: {}, path: '/b', url: '/b' },
            name: '/b',
          },
          {
            match: { isExact: true, params: {}, path: '/a', url: '/a' },
            name: '/a',
          },
        ],
      })
    })

    it('should return initial state from deep history', () => {
      const nodes = [{ path: '/a' }, { path: '/b' }, { path: '/c' }]
      const location = { pathname: '/a' }
      const entries = [
        { pathname: '/b' },
        { pathname: '/d' },
        { pathname: '/c' },
        location,
      ]
      const buildFrom = 'history'
      expect(
        StateUtils.initialize(nodes, location, entries, buildFrom),
      ).toMatchObject({
        index: 1,
        routes: [
          {
            match: { isExact: true, params: {}, path: '/c', url: '/c' },
            name: '/c',
          },
          {
            match: { isExact: true, params: {}, path: '/a', url: '/a' },
            name: '/a',
          },
        ],
      })
    })
  })

  describe('getRouteIndex', () => {
    it('should return index with correct index arg', () => {
      const state = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(StateUtils.getRouteIndex(state, 0)).toBe(0)
    })

    it('should return index with impossible index arg', () => {
      const state = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(StateUtils.getRouteIndex(state, 3)).toBe(-1)
    })

    it('should return index with route arg', () => {
      const state = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(StateUtils.getRouteIndex(state, { name: '/a' })).toBe(0)
    })
  })

  describe('isCorrumped', () => {
    it('should return true', () => {
      const state = {
        routes: [
          { match: matchPath('/a', { path: '/a' }) },
          { match: matchPath('/b', { path: '/b' }) },
          { match: matchPath('/c', { path: '/c' }) },
        ],
        index: 1,
      }
      const history = {
        index: 1,
        entries: [{ pathname: '/c' }, { pathname: '/b' }],
      }
      expect(StateUtils.isCorrumped(state, history, 0)).toBe(true)
    })

    it('should return false in web browser env', () => {
      const state = {
        routes: [
          { match: matchPath('/a', { path: '/a' }) },
          { match: matchPath('/b', { path: '/b' }) },
        ],
        index: 1,
      }
      const history = {
        index: 1,
      }
      expect(StateUtils.isCorrumped(state, history, 0)).toBe(false)
    })

    it('should return false with valid state', () => {
      const state = {
        routes: [
          { match: matchPath('/a', { path: '/a' }) },
          { match: matchPath('/b', { path: '/b' }) },
        ],
        index: 1,
      }
      const history = {
        index: 1,
        entries: [{ pathname: '/a' }, { pathname: '/b' }],
      }
      expect(StateUtils.isCorrumped(state, history, 0)).toBe(false)
    })
  })

  describe('push', () => {
    it('should return new state', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 2,
      }
      expect(StateUtils.push(oldState, { name: '/d' })).toMatchObject({
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c' },
          { name: '/d' },
        ],
        index: 3,
      })
    })
  })

  describe('pop', () => {
    it('should return new state', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 2,
      }
      expect(StateUtils.pop(oldState, 1)).toMatchObject({
        routes: [{ name: '/a' }, { name: '/b' }],
        index: 1,
      })
    })

    it('should return new state without n arg', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 2,
      }
      expect(StateUtils.pop(oldState)).toMatchObject({
        routes: [{ name: '/a' }, { name: '/b' }],
        index: 1,
      })
    })

    it('should return new state with initial huge number of routes', () => {
      const oldState = {
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c' },
          { name: '/d' },
        ],
        index: 2,
      }
      expect(StateUtils.pop(oldState, 1)).toMatchObject({
        routes: [{ name: '/a' }, { name: '/b' }],
        index: 1,
      })
    })

    it('should return new state with index arg that is not big', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 2,
      }
      expect(StateUtils.pop(oldState, 4)).toMatchObject({
        routes: [{ name: '/a' }],
        index: 0,
      })
    })

    it('should return new state with index arg that is negative', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, -1)).toMatchObject({
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      })
    })
  })

  describe('replace', () => {
    it('should return new state', () => {
      const oldState = {
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c', title: 'Title' },
        ],
        index: 1,
      }
      expect(
        StateUtils.replace(oldState, 2, {
          name: '/c',
          title: 'New title',
        }),
      ).toMatchObject({
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c', title: 'New title' },
        ],
        index: 2,
      })
    })

    it('should return new state with index arg that is greater than the length of the routes', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 2,
      }
      expect(StateUtils.replace(oldState, 3, { name: '/d' })).toMatchObject({
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 2,
      })
    })

    it('should return new state with index arg that is negative', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(
        StateUtils.changeIndex(oldState, -1, { name: '/z' }),
      ).toMatchObject({
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      })
    })
  })

  describe('changeIndex', () => {
    it('should return new state with index arg', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, 2)).toMatchObject({
        index: 2,
      })
    })

    it('should return new state with index arg that is greater than the length of the routes', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, 3)).toMatchObject({
        index: 1,
      })
    })

    it('should return new state with index arg that is negative', () => {
      const oldState = {
        routes: [{ name: '/a' }, { name: '/b' }, { name: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, -1)).toMatchObject({
        index: 1,
      })
    })

    it('should return new state with route arg', () => {
      const oldState = {
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c', title: 'Title' },
        ],
        index: 1,
      }
      expect(
        StateUtils.changeIndex(oldState, {
          name: '/c',
          title: 'New title',
        }),
      ).toMatchObject({
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c', title: 'New title' },
        ],
        index: 2,
      })
    })

    it('should return new state with route arg that is not exist in routes', () => {
      const oldState = {
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c', title: 'Title' },
        ],
        index: 1,
      }
      expect(
        StateUtils.changeIndex(oldState, {
          name: '/d',
        }),
      ).toMatchObject({
        routes: [
          { name: '/a' },
          { name: '/b' },
          { name: '/c', title: 'Title' },
        ],
        index: 1,
      })
    })
  })
})
