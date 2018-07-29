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
            key: '/a',
            routeMatch: { isExact: true, params: {}, path: '/a', url: '/a' },
            routeName: '/a',
          },
          {
            key: '/b',
            routeMatch: { isExact: true, params: {}, path: '/b', url: '/b' },
            routeName: '/b',
          },
          { key: '/c', routeMatch: null, routeName: '/c' },
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
            key: '/b',
            routeMatch: { isExact: true, params: {}, path: '/b', url: '/b' },
            routeName: '/b',
          },
          {
            key: '/a',
            routeMatch: { isExact: true, params: {}, path: '/a', url: '/a' },
            routeName: '/a',
          },
        ],
      })
    })
  })

  describe('getRouteIndex', () => {
    it('should return index with correct index arg', () => {
      const state = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(StateUtils.getRouteIndex(state, 0)).toBe(0)
    })

    it('should return index with impossible index arg', () => {
      const state = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(StateUtils.getRouteIndex(state, 3)).toBe(-1)
    })

    it('should return index with route arg', () => {
      const state = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(StateUtils.getRouteIndex(state, { routeName: '/a' })).toBe(0)
    })
  })

  describe('push', () => {
    it('should return new state', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 2,
      }
      expect(StateUtils.push(oldState, { routeName: '/d' })).toMatchObject({
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c' },
          { routeName: '/d' },
        ],
        index: 3,
      })
    })
  })

  describe('pop', () => {
    it('should return new state', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 2,
      }
      expect(StateUtils.pop(oldState, 1)).toMatchObject({
        routes: [{ routeName: '/a' }, { routeName: '/b' }],
        index: 1,
      })
    })

    it('should return new state without n arg', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 2,
      }
      expect(StateUtils.pop(oldState)).toMatchObject({
        routes: [{ routeName: '/a' }, { routeName: '/b' }],
        index: 1,
      })
    })

    it('should return new state with initial huge number of routes', () => {
      const oldState = {
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c' },
          { routeName: '/d' },
        ],
        index: 2,
      }
      expect(StateUtils.pop(oldState, 1)).toMatchObject({
        routes: [{ routeName: '/a' }, { routeName: '/b' }],
        index: 1,
      })
    })

    it('should return new state with index arg that is not big', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 2,
      }
      expect(StateUtils.pop(oldState, 4)).toMatchObject({
        routes: [{ routeName: '/a' }],
        index: 0,
      })
    })

    it('should return new state with index arg that is negative', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, -1)).toMatchObject({
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      })
    })
  })

  describe('replace', () => {
    it('should return new state', () => {
      const oldState = {
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c', title: 'Title' },
        ],
        index: 1,
      }
      expect(
        StateUtils.replace(oldState, 2, {
          routeName: '/c',
          title: 'New title',
        }),
      ).toMatchObject({
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c', title: 'New title' },
        ],
        index: 2,
      })
    })

    it('should return new state with index arg that is greater than the length of the routes', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 2,
      }
      expect(
        StateUtils.replace(oldState, 3, { routeName: '/d' }),
      ).toMatchObject({
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 2,
      })
    })

    it('should return new state with index arg that is negative', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(
        StateUtils.changeIndex(oldState, -1, { routeName: '/z' }),
      ).toMatchObject({
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      })
    })
  })

  describe('changeIndex', () => {
    it('should return new state with index arg', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, 2)).toMatchObject({
        index: 2,
      })
    })

    it('should return new state with index arg that is greater than the length of the routes', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, 3)).toMatchObject({
        index: 1,
      })
    })

    it('should return new state with index arg that is negative', () => {
      const oldState = {
        routes: [{ routeName: '/a' }, { routeName: '/b' }, { routeName: '/c' }],
        index: 1,
      }
      expect(StateUtils.changeIndex(oldState, -1)).toMatchObject({
        index: 1,
      })
    })

    it('should return new state with route arg', () => {
      const oldState = {
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c', title: 'Title' },
        ],
        index: 1,
      }
      expect(
        StateUtils.changeIndex(oldState, {
          routeName: '/c',
          title: 'New title',
        }),
      ).toMatchObject({
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c', title: 'New title' },
        ],
        index: 2,
      })
    })

    it('should return new state with route arg that is not exist in routes', () => {
      const oldState = {
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c', title: 'Title' },
        ],
        index: 1,
      }
      expect(
        StateUtils.changeIndex(oldState, {
          routeName: '/d',
        }),
      ).toMatchObject({
        routes: [
          { routeName: '/a' },
          { routeName: '/b' },
          { routeName: '/c', title: 'Title' },
        ],
        index: 1,
      })
    })
  })
})
