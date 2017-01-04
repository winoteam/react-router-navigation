/* @flow */

import { Component } from 'react'

type SubProps = any

type Props = SubProps & {
  children?: () => React$Element<any>,
  shouldUpdate: (props: SubProps, nextProps: SubProps) => void,
}

class StaticContainer extends Component<void, Props, void> {

  props: Props

  shouldComponentUpdate(nextProps: Props): boolean {
    const { shouldUpdate } = nextProps
    return shouldUpdate ? shouldUpdate(this.props, nextProps) : false
  }

  render(): React$Element<any> {
    const { children, ...props } = this.props
    return children && children(props)
  }

}

export default StaticContainer
