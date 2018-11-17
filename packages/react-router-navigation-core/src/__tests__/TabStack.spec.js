/* @noflow */

import * as React from 'react'
import { Router, Route } from 'react-router'
import { View } from 'react-native'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'
import './__mocks__'
import { componentFactory, renderTabView, sleep } from './utils'
import TabStack from '../TabStack'

describe('<TabStack />', () => {
  const IndexComponent = componentFactory('Index')
  const HelloComponent = componentFactory('Hello')
  const GoodbyeComponent = componentFactory('Goodbye')

  it('should render correctly', () => {
    const history = createHistory()
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack
              history={contextRouter.history}
              render={props => {
                expect(typeof props.onIndexChange).toBe('function')
                expect(typeof props.renderTab).toBe('function')
                expect(props.tabs).toMatchObject([
                  {
                    exact: true,
                    path: '/',
                    component: IndexComponent,
                  },
                  {
                    path: '/hello',
                    component: HelloComponent,
                  },
                  {
                    path: '/goodbye',
                    component: GoodbyeComponent,
                  },
                ])
                expect(props.navigationState).toMatchObject({
                  index: 0,
                  routes: [
                    {
                      name: '/',
                      match: {
                        url: '/',
                        isExact: true,
                        path: '/',
                        params: {},
                      },
                    },
                    {
                      name: '/hello',
                      match: null,
                    },
                    {
                      name: '/goodbye',
                      match: null,
                    },
                  ],
                })
                return renderTabView(props)
              }}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should render correctly with initialIndex and initialEntries props ', () => {
    const history = createHistory({
      initialIndex: 3,
      initialEntries: ['/', '/yolo', '/goodbye', '/hello', '/aa'],
    })
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(1)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "push" action is called', () => {
    const history = createHistory()
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/hello')
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
  })

  it('should re-render with lazy prop enabled', async () => {
    let onIndexChange
    const history = createHistory({
      initialEntries: ['/hello'],
    })
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return props.navigationState.routes.map(route => {
        return <View key={route.name}>{props.renderTab(route)}</View>
      })
    })
    const BasicRoute = jest.fn(props => {
      return props.render(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack
              history={contextRouter.history}
              render={TabViewComponent}
              lazy={true}
            >
              <BasicRoute exact path="/" render={IndexComponent} />
              <BasicRoute path="/hello" render={HelloComponent} />
              <BasicRoute path="/goodbye" render={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(0)
    expect(historySpy.mock.calls).toHaveLength(1)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    expect(historySpy.mock.calls).toHaveLength(2)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(3)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[2][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render with lazy prop disabled', async () => {
    let onIndexChange
    const history = createHistory({
      initialEntries: ['/hello'],
    })
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return props.navigationState.routes.map(route => {
        return <View key={route.name}>{props.renderTab(route)}</View>
      })
    })
    const BasicRoute = jest.fn(props => {
      return props.render(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack
              history={contextRouter.history}
              render={TabViewComponent}
              lazy={false}
            >
              <BasicRoute exact path="/" render={IndexComponent} />
              <BasicRoute path="/hello" render={HelloComponent} />
              <BasicRoute path="/goodbye" render={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(0)
    expect(historySpy.mock.calls).toHaveLength(1)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    expect(historySpy.mock.calls).toHaveLength(2)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(3)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[2][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "goBack" action is called', () => {
    const history = createHistory({
      initialIndex: 1,
      initialEntries: ['/hello', '/goodbye'],
    })
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.goBack()
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "go" action is called', () => {
    const history = createHistory({
      initialIndex: 2,
      initialEntries: ['/hello', '/goodbye', '/'],
    })
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.go(-2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "replace" action is called', () => {
    const history = createHistory()
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.replace('/hello')
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
  })

  it('should re-render correctly when "replace" action is called with routePath prop', () => {
    const history = createHistory({
      initialEntries: ['/hello/en'],
    })
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route
                path="/hello/:language(fr|en)"
                routePath="/hello"
                component={HelloComponent}
              />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.replace('/hello/fr')
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello/:language(fr|en)',
          match: {
            url: '/hello/en',
            isExact: true,
            path: '/hello/:language(fr|en)',
            params: { language: 'en' },
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello/:language(fr|en)',
          match: {
            url: '/hello/fr',
            isExact: true,
            path: '/hello/:language(fr|en)',
            params: { language: 'fr' },
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
  })

  it('should not re-render correctly when "replace" action is called with not defined location', () => {
    const history = createHistory({
      initialEntries: ['/hello/en'],
    })
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.replace('/hello/fr')
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(1)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: false,
            path: '/hello',
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
  })

  it('should re-render correctly when "onIndexChange" action is called with index arg', () => {
    let onIndexChange
    const history = createHistory()
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const BasicRoute = jest.fn(props => {
      return <props.component {...props} />
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <BasicRoute exact path="/" component={IndexComponent} />
              <BasicRoute path="/hello" component={HelloComponent} />
              <BasicRoute path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(1)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
  })

  it('should re-render correctly when "onIndexChange" action is called with route arg', () => {
    let onIndexChange
    const history = createHistory()
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const BasicRoute = jest.fn(props => {
      return <props.component {...props} />
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <BasicRoute exact path="/" component={IndexComponent} />
              <BasicRoute path="/hello" component={HelloComponent} />
              <BasicRoute path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange({ name: '/goodbye' })
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(1)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
  })

  it('should re-render correctly when "onIndexChange" action is called with index arg and initialPath prop', () => {
    let onIndexChange
    const history = createHistory()
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const BasicRoute = jest.fn(props => {
      return <props.component {...props} />
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <BasicRoute exact path="/" component={IndexComponent} />
              <BasicRoute path="/hello" component={HelloComponent} />
              <BasicRoute
                path="/:name"
                initialPath="/goodbye"
                component={GoodbyeComponent}
              />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/:name',
            params: { name: 'goodbye' },
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(1)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
  })

  it('should re-render correctly when "onIndexChange" action is called with index arg inside advanced history nodes', () => {
    let onIndexChange
    const history = createHistory({
      initialEntries: ['/hello/en'],
    })
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const BasicRoute = jest.fn(props => {
      return <props.component {...props} />
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <BasicRoute exact path="/" component={IndexComponent} />
              <BasicRoute path="/hello" component={HelloComponent} />
              <BasicRoute path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/hello/fr')
    history.push('/hello/de')
    expect(historySpy.mock.calls).toHaveLength(2)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/hello/fr',
          search: '',
          hash: '',
          state: undefined,
        },
        'PUSH',
      ],
      [
        {
          pathname: '/hello/de',
          search: '',
          hash: '',
          state: undefined,
        },
        'PUSH',
      ],
    ])
    onIndexChange(2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: false,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            isExact: false,
            path: '/hello',
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(3)
    expect(historySpy.mock.calls.slice(2)).toMatchObject([
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
    onIndexChange(1)
    expect(history).toMatchObject({
      index: 2,
      location: {
        pathname: '/hello/de',
      },
      entries: [
        { pathname: '/hello/en' },
        { pathname: '/hello/fr' },
        { pathname: '/hello/de' },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(4)
    expect(historySpy.mock.calls.slice(3)).toMatchObject([
      [
        {
          pathname: '/hello/de',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should reset tab by calling history.go function', () => {
    let onIndexChange
    const history = createHistory()
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route
                path="/:name/:extra?"
                initialPath="/goodbye"
                component={GoodbyeComponent}
              />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    history.push('/goodbye/first')
    history.push('/goodbye/second')
    onIndexChange(2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(5)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name/:extra?',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name/:extra?',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/:name/:extra?',
            params: { name: 'goodbye' },
          },
        },
      ],
    })
    expect(TabViewComponent.mock.calls[2][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name/:extra?',
          match: {
            url: '/goodbye/first',
            isExact: true,
            path: '/:name/:extra?',
            params: { name: 'goodbye', extra: 'first' },
          },
        },
      ],
    })
    expect(TabViewComponent.mock.calls[3][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name/:extra?',
          match: {
            url: '/goodbye/second',
            isExact: true,
            path: '/:name/:extra?',
            params: { name: 'goodbye', extra: 'second' },
          },
        },
      ],
    })
    expect(TabViewComponent.mock.calls[4][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name/:extra?',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/:name/:extra?',
            params: { name: 'goodbye' },
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(4)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
      [
        {
          pathname: '/goodbye/first',
          search: '',
          hash: '',
          state: undefined,
        },
        'PUSH',
      ],
      [
        {
          pathname: '/goodbye/second',
          search: '',
          hash: '',
          state: undefined,
        },
        'PUSH',
      ],
      [
        {
          hash: '',
          pathname: '/goodbye',
          search: '',
          state: undefined,
        },
        'POP',
      ],
    ])
  })

  it('should reset tab by calling onReset prop function', () => {
    let onIndexChange
    const history = createHistory({ initialEntries: ['/goodbye'] })
    const historySpy = jest.fn()
    const resetSpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route
                path="/goodbye"
                component={GoodbyeComponent}
                onReset={resetSpy}
              />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(1)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(0)
  })

  it('should reset tab by calling history.replace function with initialPath prop', () => {
    let onIndexChange
    const history = createHistory({ initialEntries: ['/goodbye'] })
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route
                path="/:name"
                initialPath="/goodbye"
                component={GoodbyeComponent}
              />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(1)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/:name',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/:name',
            params: { name: 'goodbye' },
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(1)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
  })

  it('should reset tab by calling history.replace function with path prop', () => {
    let onIndexChange
    const history = createHistory({ initialEntries: ['/goodbye'] })
    const historySpy = jest.fn()
    history.listen(historySpy)
    const TabViewComponent = jest.fn(props => {
      onIndexChange = props.onIndexChange
      return renderTabView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onIndexChange(2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(1)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/',
          match: null,
        },
        {
          name: '/hello',
          match: null,
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
    expect(historySpy.mock.calls).toHaveLength(1)
    expect(historySpy.mock.calls).toMatchObject([
      [
        {
          pathname: '/goodbye',
          search: '',
          hash: '',
          state: undefined,
        },
        'REPLACE',
      ],
    ])
  })

  it('should re render correctly when new tabs are provided', () => {
    const history = createHistory()
    const TabViewComponent = jest.fn(props => {
      return renderTabView(props)
    })
    let component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    component.update(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <TabStack history={contextRouter.history} render={TabViewComponent}>
              <Route exact path="/" component={HelloComponent} />
            </TabStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    const initialNavigationState =
      TabViewComponent.mock.calls[0][0].navigationState
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: initialNavigationState.routes[0].key,
          name: '/',
          match: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
        {
          key: initialNavigationState.routes[1].key,
          name: '/hello',
          match: null,
        },
        {
          key: initialNavigationState.routes[2].key,
          name: '/goodbye',
          match: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[0][0].tabs).toMatchObject([
      {
        exact: true,
        path: '/',
        component: IndexComponent,
      },
      {
        path: '/hello',
        component: HelloComponent,
      },
      {
        path: '/goodbye',
        component: GoodbyeComponent,
      },
    ])
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: initialNavigationState.routes[0].key,
          name: '/',
          match: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].tabs).toMatchObject([
      {
        exact: true,
        path: '/',
        component: HelloComponent,
      },
    ])
  })
})
