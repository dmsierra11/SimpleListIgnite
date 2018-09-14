import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ratesRequest: null,
  ratesSuccess: ['payload'],
  ratesFailure: null,
  setAllRates: ['all_rates']
})

export const RatesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  rates_recalculated: []
})

/* ------------- Selectors ------------- */

// export const RatesSelectors = {
//   getData: state => state.data
// }

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, data: payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const setAllRates = (state, { all_rates }) => {
  console.log("RATES RECALCULATED: ", all_rates)
  return state.merge({ rates_recalculated: all_rates })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RATES_REQUEST]: request,
  [Types.RATES_SUCCESS]: success,
  [Types.RATES_FAILURE]: failure,
  [Types.SET_ALL_RATES]: setAllRates
})
