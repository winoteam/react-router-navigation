import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link, DeepLinking } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default () => (
  <NativeRouter>
    <View style={styles.container}>
      <DeepLinking />
      <Navigation>
        <Card
          exact
          path="/"
          render={() => (
            <View style={styles.container}>
              <Text>Index</Text>
              <Link to="/yolo">
                <Text>Push to a new scene</Text>
              </Link>
            </View>
          )}
        />
        <Card
          path="/yolo"
          component={() => (
            <View style={styles.container}>
              <Text>Yolo</Text>
              <Link to="/hello">
                <Text>Push to tabs</Text>
              </Link>
            </View>
          )}
          title="Yolo"
        />
        <Card
          path="/hello"
          title="Hello"
          render={({ match: { url } }) => (
            <Switch>
              <Route
                exact
                path={url}
                render={() => <Redirect to={`${url}/one`} />}
              />
              <Tabs style={styles.container}>
                <Tab
                  path={`${url}/one`}
                  label="One"
                  render={() => (
                    <View style={styles.container}>
                      <Text>One</Text>
                    </View>
                  )}
                />
                <Tab
                  path={`${url}/two`}
                  label="Two"
                  render={() => (
                    <View style={styles.container}>
                      <Text>Two</Text>
                    </View>
                  )}
                />
                <Tab
                  path={`${url}/three`}
                  label="Three"
                  render={() => (
                    <View style={styles.container}>
                      <Text>Three</Text>
                    </View>
                  )}
                />
              </Tabs>
            </Switch>
          )}
        />
      </Navigation>
    </View>
  </NativeRouter>
)
