/* eslint no-undef: 0 */
/* eslint global-require: 0 */
/* eslint react/prop-types: 0 */

jest.mock('Text', () => {
  const RealComponent = require.requireActual('Text')
  const React = require('react')
  const Text = ({ children }) => {
    return React.createElement('Text', {}, children)
  }
  Text.propTypes = RealComponent.propTypes
  return Text
})
