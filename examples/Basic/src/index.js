import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link, DeepLinking } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
    padding: 18,
  },
  tabs: {
    backgroundColor: 'rgb(226, 68, 68)',
  },
  indicator: {
    backgroundColor: 'white',
  },
})

export default () => (
  <NativeRouter>
    <View style={styles.container}>
      <DeepLinking>
        <Navigation
          backButtonTintColor="red"
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
              </View>
            )}
          />
          <Card
            path="/yolo"
            component={() => (
              <View style={styles.scene}>
                <Link component={TouchableOpacity} to="/hello">
                  <Text>Push tabs</Text>
                </Link>
              </View>
            )}
            title="Yolo"
          />
          <Card
            path="/hello"
            title="Hello"
            render={({ staticMatch: { url } }) => (
              <Switch>
                <Route
                  exact
                  path={url}
                  render={() => <Redirect to={`${url}/one`} />}
                />
                <Route
                  render={() => (
                    <Tabs
                      style={styles.container}
                      tabBarStyle={styles.tabs}
                      tabBarIndicatorStyle={styles.indicator}
                    >
                      <Tab
                        path={`${url}/one`}
                        label="One"
                        render={() => (
                          <View style={styles.scene}>
                            <Text>One</Text>
                          </View>
                        )}
                      />
                      <Tab
                        path={`${url}/two`}
                        label="Two"
                        render={() => (
                          <View style={styles.scene}>
                            <Text>Two</Text>
                          </View>
                        )}
                      />
                      <Tab
                        path={`${url}/three`}
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
      </DeepLinking>
    </View>
  </NativeRouter>
)
