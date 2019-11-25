import axios from 'axios';

export default {
  actions: {
    async getPairs(ctx, pairNames) {
      let pairs1 = [];
      for (let i = 0; i < pairNames.length; i++) {
        pairs1[i] = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${pairNames[i]}`); 
      };
      ctx.commit('updatePairs', pairs1);
      setInterval(async () => {
        let pairs = [];
        for (let i = 0; i < pairNames.length; i++) {
          pairs[i] = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${pairNames[i]}`); 
        };
        ctx.commit('updatePairs', pairs);
      }, 15000) 
    }
  },
  mutations: {
    updatePairs(state, pairs) {
      let newPairs = [];
      for (let i = 0; i < pairs.length; i++){
        let pair = {};
        pair.name = Object.keys(pairs[i].data.result)[0];
        pair.ask = pairs[i].data.result[Object.keys(pairs[i].data.result)[0]].a[0];
        pair.bid = pairs[i].data.result[Object.keys(pairs[i].data.result)[0]].b[0];
        newPairs[i] = pair;
      }
      state.pairs = newPairs;
    }
  },
  state: {
    pairs: [],
  },
  getters: {
    allPairs(state) {
      return state.pairs;
    }
  }
}