export default {
  // Functions return fixtures
  //TODO: Delete this
  // getRoot: () => {
  //   return {
  //     ok: true,
  //     data: require('../Fixtures/root.json')
  //   }
  // },
  // 
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },

  // getUser: (username) => {
  //   // This fixture only supports gantman or else returns skellock
  //   const gantmanData = require('../Fixtures/gantman.json')
  //   const skellockData = require('../Fixtures/skellock.json')
  //   return {
  //     ok: true,
  //     data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
  //   }
  // }

  getRates: () => {
    return {
      ok: true,
      data: require('../Fixtures/rates.json')
    }
  },
}
