import React from 'react'
import { StyleSheet, Platform, View, Text } from 'react-native'
import { MemoryRouter, Match, Redirect } from 'react-router'
import { Navigation, Card, Tabs, Tab, Link } from 'react-router-navigation'

const styles = StyleSheet.create({
  navigation: {
    flex: 1,
  },
  tabs: {
    flex: 1,
  },
  scene: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 64 : 54,
  },
  tab: {
    flex: 1,
  },
})

export default () => (
  <MemoryRouter>
    <Navigation style={styles.container}>
      <Card
        exactly
        pattern="/"
        render={() => (
          <View style={styles.scene}>
            <Text>Index</Text>
            <Link to="/yolo">Push to a new scene</Link>
          </View>
        )}
      />
      <Card
        pattern="/yolo"
        component={() => (
          <View style={styles.scene}>
            <Text>Yolo</Text>
            <Link to="/hello/one">Push to tabs</Link>
          </View>
        )}
        title="Yolo"
      />
      <Card
        pattern="/hello"
        title="Hello"
        render={() => (
          <View style={{ flex: 1 }}>
            <Match
              exactly
              pattern="/hello"
              render={() => <Redirect to="/hello/one" />}
            />
            <Tabs
              style={styles.scene}
              containerStyle={styles.tabs}
            >
              <Tab
                pattern="/hello/one"
                label="One"
                render={() => (
                  <View style={styles.tab}>
                    <Text>One</Text>
                  </View>
                )}
              />
              <Tab
                pattern="/hello/two"
                label="Two"
                render={() => (
                  <View style={styles.tab}>
                    <Text>Two</Text>
                  </View>
                )}
              />
              <Tab
                pattern="/hello/three"
                label="Three"
                render={() => (
                  <View style={styles.tab}>
                    <Text>Three</Text>
                  </View>
                )}
              />
            </Tabs>
          </View>
        )}
      />
    </Navigation>
  </MemoryRouter>
)
