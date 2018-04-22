/* @noflow */

import * as React from 'react'
import { Text } from 'react-native'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'

import { componentFactory } from './utils'
import './__mocks__'
import SceneView from './../SceneView'

describe('<SceneView />', () => {
  it('should render correctly', () => {
    const history = createHistory({
      initialEntries: ['/1'],
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <SceneView
              history={contextRouter.history}
              routeMatch={{ path: '/:id', url: '/1', params: { id: '1' } }}
              path="/:id"
              render={({ match, location, history }) => {
                expect(history.location.pathname).toBe('/1')
                expect(location.pathname).toBe('/1')
                return componentFactory()({ match })
              }}
            />
          )}
        </Route>
      </Router>,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should re-render correctly on history change', async () => {
    const SceneComponent = jest.fn(({ match }) => {
      return componentFactory()({ match })
    })
    const history = createHistory({
      initialEntries: ['/1'],
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <SceneView
              history={contextRouter.history}
              routeMatch={{ path: '/:id', url: '/1', params: { id: '1' } }}
              path="/:id"
              component={SceneComponent}
            />
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.push('/2')
    tree = component.toJSON()
    expect(SceneComponent.mock.calls[0][0]).toMatchObject({
      match: { url: '/1' },
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[1][0]).toMatchObject({
      match: { url: '/1' },
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[2][0]).toMatchObject({
      match: { url: '/1' },
      location: { pathname: '/2' },
    })
    expect(SceneComponent.mock.calls).toHaveLength(3)
    expect(tree).toMatchSnapshot()
  })

  it('should re-render correctly on history change with no default route match prop', async () => {
    const SceneComponent = jest.fn(({ match }) => {
      return componentFactory()({ match })
    })
    const history = createHistory({
      initialEntries: ['/1'],
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <SceneView
              history={contextRouter.history}
              path="/:id"
              component={SceneComponent}
            />
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.push('/2')
    tree = component.toJSON()
    expect(SceneComponent.mock.calls[0][0]).toMatchObject({
      match: null,
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[1][0]).toMatchObject({
      match: { url: '/2' },
      location: { pathname: '/2' },
    })
    expect(SceneComponent.mock.calls).toHaveLength(2)
    expect(tree).toMatchSnapshot()
  })
})
