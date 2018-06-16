import React, { Component } from 'react'
import { StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'

const PRIMARY_COLOR = 'rgb(226, 68, 68)'
const SECONDARY_COLOR = 'rgb(226, 144, 68)'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 18,
  },
  tabs: {
    backgroundColor: PRIMARY_COLOR,
  },
  tab: {
    paddingTop: 10,
    opacity: 10,
  },
  indicator: {
    backgroundColor: 'white',
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: -8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 3,
  },
  strong: {
    fontWeight: '700',
    marginBottom: 10,
  },
})

class App extends Component {
  state = {
    navigation: {},
    card: {},
  }

  renderFistCard = () => {
    return (
      <View style={styles.scene}>
        <Link component={TouchableOpacity} to="/newpage" style={styles.button}>
          <Text>Push a new scene</Text>
        </Link>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.setState({
              navigation: {
                navBarStyle: {
                  backgroundColor: PRIMARY_COLOR,
                  borderBottomWidth: 0,
                },
                titleStyle: { color: 'white' },
                barStyle: 'light-content',
                backButtonTintColor: 'white',
              },
            })
          }
        >
          <Text>Change navbar style</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderSecondCard = () => {
    return (
      <View style={styles.scene}>
        <Link component={TouchableOpacity} style={styles.button} to="/tabs">
          <Text>Push tabs</Text>
        </Link>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState(prevState => ({
              navigation: {
                ...prevState.navigation,
                barStyle: 'light-content',
              },
              card: {
                ...prevState.card,
                navBarStyle: {
                  backgroundColor: SECONDARY_COLOR,
                  borderBottomWidth: 0,
                },
                titleStyle: { color: 'white' },
                backButtonTintColor: 'white',
              },
            }))
          }}
        >
          <Text>Change navbar style</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState(prevState => ({
              card: {
                ...prevState.card,
                title: 'New title !',
              },
            }))
          }}
        >
          <Text>Change title</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderThirdCard = contextRouter => {
    const { location, match } = contextRouter
    return (
      <Switch location={location}>
        <Route exact path={match.url} render={() => <Redirect to={`${match.url}/one`} />} />
        <Route
          render={() => (
            <Tabs
              style={styles.container}
              tabBarStyle={styles.tabs}
              tabBarIndicatorStyle={styles.indicator}
            >
              <Tab
                path={`${match.url}/one`}
                label="One"
                tabStyle={styles.tab}
                render={this.renderFirstTab}
              />
              <Tab
                path={`${match.url}/two`}
                label="Two"
                tabStyle={styles.tab}
                render={this.renderSecondTab}
              />
              <Tab
                path={`${match.url}/three`}
                label="Three"
                tabStyle={styles.tab}
                render={this.renderThirdTab}
              />
            </Tabs>
          )}
        />
      </Switch>
    )
  }

  renderFirstTab = contextRouter => {
    const { match } = contextRouter
    const basePath = match && match.url.slice(0, match.url.lastIndexOf('/'))
    return (
      <View style={styles.scene}>
        <Text style={styles.strong}>One</Text>
        <Link
          component={TouchableOpacity}
          style={styles.button}
          replace
          to={`${basePath}/two`}
        >
          <Text>Go to "two"</Text>
        </Link>
        <Link
          component={TouchableOpacity}
          style={styles.button}
          replace
          to={`${basePath}/three`}
        >
          <Text>Go to "three"</Text>
        </Link>
      </View>
    )
  }

  renderSecondTab = contextRouter => {
    const { match } = contextRouter
    const basePath = match && match.url.slice(0, match.url.lastIndexOf('/'))
    return (
      <View style={styles.scene}>
        <Text style={styles.strong}>Two</Text>
        <Link
          component={TouchableOpacity}
          style={styles.button}
          replace
          to={`${basePath}/one`}
        >
          <Text>Go to "one"</Text>
        </Link>
        <Link
          component={TouchableOpacity}
          style={styles.button}
          replace
          to={`${basePath}/three`}
        >
          <Text>Go to "three"</Text>
        </Link>
      </View>
    )
  }

  renderThirdTab = contextRouter => {
    const { match } = contextRouter
    const basePath = match && match.url.slice(0, match.url.lastIndexOf('/'))
    return (
      <View style={styles.scene}>
        <Text style={styles.strong}>Three</Text>
        <Link
          component={TouchableOpacity}
          style={styles.button}
          replace
          to={`${basePath}/one`}
        >
          <Text>Go to "one"</Text>
        </Link>
        <Link
          component={TouchableOpacity}
          style={styles.button}
          replace
          to={`${basePath}/two`}
        >
          <Text>Go to "two"</Text>
        </Link>
      </View>
    )
  }

  render() {
    const { navigation, card } = this.state
    return (
      <NativeRouter>
        <React.Fragment>
          <StatusBar barStyle={navigation.barStyle} />
          <Navigation
            navBarStyle={navigation.navBarStyle}
            titleStyle={navigation.titleStyle}
            backButtonTintColor={navigation.backButtonTintColor}
          >
            <Card exact path="/" title="Index" render={this.renderFistCard} />
            <Card
              titleStyle={card.titleStyle || navigation.titleStyle}
              navBarStyle={card.navBarStyle || navigation.navBarStyle}
              backButtonTintColor={
                card.backButtonTintColor || navigation.backButtonTintColor
              }
              path="/newpage"
              render={this.renderSecondCard}
              title={card.title || 'New scene'}
            />
            <Card path="/tabs" title="Tabs" render={this.renderThirdCard} />
          </Navigation>
        </React.Fragment>
      </NativeRouter>
    )
  }
}

export default App
