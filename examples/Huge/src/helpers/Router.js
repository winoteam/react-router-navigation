import React from 'react'
import * as ReactRouter from 'react-router'
import createHistory from 'history/createMemoryHistory'
import { connect } from 'react-redux'
import { initialyzeHistory, changeHistory } from '@store/history'

const Router = connect()((ownProps) => {
  const { dispatch, ...props } = ownProps
  const history = createHistory(props)
  dispatch(initialyzeHistory(history))
  history.listen(() => dispatch(changeHistory(history)))
  return (
    <ReactRouter.Router
      {...props}
      history={history}
    />
  )
})

export default Router
