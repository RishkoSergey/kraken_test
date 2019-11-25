import Vue from 'vue';
import Vuex from 'vuex';
import pairs from './modules/pairs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    pairs
  }
});
