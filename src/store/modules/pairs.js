import axios from 'axios';

export default {
  actions: {
    async getPairs({commit, state}) {
      let pairs = [];
      for (let i = 0; i < state.pairNames.length; i++) {
        pairs[i] = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${state.pairNames[i]}`); 
        let pair = {};
        pair.pair_name = Object.keys(pairs[i].data.result)[0].substring(0,3) 
          + ' - ' + Object.keys(pairs[i].data.result)[0].substring(3);
        pair.ask = pairs[i].data.result[Object.keys(pairs[i].data.result)[0]].a[0];
        pair.bid = pairs[i].data.result[Object.keys(pairs[i].data.result)[0]].b[0];
        pairs[i] = pair;
      };
      commit('updatePairs', pairs);
      pairs = [];
      setInterval(async () => {
        for (let i = 0; i < state.pairNames.length; i++) {
          pairs[i] = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${state.pairNames[i]}`); 
          let pair = {};
          pair.pair_name = Object.keys(pairs[i].data.result)[0].substring(0,3) 
            + ' - ' + Object.keys(pairs[i].data.result)[0].substring(3);
          pair.ask = pairs[i].data.result[Object.keys(pairs[i].data.result)[0]].a[0];
          pair.bid = pairs[i].data.result[Object.keys(pairs[i].data.result)[0]].b[0];
          pairs[i] = pair;
        };
        commit('updatePairs', pairs);
        pairs = [];
      }, 15000) 
    }
  },
  mutations: {
    updatePairs(state, pairs) {
      state.pairs = pairs;
    }
  },
  state: {
    pairs: [],
    pairNames: [ 'ADACAD', 'ADAETH', 'ADAEUR', 'ADAUSD', 'ADAXBT' ]
  },
  getters: {
    allPairs(state) {
      return state.pairs;
    }
  }
}