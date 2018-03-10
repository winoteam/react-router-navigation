import React, { Component } from 'react'
import { StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'

const PRIMARY_COLOR = 'rgb(226, 68, 68)'
const SECONDARY_COLOR = 'rgb(226, 144, 68)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    padding: 18,
  },
  tabs: {
    backgroundColor: PRIMARY_COLOR,
  },
  indicator: {
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
  },
})

class App extends Component {
  state = {
    navigation: {},
    card: {},
  }

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <StatusBar barStyle={this.state.navigation.barStyle} />
          <Navigation
            navBarStyle={this.state.navigation.navBarStyle}
            titleStyle={this.state.navigation.titleStyle}
            backButtonTintColor={this.state.navigation.backButtonTintColor}
          >
            <Card
              exact
              path="/"
              title="Index"
              render={() => (
                <View style={styles.scene}>
                  <Link component={TouchableOpacity} to="/yolo">
                    <Text>Push a new scene</Text>
                  </Link>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
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
                    }}
                  >
                    <Text>Change navbar style</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Card
              titleStyle={this.state.card.titleStyle || this.state.navigation.titleStyle}
              navBarStyle={this.state.card.navBarStyle || this.state.navigation.navBarStyle}
              backButtonTintColor={
                this.state.card.backButtonTintColor ||
                this.state.navigation.backButtonTintColor
              }
              path="/yolo"
              render={() => (
                <View style={styles.scene}>
                  <Link component={TouchableOpacity} to="/hello">
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
              )}
              title={this.state.card.title || 'Yolo'}
            />
            <Card
              path="/hello"
              title="Hello"
              render={({ match, location }) => (
                <Switch location={location}>
                  <Route
                    exact
                    path={match.url}
                    render={() => <Redirect to={`${match.url}/one`} />}
                  />
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
                          render={() => (
                            <View style={styles.scene}>
                              <Text>One</Text>
                            </View>
                          )}
                        />
                        <Tab
                          path={`${match.url}/two`}
                          label="Two"
                          render={() => (
                            <View style={styles.scene}>
                              <Text>Two</Text>
                            </View>
                          )}
                        />
                        <Tab
                          path={`${match.url}/three`}
                          label="Three"
                          render={() => (
                            <View style={styles.scene}>
                              <Text>Three</Text>
                            </View>
                          )}
                        />
                      </Tabs>
                    )}
                  />
                </Switch>
              )}
            />
          </Navigation>
        </View>
      </NativeRouter>
    )
  }
}

export default App
