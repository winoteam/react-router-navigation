import React from 'react'
import BackButton from './../BackButton'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'
import renderer from 'react-test-renderer'

it('<BackButton /> renders correctly', () => {
  const component = renderer.create(
    <BackButton />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
