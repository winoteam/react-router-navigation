import React from 'react'
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import * as ReactRouter from 'react-router-native'

const Touchable = Platform.OS === 'ios'
  ? TouchableOpacity
  : TouchableNativeFeedback

const Link = (props: any): React$Element<any> => (
  <ReactRouter.Link
    component={Touchable}
    {...props}
  />
)

export default Link
