/* @noflow */

import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { Router, Route } from 'react-router'
import createHistory from 'history/createMemoryHistory'
import renderer from 'react-test-renderer'

import { componentFactory, renderCardView } from './utils'
import CardStack from './../CardStack'
import './__mocks__'

describe('<CardStack />', () => {
  const IndexComponent = componentFactory('Index')
  const HelloComponent = componentFactory('Hello')
  const GoodbyeComponent = componentFactory('Goodbye')
  const ArticleComponent = componentFactory()

  it('should render correctly with basic url', () => {
    const history = createHistory()
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack
              history={contextRouter.history}
              render={props => {
                expect(typeof props.onNavigateBack).toBe('function')
                expect(typeof props.renderCard).toBe('function')
                expect(props.cards).toMatchObject([
                  {
                    exact: true,
                    path: '/',
                    component: IndexComponent,
                  },
                  {
                    path: '/hello',
                    component: HelloComponent,
                  },
                ])
                expect(props.navigationState).toMatchObject({
                  index: 0,
                  routes: [
                    {
                      key: '/',
                      routeName: '/',
                      routeMatch: { url: '/', isExact: true, path: '/', params: {} },
                    },
                  ],
                })
                return renderCardView(props)
              }}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with complex url', () => {
    const history = createHistory({ initialEntries: ['/article/1'] })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack
              history={contextRouter.history}
              render={props => {
                expect(typeof props.onNavigateBack).toBe('function')
                expect(typeof props.renderCard).toBe('function')
                expect(props.cards).toMatchObject([
                  {
                    path: '/article/:id',
                    component: ArticleComponent,
                  },
                ])
                expect(props.navigationState).toMatchObject({
                  index: 0,
                  routes: [
                    {
                      key: '/article/1',
                      routeName: '/article/:id',
                      routeMatch: {
                        url: '/article/1',
                        isExact: true,
                        path: '/article/:id',
                        params: {},
                      },
                    },
                  ],
                })
                return renderCardView(props)
              }}
            >
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render correctly with initialIndex and initialEntries props', () => {
    const history = createHistory({
      initialIndex: 3,
      initialEntries: ['/', '/yolo', '/', '/hello', '/goodbye'],
    })
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(1)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
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
          routeMatch: {
            url: '/hello',
            path: '/hello',
            isExact: true,
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "push" action is called', () => {
    const history = createHistory()
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.push('/hello')
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
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
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
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
          routeMatch: {
            url: '/hello',
            path: '/hello',
            isExact: true,
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "push" action is called with same path', () => {
    const history = createHistory({
      initialEntries: ['/article/1'],
    })
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.push('/article/2')
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/article/1',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          key: '/article/1',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          key: '/article/2',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/2',
            path: '/article/:id',
            isExact: true,
            params: { id: '2' },
          },
        },
      ],
    })
  })

  it('should re-render correctly when "goBack" action is called', () => {
    const history = createHistory({
      initialIndex: 1,
      initialEntries: ['/', '/hello'],
    })
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.goBack()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
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
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
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
      ],
    })
  })

  it('should re-render correctly when "goBack" action is called with same path', () => {
    const history = createHistory({
      initialIndex: 1,
      initialEntries: ['/article/1', '/article/2'],
    })
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.goBack()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          key: '/article/1',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          key: '/article/2',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/2',
            path: '/article/:id',
            isExact: true,
            params: { id: '2' },
          },
        },
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/article/1',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
      ],
    })
  })

  it('should re-render correctly when "go" action is called', () => {
    const history = createHistory({
      initialIndex: 2,
      initialEntries: ['/', '/hello', '/goodbye'],
    })
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.go(-2)
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
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
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
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
      ],
    })
  })

  it('should re-render correctly when "go" action is called with same path', () => {
    const history = createHistory({
      initialIndex: 2,
      initialEntries: ['/article/1', '/article/2', '/article/3'],
    })
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.go(-2)
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          key: '/article/1',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          key: '/article/2',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/2',
            path: '/article/:id',
            isExact: true,
            params: { id: '2' },
          },
        },
        {
          key: '/article/3',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/3',
            path: '/article/:id',
            isExact: true,
            params: { id: '3' },
          },
        },
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          key: '/article/1',
          routeName: '/article/:id',
          routeMatch: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
      ],
    })
  })

  it('should re-render correctly when "replace" action is called', () => {
    const history = createHistory({
      initialIndex: 1,
      initialEntries: ['/', '/hello'],
    })
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    history.replace('/goodbye')
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
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
          routeMatch: {
            url: '/hello',
            path: '/hello',
            isExact: true,
            params: {},
          },
        },
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
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
          key: '/goodbye',
          routeName: '/goodbye',
          routeMatch: {
            url: '/goodbye',
            path: '/goodbye',
            isExact: true,
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "onNavigationBack" action is called', () => {
    let onNavigateBack
    const history = createHistory({ initialIndex: 1, initialEntries: ['/', '/hello'] })
    const CardViewComponent = jest.fn(props => {
      onNavigateBack = props.onNavigateBack
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack history={contextRouter.history} render={CardViewComponent}>
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    onNavigateBack()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
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
          routeMatch: {
            url: '/hello',
            path: '/hello',
            isExact: true,
            params: {},
          },
        },
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
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
  })
})
