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
