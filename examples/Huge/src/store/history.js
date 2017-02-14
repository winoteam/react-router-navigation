/* eslint symbol-description: 0 */

const INITIALYZE_HISTORY = 'INITIALYZE_HISTORY'
const CHANGE_HISTORY = 'CHANGE_HISTORY'

export const initialyzeHistory = (history) => ({
  type: INITIALYZE_HISTORY,
  payload: { history },
})

export const changeHistory = (history) => ({
  type: CHANGE_HISTORY,
  payload: { history },
})

const initialState = {
  location: null,
  index: 0,
  entries: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALYZE_HISTORY:
    case CHANGE_HISTORY: {
      const { location, index, entries } = action.payload.history
      return {
        ...state,
        location,
        index,
        entries,
      }
    }
    default:
      return state
  }
}
