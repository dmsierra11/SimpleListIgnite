export default {
  // Functions return fixtures
  getTransactions: () => {
    return {
      ok: true,
      data: require('../Fixtures/transactions.json')
    }
  },
  getRates: () => {
    return {
      ok: true,
      data: require('../Fixtures/rates.json')
    }
  },
}
