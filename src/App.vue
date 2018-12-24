<template>
  <div id="app">
    <Layout>
      <Sider ref="sidebar" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <SideBar/>
      </Sider>
      <Layout>
        <Header>
          <div class="menu-icon" @click="collapsedSider">
            <i class="fas fa-bars"></i>
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
.ivu-layout-sider {
  overflow: hidden;
}
.ivu-layout-header {
  padding-left: 0 !important;
}
.menu-icon {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #fff;
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
import { CHANGEMENUCOLLAPSE } from "./vuex/actions.js";

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
      isCollapsed: this.$store.state.isCollapsed
    };
  },
  methods: {
    collapsedSider() {
      // this.$store.commit("collapseMenu");
      this.$store.dispatch(CHANGEMENUCOLLAPSE);
      this.$refs.sidebar.toggleCollapse();
    }
  },
  computed: {}
};
</script>

