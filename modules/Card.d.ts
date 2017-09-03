/* @flow */

import { ReactElement } from 'react'
import { CardProps } from './TypeDefinitions'

type Props = CardProps

declare const Card: (props: Props) => ReactElement<Props>

export default Card
