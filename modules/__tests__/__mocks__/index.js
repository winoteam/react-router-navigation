/* eslint no-undef: 0 */
/* eslint global-require: 0 */

jest.mock('View', () => {
  const RealComponent = require.requireActual('View')
  const React = require('React')

  const View = ({ children }) => {
    return React.createElement('View', {}, children)
  }
  View.propTypes = RealComponent.propTypes
  return View
})

jest.mock('Text', () => {
  const RealComponent = require.requireActual('Text')
  const React = require('React')

  const Text = ({ children }) => {
    return React.createElement('Text', {}, children)
  }
  Text.propTypes = RealComponent.propTypes
  return Text
})

jest.mock('TouchableOpacity', () => {
  const RealComponent = require.requireActual('TouchableOpacity')
  const React = require('React')

  const TouchableOpacity = ({ children, onPress }) => {
    return React.createElement(
      'TouchableOpacity',
      { onPress },
      children,
    )
  }
  TouchableOpacity.propTypes = RealComponent.propTypes
  return TouchableOpacity
})

jest.mock('react-navigation/src/views/Card', () => (props) => {
  const React = require('React')

  return React.createElement(
    'Card',
    {},
    props.renderScene(props),
  )
})
