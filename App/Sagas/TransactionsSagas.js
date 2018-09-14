/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import TransactionsActions, { TransactionsSelectors } from '../Redux/TransactionsRedux'

const selectCurrentData = (state) => state.transactions.data

export function* getTransactions(api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(TransactionsSelectors.getData)
  // make the call to the api
  const response = yield call(api.getTransactions, data)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    console.log("TRANSACTIONS: "+JSON.stringify(response.data))
    yield put(TransactionsActions.transactionsSuccess(response.data))
  } else {
    yield put(TransactionsActions.transactionsFailure())
  }
}

export function* getTotalTransactions(action) {
  console.log("ACTION: "+JSON.stringify(action))
  const { sku } = action
  const currentData = yield select(selectCurrentData)
  let amounts_to_sum = []
  let item_found = false
  for (index = 0; index < currentData.length; index++){
    let item = currentData[index]
    if (item.sku = sku && !item_found) {
      item_found = true
      console.log("Go through the whole array to find index")
      for (i = index; i < currentData.length; i++) {
        if (currentData[i].sku === item.sku) {
          amounts_to_sum.push(currentData[i].amount)
        }
      }
    }
  }
  yield call(sumValues, amounts_to_sum)
}

function* sumValues(values) {
  console.log("VALUES: "+JSON.stringify(values))
  let total = 0
  for (i = 0; i < values.length; i++) {
    total += parseFloat(values[i])
  }
  yield put(TransactionsActions.setTotalTransactions(total.toFixed(2)))
}
