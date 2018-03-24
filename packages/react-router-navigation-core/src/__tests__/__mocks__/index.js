/* eslint no-undef: 0 */
/* eslint global-require: 0 */

jest.mock('View', () => {
  const RealComponent = require.requireActual('View')
  const React = require('react')
  const View = ({ children }) => {
    return React.createElement('View', {}, children)
  }
  View.propTypes = RealComponent.propTypes
  return View
})

jest.mock('Text', () => {
  const RealComponent = require.requireActual('Text')
  const React = require('react')
  const Text = ({ children }) => {
    return React.createElement('Text', {}, children)
  }
  Text.propTypes = RealComponent.propTypes
  return Text
})

jest.mock('TouchableOpacity', () => {
  const RealComponent = require.requireActual('TouchableOpacity')
  const React = require('react')
  const TouchableOpacity = ({ children, onPress }) => {
    return React.createElement('TouchableOpacity', { onPress }, children)
  }
  TouchableOpacity.propTypes = RealComponent.propTypes
  return TouchableOpacity
})
