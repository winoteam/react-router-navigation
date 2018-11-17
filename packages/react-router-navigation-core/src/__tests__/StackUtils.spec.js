import React from 'react'
import { createMemoryHistory } from 'history'
import StackUtils from './../StackUtils'

describe('StackUtils', () => {
  describe('create', () => {
    it('should return stack of items', () => {
      function Item() {
        return null
      }
      function rootRender() {
        return null
      }
      function rootChildren() {
        return null
      }
      function renderComponentA() {
        return null
      }
      function renderComponentB() {
        return null
      }
      expect(
        StackUtils.create(
          [
            <Item path="/a" title="A" render={renderComponentA} />,
            <Item path="/b" title="B" component={renderComponentB} />,
          ],
          {
            history: createMemoryHistory(),
            render: rootRender,
            children: rootChildren,
            title: 'C',
            color: 'red',
          },
        ),
      ).toEqual([
        {
          path: '/a',
          title: 'A',
          render: renderComponentA,
          color: 'red',
        },
        {
          path: '/b',
          title: 'B',
          component: renderComponentB,
          color: 'red',
        },
      ])
    })
  })

  describe('shallowEqual', () => {
    it('should return true if stack are equal', () => {
      expect(
        StackUtils.shallowEqual(
          [
            {
              path: '/a',
              title: 'A',
            },
            {
              path: '/b',
              title: 'B',
            },
          ],
          [
            {
              path: '/a',
              title: 'A',
            },
            {
              path: '/b',
              title: 'B',
            },
          ],
        ),
      ).toBe(true)
    })

    it('should return false if stack are not equal', () => {
      expect(
        StackUtils.shallowEqual(
          [
            {
              path: '/a',
              title: 'A',
            },
            {
              path: '/b',
              title: 'B',
            },
          ],
          [
            {
              path: '/a',
              title: 'A',
            },
            {
              path: '/b',
              title: 'B+',
            },
          ],
        ),
      ).toBe(false)
      expect(
        StackUtils.shallowEqual(
          [
            {
              path: '/a',
              title: 'A',
            },
            {
              path: '/b',
              title: 'B',
            },
          ],
          [
            {
              path: '/a',
              title: 'A',
            },
            {
              path: '/b',
              title: 'B',
            },
            {
              path: '/c',
              title: 'C',
            },
          ],
        ),
      ).toBe(false)
    })
  })

  describe('getHistoryEntries', () => {
    it('should return history entries', () => {
      const stack = [{ path: '/a' }, { path: '/b' }]
      const location = { pathname: '/a' }
      const entries = [
        { pathname: '/c' },
        { pathname: '/a' },
        { pathname: '/d' },
        { pathname: '/a' },
        { pathname: '/b' },
        { pathname: '/a' },
      ]
      expect(
        StackUtils.getHistoryEntries(stack, entries, location),
      ).toMatchObject([
        { pathname: '/a' },
        { pathname: '/b' },
        { pathname: '/a' },
      ])
    })

    it('should return history entries with history index (1)', () => {
      const stack = [{ path: '/a' }, { path: '/b' }]
      const location = { pathname: '/a' }
      const entries = [
        { pathname: '/c' },
        { pathname: '/a' },
        { pathname: '/d' },
        { pathname: '/a' },
        { pathname: '/b' },
        { pathname: '/a' },
        { pathname: '/c' },
      ]
      const index = 5
      expect(
        StackUtils.getHistoryEntries(stack, entries, location, index),
      ).toMatchObject([
        { pathname: '/a' },
        { pathname: '/b' },
        { pathname: '/a' },
      ])
    })

    it('should return history entries with history index (2)', () => {
      const stack = [{ path: '/a' }, { path: '/b' }]
      const location = { pathname: '/a' }
      const entries = [
        { pathname: '/c' },
        { pathname: '/a' },
        { pathname: '/d' },
        { pathname: '/a' },
        { pathname: '/b' },
        { pathname: '/a' },
        { pathname: '/c' },
      ]
      const index = 6
      expect(
        StackUtils.getHistoryEntries(stack, entries, location, index),
      ).toMatchObject([])
    })
  })
})
