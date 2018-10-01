import { createMemoryHistory } from 'history'
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

  describe('regenerate', () => {
    it('should make a simple replace call (1)', () => {
      const historySpy = jest.fn()
      let history = createMemoryHistory({
        initialIndex: 3,
        initialEntries: ['/', '/yolo', '/goodbye', '/hello'],
      })
      history.listen(historySpy)
      HistoryUtils.regenerate(
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
      HistoryUtils.regenerate(
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
      HistoryUtils.regenerate(
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
      HistoryUtils.regenerate(
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
      HistoryUtils.regenerate(
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
})
