import { call, put, select } from 'redux-saga/effects'
import TransactionsActions, { TransactionsSelectors } from '../Redux/TransactionsRedux'

const selectCurrentData = (state) => state.transactions.data
const selectCurrentRates = (state) => state.rates.rates_recalculated

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
  console.log("CURRENT DATA: ", currentData)
  const transactionsById = currentData.filter((value, index, array) => {
    return value.sku === sku
  })
  console.log("TRANSACTIONS BY "+sku+" ",transactionsById)
  // let currency = ''
  for (let index = 0; index < transactionsById.length; index++) {
    let item = transactionsById[index]
    let amount = item.amount
    if (item.currency !== currency)
      amount = yield call(_convert, item.amount, item.currency, currency)
    amounts_to_sum.push(amount)
  }

  console.log("Amounts to sum: ", amounts_to_sum)
  let total = yield call(sumValues, amounts_to_sum)
  return yield put(TransactionsActions.setTotalTransactions(total.toFixed(2)))
}

function* _convert(amount, from, to) {
  console.log("CONVERTING FROM "+from+" to "+to)
  let other_currencies = []
  const currentRates = yield select(selectCurrentRates)
  console.log("CURRENT RATES: ", currentRates)
  for (i = 0; i < currentRates.length; i++) {
    let item = currentRates[i]
    console.log("ITEM ",item)
    if (item.from === from) {
      let converted = parseFloat(amount) * parseFloat(item.rate)
      if (item.to === to) {
        return converted
      }
    }
  }
}

function* sumValues(values) {
  console.log("Adding values: " + JSON.stringify(values))
  let total = 0
  for (i = 0; i < values.length; i++) {
    total += parseFloat(values[i])
  }
  console.log("Total: ", total)
  return total
}
