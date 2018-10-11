import { createMemoryHistory } from 'history'
import { matchPath } from 'react-router'
import HistoryUtils from './../HistoryUtils'

describe('HistoryUtils', () => {
  describe('listen', () => {
    it('should call callback', () => {
      const history = createMemoryHistory()
      const spy = jest.fn()
      HistoryUtils.listen(history, spy)
      history.push('/hello')
      expect(spy.mock.calls).toMatchObject([
        [
          {
            action: 'POP',
            index: 0,
            length: 1,
            location: { pathname: '/' },
            entries: [{ pathname: '/' }],
            createHref: expect.any(Function),
            push: expect.any(Function),
            replace: expect.any(Function),
            go: expect.any(Function),
            goBack: expect.any(Function),
            goForward: expect.any(Function),
            canGo: expect.any(Function),
            block: expect.any(Function),
            listen: expect.any(Function),
          },
          {
            action: 'PUSH',
            index: 1,
            length: 2,
            location: { pathname: '/hello' },
            entries: [{ pathname: '/' }, { pathname: '/hello' }],
            createHref: expect.any(Function),
            push: expect.any(Function),
            replace: expect.any(Function),
            go: expect.any(Function),
            goBack: expect.any(Function),
            goForward: expect.any(Function),
            canGo: expect.any(Function),
            block: expect.any(Function),
            listen: expect.any(Function),
          },
        ],
      ])
    })

    it('should return unlisten function', () => {
      const history = createMemoryHistory()
      const spy = jest.fn()
      const unlisten = HistoryUtils.listen(history, spy)
      unlisten()
      history.push('/hello')
      expect(spy.mock.calls).toHaveLength(0)
    })
  })

  describe('createLocation', () => {
    it('should return location with initial path', () => {
      const history = createMemoryHistory()
      const item = { path: '/:name', initialPath: '/hello' }
      expect(HistoryUtils.createLocation(history, item)).toMatchObject({
        pathname: '/hello',
      })
    })

    it('should return location with path', () => {
      const history = createMemoryHistory()
      const item = { path: '/hello' }
      expect(HistoryUtils.createLocation(history, item)).toMatchObject({
        pathname: '/hello',
      })
    })

    it('should return location with state', () => {
      const history = createMemoryHistory()
      history.push('/sayhello', { from: '/' })
      const item = { path: '/hello' }
      expect(HistoryUtils.createLocation(history, item)).toMatchObject({
        pathname: '/hello',
        state: { from: '/' },
      })
    })
  })

  describe('regenerateFromEntries', () => {
    it('should make a simple replace call (1)', () => {
      const historySpy = jest.fn()
      let history = createMemoryHistory({
        initialIndex: 3,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello'],
      })
      history.listen(historySpy)
      HistoryUtils.regenerateFromEntries(
        history,
        { entries: [{ pathname: '/salut' }], index: 0 },
        3,
      )
      expect(historySpy).toHaveBeenCalledTimes(1)
      expect(history).toMatchObject({
        index: 3,
        entries: [
          { pathname: '/' },
          { pathname: '/yolo' },
          { pathname: '/goodbye' },
          { pathname: '/salut' },
        ],
        location: { pathname: '/salut' },
      })
    })

    it('should recreate history and make a simple replace call (1)', () => {
      const historySpy = jest.fn()
      let history = createMemoryHistory({
        initialIndex: 3,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello', '/hello/one'],
      })
      history.listen(historySpy)
      HistoryUtils.regenerateFromEntries(
        history,
        {
          entries: [{ pathname: '/salut' }],
          index: 0,
        },
        3,
      )
      expect(historySpy).toHaveBeenCalledTimes(1)
      expect(history).toMatchObject({
        index: 3,
        entries: [
          { pathname: '/' },
          { pathname: '/yolo' },
          { pathname: '/goodbye' },
          { pathname: '/salut' },
        ],
        location: { pathname: '/salut' },
      })
    })

    it('should recreate history and make a simple replace call (2)', () => {
      const historySpy = jest.fn()
      let history = createMemoryHistory({
        initialIndex: 3,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello'],
      })
      history.listen(historySpy)
      HistoryUtils.regenerateFromEntries(
        history,
        {
          entries: [{ pathname: '/salut' }, { pathname: '/salut/a' }],
          index: 1,
        },
        3,
      )
      expect(historySpy).toHaveBeenCalledTimes(1)
      expect(history).toMatchObject({
        index: 4,
        entries: [
          { pathname: '/' },
          { pathname: '/yolo' },
          { pathname: '/goodbye' },
          { pathname: '/salut' },
          { pathname: '/salut/a' },
        ],
        location: { pathname: '/salut/a' },
      })
    })

    it('should recreate history and make a simple replace call (3)', () => {
      const historySpy = jest.fn()
      let history = createMemoryHistory({
        initialIndex: 4,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello', '/hello/one'],
      })
      history.listen(historySpy)
      HistoryUtils.regenerateFromEntries(
        history,
        {
          entries: [{ pathname: '/salut' }, { pathname: '/salut/a' }],
          index: 1,
        },
        3,
      )
      expect(historySpy).toHaveBeenCalledTimes(1)
      expect(history).toMatchObject({
        index: 4,
        entries: [
          { pathname: '/' },
          { pathname: '/yolo' },
          { pathname: '/goodbye' },
          { pathname: '/salut' },
          { pathname: '/salut/a' },
        ],
        location: { pathname: '/salut/a' },
      })
    })

    it('should recreate history and make a simple replace call (4)', () => {
      const historySpy = jest.fn()
      let history = createMemoryHistory({
        initialIndex: 4,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello', '/hello/one'],
      })
      history.listen(historySpy)
      HistoryUtils.regenerateFromEntries(
        history,
        {
          entries: [{ pathname: '/salut' }, { pathname: '/salut/a' }],
          index: 0,
        },
        3,
      )
      expect(historySpy).toHaveBeenCalledTimes(1)
      expect(history).toMatchObject({
        index: 3,
        entries: [
          { pathname: '/' },
          { pathname: '/yolo' },
          { pathname: '/goodbye' },
          { pathname: '/salut' },
          { pathname: '/salut/a' },
        ],
        location: { pathname: '/salut' },
      })
    })
  })

  describe('regenerateFromLocation', () => {
    it('should recreate history and make a simple replace call (4)', () => {
      const historySpy = jest.fn()
      let history = createMemoryHistory({
        initialIndex: 4,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello', '/hello/one'],
      })
      history.listen(historySpy)
      HistoryUtils.regenerateFromLocation(history, { pathname: '/salut/a' })
      expect(historySpy).toHaveBeenCalledTimes(1)
      expect(history).toMatchObject({
        index: 4,
        entries: [
          { pathname: '/' },
          { pathname: '/yolo' },
          { pathname: '/goodbye' },
          { pathname: '/hello' },
          { pathname: '/salut/a' },
        ],
        location: { pathname: '/salut/a' },
      })
    })
  })

  describe('saveNodes', () => {
    it('should return nodes from a location source', () => {
      const source = { pathname: '/a' }
      const route = { name: '/a', match: matchPath('/a', { path: '/a' }) }
      const localHistoryState = {
        historyNodes: {
          '/b': {
            index: 0,
            entries: [{ pathname: '/b' }],
          },
        },
      }
      expect(
        HistoryUtils.saveNodes(source, route, localHistoryState),
      ).toMatchObject({
        '/a': {
          index: 0,
          entries: [{ pathname: '/a' }],
        },
        '/b': {
          index: 0,
          entries: [{ pathname: '/b' }],
        },
      })
    })

    it('should return nodes from a history source', () => {
      const source = {
        index: 1,
        entries: [{ pathname: '/a' }, { pathname: '/a' }],
      }
      const route = { name: '/a', match: matchPath('/a', { path: '/a' }) }
      const localHistoryState = {
        historyRootIndex: 1,
        historyNodes: {
          '/b': {
            index: 0,
            entries: [{ pathname: '/b' }],
          },
        },
      }
      expect(
        HistoryUtils.saveNodes(source, route, localHistoryState),
      ).toMatchObject({
        '/a': {
          index: 0,
          entries: [{ pathname: '/a' }],
        },
        '/b': {
          index: 0,
          entries: [{ pathname: '/b' }],
        },
      })
    })

    it('should return nodes from a deep history source', () => {
      const source = {
        index: 2,
        entries: [{ pathname: '/d' }, { pathname: '/c' }, { pathname: '/a' }],
      }
      const route = { name: '/a', match: matchPath('/a', { path: '/a' }) }
      const localHistoryState = {
        historyRootIndex: 1,
        historyNodes: { '/b': { index: 0, entries: [{ pathname: '/b' }] } },
      }
      expect(
        HistoryUtils.saveNodes(source, route, localHistoryState),
      ).toMatchObject({
        '/a': {
          index: 0,
          entries: [{ pathname: '/a' }],
        },
        '/b': {
          index: 0,
          entries: [{ pathname: '/b' }],
        },
      })
    })

    it('should return nodes from a very deep history source', () => {
      const source = {
        index: 3,
        entries: [
          { pathname: '/d' },
          { pathname: '/c' },
          { pathname: '/a' },
          { pathname: '/a/a' },
        ],
      }
      const route = { name: '/a', match: matchPath('/a', { path: '/a' }) }
      const localHistoryState = {
        historyRootIndex: 1,
        historyNodes: { '/b': { index: 0, entries: [{ pathname: '/b' }] } },
      }
      expect(
        HistoryUtils.saveNodes(source, route, localHistoryState),
      ).toMatchObject({
        '/a': {
          index: 1,
          entries: [{ pathname: '/a' }, { pathname: '/a/a' }],
        },
        '/b': {
          index: 0,
          entries: [{ pathname: '/b' }],
        },
      })
    })
  })

  describe('regenerateFromEntries', () => {
    it('should regenerateFromEntries history in deep', () => {
      let history = createMemoryHistory({
        initialIndex: 0,
        initialEntries: ['/a'],
      })
      const spy = jest.fn()
      history.listen(spy)
      const historyNode = {
        index: 0,
        entries: [{ pathname: '/b' }],
      }
      const historyRootIndex = 0
      HistoryUtils.regenerateFromEntries(history, historyNode, historyRootIndex)
      expect(history).toMatchObject({
        index: 0,
        length: 1,
        entries: [{ pathname: '/b' }],
      })
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should regenerateFromEntries history in deep', () => {
      let history = createMemoryHistory({
        initialIndex: 3,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello', '/hello/one'],
      })
      const spy = jest.fn()
      history.listen(spy)
      const historyNode = {
        index: 1,
        entries: [{ pathname: '/a' }, { pathname: '/b' }],
      }
      const historyRootIndex = 1
      HistoryUtils.regenerateFromEntries(history, historyNode, historyRootIndex)
      expect(history).toMatchObject({
        index: 2,
        length: 3,
        entries: [{ pathname: '/' }, { pathname: '/a' }, { pathname: '/b' }],
      })
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
