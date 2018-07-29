/* @noflow */

import * as React from 'react'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'

import './__mocks__'
import { componentFactory, renderTabView } from './utils'
import TabStack from './../TabStack'

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
                      key: '/',
                      routeName: '/',
                      routeMatch: {
                        url: '/',
                        isExact: true,
                        path: '/',
                        params: {},
                      },
                    },
                    {
                      key: '/hello',
                      routeName: '/hello',
                      routeMatch: null,
                    },
                    {
                      key: '/goodbye',
                      routeName: '/goodbye',
                      routeMatch: null,
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
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with initialIndex and initialEntries props ', () => {
    const history = createHistory({
      initialIndex: 3,
      initialEntries: ['/', '/yolo', '/goodbye', '/hello', '/'],
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
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(1)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: null,
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.push('/hello')
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.goBack()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: null,
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
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
          key: '/',
          routeName: '/',
          routeMatch: null,
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.go(-2)
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
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
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.replace('/hello')
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: {
            url: '/hello',
            isExact: true,
            path: '/hello',
            params: {},
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.replace('/hello/fr')
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: null,
        },
        {
          key: '/hello',
          routeName: '/hello/:language(fr|en)',
          routeMatch: {
            url: '/hello/en',
            isExact: true,
            path: '/hello/:language(fr|en)',
            params: { language: 'en' },
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: null,
        },
        {
          key: '/hello',
          routeName: '/hello/:language(fr|en)',
          routeMatch: {
            url: '/hello/fr',
            isExact: true,
            path: '/hello/:language(fr|en)',
            params: { language: 'fr' },
          },
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
  })

  it('should re-render correctly when "onIndexChange" action is called with index arg', () => {
    let onIndexChange
    const history = createHistory()
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    onIndexChange(2)
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(3)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[2][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "onIndexChange" action is called with index arg', () => {
    let onIndexChange
    const history = createHistory()
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    onIndexChange({ routeName: '/goodbye' })
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(3)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
        },
      ],
    })
    expect(TabViewComponent.mock.calls[2][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            isExact: true,
            path: '/',
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
            url: '/goodbye',
            isExact: true,
            path: '/goodbye',
            params: {},
          },
        },
      ],
    })
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
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
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
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(TabViewComponent.mock.calls).toHaveLength(2)
    expect(TabViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/',
          routeName: '/',
          routeMatch: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
        {
          key: '/hello',
          routeName: '/hello',
          routeMatch: null,
        },
        {
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: null,
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
          key: '/',
          routeName: '/',
          routeMatch: {
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
