import React, { Component, createElement } from 'react'
import { Animated, Dimensions, TouchableOpacity, View, Text } from 'react-native'
import { withRouter } from 'react-router'
import styles from './styles'

class Modal extends Component {

  constructor(props) {
    super(props)
    const { location: { state } } = props
    const isOpen = state && state.modal && state.modal.isOpen
    this.pan = new Animated.Value(isOpen ? 1 : 0)
  }

  componentWillReceiveProps(nextProps) {
    const { location: { state } } = nextProps
    const isOpen = state && state.modal && state.modal.isOpen
    Animated.timing(this.pan, {
      toValue: isOpen ? 1 : 0,
      duration: 375,
      delay: isOpen ? 20 : 0,
    })
  }

  render() {
    const { renderContent, location: { pathname }, history } = this.props
    const top = this.pan.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').height, 0],
    })
    return (
      <View style={styles.container}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.overlay,
            { opacity: this.pan },
          ]}
        />
        <Animated.View
          style={[
            styles.wrapper,
            { top },
          ]}
        >
          <View style={styles.modal}>
            {createElement(renderContent)}
            <TouchableOpacity
              onPress={() => history.replace(
                pathname,
                { modal: { isOpen: false } },
              )}
            >
              <Text style={styles.close}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )
  }
}

export default withRouter(Modal)
