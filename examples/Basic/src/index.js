import React from 'react'
import { StyleSheet, Platform, View, Text } from 'react-native'
import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card, Tabs, Tab } from 'react-router-navigation'

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 54,
  },
  tab: {
    flex: 1,
  },
})

export default () => (
  <NativeRouter>
    <Navigation>
      <Card
        exact
        path="/"
        render={() => (
          <View style={styles.scene}>
            <Text>Index</Text>
            <Link to="/yolo">Push to a new scene</Link>
          </View>
        )}
      />
      <Card
        path="/yolo"
        component={() => (
          <View style={styles.scene}>
            <Text>Yolo</Text>
            <Link to="/hello/one">Push to tabs</Link>
          </View>
        )}
        title="Yolo"
      />
      <Card
        path="/hello"
        title="Hello"
        render={() => (
          <Switch>
            <Route
              exact
              path="/hello"
              render={() => <Redirect to="/hello/one" />}
            />
            <Tabs style={styles.scene}>
              <Tab
                path="/hello/one"
                label="One"
                render={() => (
                  <View style={styles.tab}>
                    <Text>One</Text>
                  </View>
                )}
              />
              <Tab
                path="/hello/two"
                label="Two"
                render={() => (
                  <View style={styles.tab}>
                    <Text>Two</Text>
                  </View>
                )}
              />
              <Tab
                path="/hello/three"
                label="Three"
                render={() => (
                  <View style={styles.tab}>
                    <Text>Three</Text>
                  </View>
                )}
              />
            </Tabs>
          </Switch>
        )}
      />
    </Navigation>
  </NativeRouter>
)
