/* @noflow */

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

  describe('persistNodes', () => {
    it('should return false', () => {
      expect(HistoryUtils.persistNodes()).toBe(false)
    })
  })

  describe('saveNodes', () => {
    it('should return array of nodes', () => {
      expect(Array.isArray(HistoryUtils.saveNodes([]))).toBe(true)
    })
  })
})
