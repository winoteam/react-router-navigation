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
    const SceneComponent = jest.fn(({ match }) => {
      return componentFactory()({ match })
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <SceneView
              history={contextRouter.history}
              match={{ path: '/:id', url: '/1', params: { id: '1' } }}
              path="/:id"
              render={SceneComponent}
            />
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    expect(SceneComponent.mock.calls[0][0]).toMatchObject({
      match: { url: '/1', params: { id: '1' } },
      history: { location: { pathname: '/1' } },
      location: { pathname: '/1' },
    })
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
              match={{ path: '/:id', url: '/1', params: { id: '1' } }}
              path="/:id"
              component={SceneComponent}
            />
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/2')
    expect(component.toJSON()).toMatchSnapshot()
    expect(SceneComponent.mock.calls[0][0]).toMatchObject({
      match: { url: '/1', params: { id: '1' } },
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[1][0]).toMatchObject({
      match: { url: '/1', params: { id: '1' } },
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[2][0]).toMatchObject({
      match: { url: '/1', params: { id: '1' } },
      location: { pathname: '/2' },
    })
    expect(SceneComponent.mock.calls).toHaveLength(3)
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
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/2')
    expect(component.toJSON()).toMatchSnapshot()
    expect(SceneComponent.mock.calls[0][0]).toMatchObject({
      match: null,
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[1][0]).toMatchObject({
      match: { url: '/2', params: { id: '2' } },
      location: { pathname: '/2' },
    })
    expect(SceneComponent.mock.calls).toHaveLength(2)
  })

  it('should re-render correctly with routePath prop (1)', () => {
    const SceneComponent = jest.fn(({ match }) => {
      return componentFactory()({ match })
    })
    const history = createHistory({ initialEntries: ['/1'] })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <SceneView
              history={contextRouter.history}
              match={{ path: '/:id', url: '/1', params: { id: '1' } }}
              path="/:id/:method(read|update)?"
              routePath="/:id"
              component={SceneComponent}
            />
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/1/read')
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/1/read/bookmarks')
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/2/read')
    expect(component.toJSON()).toMatchSnapshot()
    expect(SceneComponent.mock.calls[0][0]).toMatchObject({
      match: { url: '/1', params: { id: '1' } },
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[1][0]).toMatchObject({
      match: { url: '/1', params: { id: '1' } },
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[2][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read' },
    })
    expect(SceneComponent.mock.calls[3][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read' },
    })
    expect(SceneComponent.mock.calls[4][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read/bookmarks' },
    })
    expect(SceneComponent.mock.calls[5][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read/bookmarks' },
    })
    expect(SceneComponent.mock.calls[6][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/2/read' },
    })
    expect(SceneComponent.mock.calls).toHaveLength(7)
  })

  it('should re-render correctly with routePath prop (2)', () => {
    const SceneComponent = jest.fn(({ match }) => {
      return componentFactory()({ match })
    })
    const history = createHistory({ initialEntries: ['/1'] })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <SceneView
              history={contextRouter.history}
              match={{
                path: '/:id/:method(read|update)?',
                url: '/1',
                params: { id: '1' },
              }}
              path="/:id/:method(read|update)?"
              routePath="/:id/:method(read|update)?"
              component={SceneComponent}
            />
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/1/read')
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/1/read/bookmarks')
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/1/update')
    expect(component.toJSON()).toMatchSnapshot()
    expect(SceneComponent.mock.calls[0][0]).toMatchObject({
      match: { url: '/1', params: { id: '1' } },
    })
    expect(SceneComponent.mock.calls[1][0]).toMatchObject({
      location: { pathname: '/1' },
    })
    expect(SceneComponent.mock.calls[2][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read' },
    })
    expect(SceneComponent.mock.calls[3][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read' },
    })
    expect(SceneComponent.mock.calls[4][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read/bookmarks' },
    })
    expect(SceneComponent.mock.calls[5][0]).toMatchObject({
      match: { url: '/1/read', params: { id: '1', method: 'read' } },
      location: { pathname: '/1/read/bookmarks' },
    })
    expect(SceneComponent.mock.calls[6][0]).toMatchObject({
      match: { url: '/1/update', params: { id: '1', method: 'update' } },
      location: { pathname: '/1/update' },
    })
    expect(SceneComponent.mock.calls).toHaveLength(7)
  })
})
