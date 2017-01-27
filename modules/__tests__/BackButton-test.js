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

it('<BackButton /> calls onPress prop on Press action ', () => {
  const onPress = jest.fn(() => true)
  const tree = shallow(
    <BackButton onPress={onPress} />
  )
  tree.find(TouchableOpacity).first().simulate('press')
  expect(onPress).toBe(true)
})
