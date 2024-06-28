<template>
  <nav v-if="this.$store.state.userdata !== null">
    <router-link to="/home">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <submit  type="buton" style="cursor: pointer;"  @click.prevent="logout()"> &nbsp;<strong>logout</strong></submit>
  </nav>
  <router-view />
</template>

<script>
import cookie from 'js-cookie';
export default {
   
  methods:{
    logout(){
      cookie.remove('userdata')
      this.$store.state.userdata = null
      this.$router.push('/')
      window.location.reload()
    }
  },
  mounted() {
    
  },
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
