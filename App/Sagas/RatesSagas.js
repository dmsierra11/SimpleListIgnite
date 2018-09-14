import { call, put } from 'redux-saga/effects'
import RatesActions from '../Redux/RatesRedux'
// import { RatesSelectors } from '../Redux/RatesRedux'

export function* getRates(api, action) {
  // debugger
  const { data } = action
  // get current data from Store
  // const currentData = yield select(RatesSelectors.getData)
  // make the call to the api
  const response = yield call(api.getRates, data)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield call(getAllCurrencies, response.data)
    yield put(RatesActions.ratesSuccess(response.data))
  } else {
    yield put(RatesActions.ratesFailure())
  }
}

function* getAllCurrencies(rates) {
  all_currencies = []
  for (let i = 0; i < rates.length; i++) {
    let currency = rates[i].from
    if (all_currencies.indexOf(currency) === -1) {
      all_currencies.push(currency)
      console.log("Searching all exchanges for " + currency + " in ")
    }
  }
  console.log("ALL CURRENCIES: ", all_currencies)

  yield call(getAllExchanges, all_currencies, rates)
}

function* getAllExchanges(all_currencies, rates) {
  let all_rates = []
  for (let i = 0; i < all_currencies.length; i++) {
    for (let j = 0; j < all_currencies.length; j++) {
      const from = all_currencies[i]
      const to = all_currencies[j]
      if (from !== to) {
        let rate = yield call(_convert, 1, from, to, rates)
        all_rates.push({ from: from, to: to, rate: rate })
      }
    }
  }
  yield put(RatesActions.setAllRates(all_rates))
}

function* _convert(amount, from, to, currentRates) {
  let other_currencies = []
  console.log("CONVERTING " + amount + " FROM " + from + " TO " + to)
  for (let i = 0; i < currentRates.length; i++) {
    let item = currentRates[i]
    if (item.from === from) {
      console.log("Found conversion from " + item.from + " to " + item.to)
      let converted = parseFloat(amount) * parseFloat(item.rate)
      console.log("Converted from " + amount + " to " + converted + " at " + item.rate + " rate ")
      if (item.to === to) {
        return converted
      } else {
        other_currencies.push({ currency: item.to, amount: converted })
      }
    }
  }
  console.log("Couldnt find direct conversion, found these: ", other_currencies)
  for (i = 0; i < other_currencies.length; i++) {
    let item = other_currencies[i]
    console.log("Looking for secondary conversion " + " " + item.amount + " " + item.currency + " to " + to)
    let converted = yield call(_convert, 1, item.currency, to, currentRates)
    return converted
  }
}
