import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { TransactionsTypes } from '../Redux/TransactionsRedux'
import { RatesTypes } from '../Redux/RatesRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { getTransactions, getTotalTransactions } from './TransactionsSagas'
import { getRates } from './RatesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(TransactionsTypes.TRANSACTIONS_REQUEST, getTransactions, api),
    takeLatest(TransactionsTypes.GET_TOTAL_TRANSACTIONS, getTotalTransactions),
    takeLatest(RatesTypes.RATES_REQUEST, getRates, api)
  ])
}
