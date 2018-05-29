<template>
  <article class="home">
    <p>home!</p>
    <router-link to="/Home/Foo">Go to Foo</router-link>
    <router-link to="/Home/Bar">Go to Bar</router-link>
    <router-view></router-view>
  </article>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },

  computed: {

  },

  created() {

  },

  mounted() {

  },

  activated() {

  },

  methods: {

  },

  components: {

  },

}
</script>

<style lang="stylus" scoped>
  @import '../assets/css/var'

  .home {

  }
</style>
