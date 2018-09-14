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
const selectCurrentRates = (state) => state.rates.data

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
    yield put(TransactionsActions.transactionsSuccess(response.data))
  } else {
    yield put(TransactionsActions.transactionsFailure())
  }
}

export function* getTotalTransactions(action) {
  const { sku, currency } = action.item
  const currentData = yield select(selectCurrentData)
  let amounts_to_sum = []
  let item_found = false
  console.log("SKU: ", sku)
  console.log("CURRENCY: ", currency)
  // let currency = ''
  for (index = 0; index < currentData.length; index++) {
    let item = currentData[index]
    if (sku === item.sku) {
      let amount = item.amount
      if (item.currency !== currency) {
        console.log("Have to convert " + item.amount + " " + item.currency + " to " + currency)
        amount = yield call(_convert, item.amount, item.currency, currency)
        console.log("Converted " + item.amount + " to " + amount)
      }
      amounts_to_sum.push(amount)
    }
  }
  console.log("Amounts to sum: ", amounts_to_sum)
  let total = yield call(sumValues, amounts_to_sum)
  return yield put(TransactionsActions.setTotalTransactions(total.toFixed(2)))
}

function* _convert(amount, from, to) {
  let converted = 0
  console.log("CONVERTING " + amount + " FROM " + from + " TO " + to)
  const currentRates = yield select(selectCurrentRates)
  console.log("RATES: ", currentRates)
  for (i = 0; i < currentRates.length; i++) {
    let item = currentRates[i]
    if (item.from === from) {
      console.log("Found conversion from " + item.from + " to " + item.to)
      if (item.to === to) {
        converted = parseFloat(amount)*parseFloat(item.rate)
        console.log("Converted from "+amount+" to "+converted+" at "+item.rate+" rate ")
        return converted
      }
    }
  }
  return converted
}

// function* calculateRate(amount, from, to) {
//   console.log("CONVERTING FROM " + from + " TO " + to)
//   let rates_avail = []
//   const currentRates = yield select(selectCurrentRates)
//   console.log("RATES: " + JSON.stringify(currentRates))
//   for (i = 0; i < currentRates.length; i++) {
//     let current = currentRates[i]
//     if (current.from === from) {
//       if (current.to === to) {
//         console.log("AMOUNT: " + amount)
//         console.log("RATE: " + current.rate)
//         return (parseFloat(amount) / parseFloat(current.rate)).toFixed(2)
//       }
//       else rates_avail.push(current.to)
//     }
//   }
//   console.log("RATES AVAILABLE: " + JSON.stringify(rates_avail))
//   return -1
// }

function* sumValues(values) {
  console.log("Adding values: " + JSON.stringify(values))
  let total = 0
  for (i = 0; i < values.length; i++) {
    total += parseFloat(values[i])
  }
  console.log("Total: ", total)
  return total
}
