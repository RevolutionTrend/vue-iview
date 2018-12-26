<template>
  <div id="app">
    <Layout>
      <Sider
        ref="sidebar"
        hide-trigger
        collapsible
        :collapsed-width="78"
        :value="getCollapseStatus"
      >
        <SideBar/>
      </Sider>
      <Layout>
        <Header>
          <PageTop/>
        </Header>
        <Content>
          <Breadcrumb>
            <BreadcrumbItem to="/" @click="clickHome">Home</BreadcrumbItem>
            <BreadcrumbItem v-if="showSecond">{{getTitle}}</BreadcrumbItem>
          </Breadcrumb>
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
  padding: 0 !important;
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
.ivu-layout-content {
  padding: 20px;
}
.ivu-breadcrumb {
  width: 100%;
  height: 30px;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.ivu-breadcrumb span {
  font-size: 20px;
}
</style>

<script>
import Vue from "vue";
import {
  Layout,
  Header,
  Sider,
  Content,
  Footer,
  Breadcrumb,
  BreadcrumbItem
} from "iview";
import SideBar from "./components/SideBar.vue";
import PageTop from "./components/PageTop.vue";
import { CHANGEMENUCOLLAPSE } from "./vuex/actions.js";

Vue.component("Layout", Layout);
Vue.component("Header", Header);
Vue.component("Sider", Sider);
Vue.component("Content", Content);
Vue.component("Footer", Footer);
Vue.component("Breadcrumb", Breadcrumb);
Vue.component("BreadcrumbItem", BreadcrumbItem);
Vue.component("SideBar", SideBar);
Vue.component("PageTop", PageTop);

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
    },
    clickHome() {
      console.log("click home");
    }
  },
  computed: {
    getCollapseStatus() {
      return this.$store.state.isCollapsed;
    },
    showSecond() {
      return this.$store.state.title !== "Home";
    },
    getTitle() {
      return this.$store.state.title;
    }
  }
};
</script>

