<template>
  <div id="app">
    <Layout>
      <Sider ref="SideBar" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <SideBar :isCollapsed="isCollapsed"/>
      </Sider>
      <Layout>
        <Header>
          <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
          </div>
        </Header>
        <Content>
          <router-view/>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.ivu-layout {
  height: 100%;
  width: 100%;
}
</style>

<script>
import Vue from "vue";
import { Layout, Header, Sider, Content, Footer } from "iview";
import SideBar from "./components/SideBar.vue";

Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Sider", Sider);
Vue.component("Content", Content);
Vue.component("Footer", Footer);
Vue.component("SideBar", SideBar);

export default {
  name: "App",
  data() {
    return {
      isCollapsed: false
    };
  }
};
</script>

