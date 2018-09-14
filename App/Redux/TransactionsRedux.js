import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  transactionsRequest: ['data'],
  transactionsSuccess: ['payload'],
  transactionsFailure: null,
  getTotalTransactions: ['item'],
  setTotalTransactions: ['result']
})

export const TransactionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  fetching: null,
  payload: null,
  error: null,
  total_by_sku: 0
})

/* ------------- Selectors ------------- */

export const TransactionsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, { payload }) => {
  return state.merge({ fetching: false, error: null, data: payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const getTotalTransactions = (state, {item}) => {
  return state.merge({ item })
}

export const setTotalTransactions = (state, { result }) => {
  return state.merge({ total_by_sku: result })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSACTIONS_REQUEST]: request,
  [Types.TRANSACTIONS_SUCCESS]: success,
  [Types.TRANSACTIONS_FAILURE]: failure,
  [Types.GET_TOTAL_TRANSACTIONS]: getTotalTransactions,
  [Types.SET_TOTAL_TRANSACTIONS]: setTotalTransactions
})
