/* @flow */

import React, { PropTypes, Component } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MemoryRouter, Match, Redirect } from 'react-router'
import { Navigation, Tabs, MatchTab, MatchCard } from 'react-native-router-navigation'

const IndexScene = (props, context) => (
  <View style={styles.scene}>
    <Text>Index</Text>
    <TouchableOpacity onPress={() => context.history.push('hello/two')}>
      <Text>Push</Text>
    </TouchableOpacity>
  </View>
)

IndexScene.contextTypes = {
  history: PropTypes.object,
}

class Basic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MemoryRouter>
          <Navigation>
            <MatchCard
              exactly
              pattern="/"
              component={IndexScene}
              title="Index"
            />
            <MatchCard
              pattern="/hello"
              title="Hello"
              component={() => (
                <View style={{ flex: 1 }}>
                  <Match
                    exactly
                    pattern="/hello"
                    render={() => <Redirect to="/hello/one" />}
                  />
                  <Tabs
                    style={styles.scene}
                    containerStyle={styles.container}
                  >
                    <MatchTab
                      pattern="/hello/one"
                      title="One"
                      component={() => (
                        <View style={styles.tab}>
                          <Text>One</Text>
                        </View>
                      )}
                    />
                    <MatchTab
                      pattern="/hello/two"
                      title="Two"
                      component={() => (
                        <View style={styles.tab}>
                          <Text>Two</Text>
                        </View>
                      )}
                    />
                    <MatchTab
                      pattern="/hello/three"
                      title="Three"
                      component={() => (
                        <View style={styles.tab}>
                          <Text>Three</Text>
                        </View>
                      )}
                    />
                  </Tabs>
                </View>
              )}
            />
            <Match
              pattern="/goodbye"
              component={() => <Text>Goodbye</Text>}
            />
          </Navigation>
        </MemoryRouter>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scene: {
    flex: 1,
    marginTop: 64,
  },
  tab: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Basic', () => Basic);
