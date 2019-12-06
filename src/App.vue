<template>
  <div id="app">
    <h2>Kraken Test</h2>
    <b-table striped hover :items="allPairs" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'app',
  computed: mapGetters(['allPairs']),
  methods: mapActions(['getPairs']),
  async mounted() {
    this.getPairs();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.cell1 {
  position: absolute;
  float: left;
  margin-left: 30px;
  width: 50px;
}
.cell2 {
  position: absolute;
  float: left;
  margin-left: 120px;
  width: 50px;
}
.cell2 {
  position: absolute;
  float: left;
  margin-left: 320px;
  width: 50px;
}


</style>
