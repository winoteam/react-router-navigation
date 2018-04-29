/* @noflow */

import { createLocation } from 'history'
import RouteUtils from './../RouteUtils'

describe('RouteUtils', () => {
  describe('create', () => {
    it('should return Route object', () => {
      const location = createLocation('/contact')
      expect(RouteUtils.create({ path: '/contact' }, location)).toMatchObject({
        key: '/contact',
        routeMatch: {
          url: '/contact',
          path: '/contact',
          params: {},
        },
        routeName: '/contact',
      })
    })

    it('should return Route object with URL parameters', () => {
      const location = createLocation('/article/1')
      expect(
        RouteUtils.create({ path: '/article/:id' }, location),
      ).toMatchObject({
        key: '/article/1',
        routeMatch: {
          url: '/article/1',
          path: '/article/:id',
          params: { id: '1' },
        },
        routeName: '/article/:id',
      })
    })

    it('should return Route object without location argument', () => {
      expect(RouteUtils.create({ path: '/contact' })).toMatchObject({
        key: '/contact',
        routeMatch: null,
        routeName: '/contact',
      })
    })

    it('should return Route object with URL parameters without location argument', () => {
      expect(RouteUtils.create({ path: '/article/:id' })).toMatchObject({
        key: '/article/:id',
        routeMatch: null,
        routeName: '/article/:id',
      })
    })

    it('should return Route object with routePath defined', () => {
      const location = createLocation('/article/1/update')
      expect(
        RouteUtils.create(
          {
            path: '/article/:id/:method(create|update)?',
            routePath: '/article/:id',
          },
          location,
        ),
      ).toMatchObject({
        key: '/article/1',
        routeMatch: {
          url: '/article/1/update',
          path: '/article/:id/:method(create|update)?',
          params: { id: '1', method: 'update' },
        },
        routeName: '/article/:id/:method(create|update)?',
      })
    })

    it('should return null with no path defined', () => {
      expect(RouteUtils.create({})).toBe(null)
    })
  })

  describe('equal', () => {
    it('should return false if routes provided are null', () => {
      const routeA = RouteUtils.create()
      const routeB = RouteUtils.create()
      expect(RouteUtils.equal(routeA, routeB)).toBe(false)
    })

    it('should return true if routes provided contain same paths', () => {
      const locationA = createLocation('/contact/email')
      const locationB = createLocation('/contact/twitter')
      const routeA = RouteUtils.create({ path: '/contact' }, locationA)
      const routeB = RouteUtils.create({ path: '/contact' }, locationB)
      expect(RouteUtils.equal(routeA, routeB)).toBe(true)
    })

    it('should return fase if routes provided contain different paths', () => {
      const locationA = createLocation('/contact/email')
      const locationB = createLocation('/profiler')
      const routeA = RouteUtils.create({ path: '/contact' }, locationA)
      const routeB = RouteUtils.create({ path: '/profile' }, locationB)
      expect(RouteUtils.equal(routeA, routeB)).toBe(false)
    })

    it('should return true if routes provided contain same URL parameters', () => {
      const locationA = createLocation('/article/1')
      const locationB = createLocation('/article/1')
      const routeA = RouteUtils.create({ path: '/article/:id' }, locationA)
      const routeB = RouteUtils.create({ path: '/article/:id' }, locationB)
      expect(RouteUtils.equal(routeA, routeB)).toBe(true)
    })

    it('should return false if routes provided contain different URL parameters', () => {
      const locationA = createLocation('/article/1')
      const locationB = createLocation('/article/2')
      const routeA = RouteUtils.create({ path: '/article/:id' }, locationA)
      const routeB = RouteUtils.create({ path: '/article/:id' }, locationB)
      expect(RouteUtils.equal(routeA, routeB)).toBe(false)
    })

    it('should return false if routes provided contain different URL parameters with routePath arg', () => {
      const locationA = createLocation('/article/1')
      const locationB = createLocation('/article/1/update')
      const routeA = RouteUtils.create(
        { path: '/article/:id/:method?', routePath: '/article/:id' },
        locationA,
      )
      const routeB = RouteUtils.create(
        { path: '/article/:id/:method?', routePath: '/article/:id' },
        locationB,
      )
      expect(RouteUtils.equal(routeA, routeB)).toBe(false)
    })

    it('should return true if routes provided contain same URL parameters with routePath arg', () => {
      const locationA = createLocation('/article/1/update')
      const locationB = createLocation('/article/1/update')
      const routeA = RouteUtils.create(
        { path: '/article/:id/:method?', routePath: '/article/:id' },
        locationA,
      )
      const routeB = RouteUtils.create(
        { path: '/article/:id/:method?', routePath: '/article/:id' },
        locationB,
      )
      expect(RouteUtils.equal(routeA, routeB)).toBe(true)
    })
  })
})
