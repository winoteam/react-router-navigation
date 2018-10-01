import * as React from 'react'
import { TouchableOpacity, BackHandler } from 'react-native'
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

  it('should render correctly', () => {
    const history = createHistory()
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(1)
    expect(typeof CardViewComponent.mock.calls[0][0].onNavigateBack).toBe(
      'function',
    )
    expect(typeof CardViewComponent.mock.calls[0][0].renderCard).toBe(
      'function',
    )
    expect(CardViewComponent.mock.calls[0][0].cards).toMatchObject([
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
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
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
      ],
    })
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(1)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/hello')
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
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
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
            url: '/hello',
            path: '/hello',
            isExact: true,
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "push" action is called with URL parameters', () => {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.push('/article/2')
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/article/:id',
          match: {
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
          name: '/article/:id',
          match: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          name: '/article/:id',
          match: {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.goBack()
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
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
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
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
      ],
    })
  })

  it('should re-render correctly when "goBack" action is called with URL parameters', () => {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.goBack()
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/article/:id',
          match: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          name: '/article/:id',
          match: {
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
          name: '/article/:id',
          match: {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.go(-2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
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
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
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
      ],
    })
  })

  it('should re-render correctly when "go" action is called with URL parameters', () => {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.go(-2)
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 2,
      routes: [
        {
          name: '/article/:id',
          match: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          name: '/article/:id',
          match: {
            url: '/article/2',
            path: '/article/:id',
            isExact: true,
            params: { id: '2' },
          },
        },
        {
          name: '/article/:id',
          match: {
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
          name: '/article/:id',
          match: {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.replace('/goodbye')
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
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
          name: '/',
          match: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
        {
          name: '/goodbye',
          match: {
            url: '/goodbye',
            path: '/goodbye',
            isExact: true,
            params: {},
          },
        },
      ],
    })
  })

  it('should re-render correctly when "replace" action is called with URL parameters', () => {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route path="/article/:id" component={ArticleComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.replace('/article/3')
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/article/:id',
          match: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          name: '/article/:id',
          match: {
            url: '/article/2',
            path: '/article/:id',
            isExact: true,
            params: { id: '2' },
          },
        },
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/article/:id',
          match: {
            url: '/article/1',
            path: '/article/:id',
            isExact: true,
            params: { id: '1' },
          },
        },
        {
          name: '/article/:id',
          match: {
            url: '/article/3',
            path: '/article/:id',
            isExact: true,
            params: { id: '3' },
          },
        },
      ],
    })
  })

  it('should re-render correctly when "replace" action is called with routePath prop', () => {
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
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route
                path="/article/:id/:method(read|update)?"
                routePath="/article/:id"
                component={ArticleComponent}
              />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    history.replace('/article/1/update')
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/article/:id/:method(read|update)?',
          match: {
            url: '/article/1',
            path: '/article/:id/:method(read|update)?',
            isExact: true,
            params: { id: '1' },
          },
        },
      ],
    })
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
          name: '/article/:id/:method(read|update)?',
          match: {
            url: '/article/1/update',
            path: '/article/:id/:method(read|update)?',
            isExact: true,
            params: { id: '1', method: 'update' },
          },
        },
      ],
    })
  })

  it('should re-render correctly when "onNavigationBack" action is called', () => {
    let onNavigateBack
    const history = createHistory({
      initialIndex: 1,
      initialEntries: ['/', '/hello'],
    })
    const CardViewComponent = jest.fn(props => {
      onNavigateBack = props.onNavigateBack
      return renderCardView(props)
    })
    const component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
              <Route path="/goodbye" component={GoodbyeComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    onNavigateBack()
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 1,
      routes: [
        {
          name: '/',
          match: {
            url: '/',
            path: '/',
            isExact: true,
            params: {},
          },
        },
        {
          name: '/hello',
          match: {
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
  })

  it('should re render correctly when new cards are provided', () => {
    const history = createHistory()
    const CardViewComponent = jest.fn(props => {
      return renderCardView(props)
    })
    let component = renderer.create(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={IndexComponent} />
              <Route path="/hello" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    component.update(
      <Router history={history}>
        <Route>
          {contextRouter => (
            <CardStack
              history={contextRouter.history}
              render={CardViewComponent}
              backHandler={BackHandler}
            >
              <Route exact path="/" component={HelloComponent} />
            </CardStack>
          )}
        </Route>
      </Router>,
    )
    expect(component.toJSON()).toMatchSnapshot()
    expect(CardViewComponent.mock.calls).toHaveLength(2)
    expect(CardViewComponent.mock.calls[0][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
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
    expect(CardViewComponent.mock.calls[0][0].cards).toMatchObject([
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
    expect(CardViewComponent.mock.calls[1][0].navigationState).toMatchObject({
      index: 0,
      routes: [
        {
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
    expect(CardViewComponent.mock.calls[1][0].cards).toMatchObject([
      {
        exact: true,
        path: '/',
        component: HelloComponent,
      },
    ])
  })
})
