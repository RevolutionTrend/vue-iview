<template>
  <div id="SideBar">
    <div class="logoArea" :class="logoClass">
      <img src="../assets/logo.png">
    </div>
    <Menu
      ref="sideMenu"
      :active-name="activeName"
      :open-names="openNames"
      theme="dark"
      width="auto"
      :class="menuitemClasses"
      :accordion="isAccordion"
      @on-select="changeTitle"
      @on-open-change="changeSubCollapse"
      @breadcrumb-home="selectHome"
    >
      <component
        v-for="item in routes"
        :key="item.path"
        :is="item.hasOwnProperty('children')?'Submenu':'MenuItem'"
        :name="item.path"
        :to="item.path"
      >
        <!-- Submenu -->
        <template v-if="item.hasOwnProperty('children')">
          <template slot="title">
            <div class="icon-area">
              <i v-if="item.hasOwnProperty('icon')" class="fas" :class="item.icon"></i>
            </div>
            <span>{{item.name}}</span>
            <span class="submenu-title-space"></span>
          </template>
          <component
            v-for="subItem in item.children"
            :key="subItem.path"
            :is="subItem.hasOwnProperty('children')?'Submenu':'MenuItem'"
            :name="subItem.path"
            :to="subItem.path"
          >
            <!-- Sub-Submenu -->
            <template v-if="subItem.hasOwnProperty('children')">
              <template slot="title">
                <div class="icon-area">
                  <i v-if="subItem.hasOwnProperty('icon')" class="fas" :class="subItem.icon"></i>
                </div>
                <span>{{subItem.name}}</span>
                <span class="submenu-title-space"></span>
              </template>
              <component
                :is="'MenuItem'"
                v-for="thirdItem in subItem.children"
                :key="thirdItem.path"
                :name="thirdItem.path"
                :to="thirdItem.path"
              >
                <div class="icon-area">
                  <i v-if="thirdItem.hasOwnProperty('icon')" class="fas" :class="thirdItem.icon"></i>
                </div>
                <span>{{thirdItem.name}}</span>
              </component>
            </template>

            <!-- Sub-MenuItem -->
            <template v-if="!subItem.hasOwnProperty('children')">
              <div class="icon-area">
                <i v-if="subItem.hasOwnProperty('icon')" class="fas" :class="subItem.icon"></i>
              </div>
              <span>{{subItem.name}}</span>
            </template>
          </component>
        </template>

        <!-- MenuItem -->
        <template v-if="!item.hasOwnProperty('children')">
          <div class="icon-area">
            <i v-if="item.hasOwnProperty('icon')" class="fas" :class="item.icon"></i>
          </div>
          <span>{{item.name}}</span>
        </template>
      </component>
    </Menu>
  </div>
</template>

<script>
import Vue from "vue";
import { Menu, MenuItem, Submenu } from "iview";
import routes from "../views/routes.js";
import { MENUCHANGETITLE, CHANGEMENUCOLLAPSE } from "../vuex/actions.js";

Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Submenu", Submenu);

// const getSingleArr = list => {
//   let arr = [];
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].hasOwnProperty("children")) {
//       arr = [...arr, ...getSingleArr(list[i].children)];
//     } else {
//       arr.push(list[i]);
//     }
//   }
//   return arr;
// };

// const routesArr = getSingleArr(routes);

// const defaultPage = routesArr.find(function(e) {
//   return e.path === location.pathname;
// });
// console.log(defaultPage);
const pathname = location.pathname;
let openNames = [];
if (pathname.lastIndexOf("/") !== 0) {
  const nameArr = pathname.split("/");
  let nameStr = "";
  for (let i = 1; i < nameArr.length - 1; i++) {
    nameStr += "/" + nameArr[i];
    openNames.push(nameStr);
  }
}

export default {
  name: "SideBar",
  data() {
    return {
      routes,
      openNames,
      isAccordion: true
    };
  },
  computed: {
    activeName() {
      let nowName = "/";
      const currentPage = this.$router.options.routes.find(function(e) {
        return e.path === pathname;
      });
      if (currentPage) {
        nowName = currentPage.path;
        this.$store.dispatch(MENUCHANGETITLE, currentPage.name);
      }
      return nowName;
    },
    menuitemClasses() {
      return [
        "menu-item",
        this.$store.state.isCollapsed ? "collapsed-menu" : ""
      ];
    },
    logoClass() {
      return this.$store.state.isCollapsed
        ? "collapsedLogo"
        : "unCollapsedLogo";
    }
  },
  methods: {
    changeTitle(path) {
      console.log(path);
      const toPage = this.$router.options.routes.find(function(e) {
        return e.path === path;
      });
      if (toPage) {
        this.$store.dispatch(MENUCHANGETITLE, toPage.name);
      }
      if (this.$store.state.isCollapsed) {
        this.$store.dispatch(CHANGEMENUCOLLAPSE);
      }
    },
    changeSubCollapse() {
      if (this.$store.state.isCollapsed) {
        this.$store.dispatch(CHANGEMENUCOLLAPSE);
      }
    },
    selectHome() {
      console.log("event emitted");
      this.$refs.sideMenu.updateActiveName();
    }
  }
};
</script>

<style>
#SideBar {
  width: 100%;
  height: 100%;
}
.logoArea {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logoArea img {
  width: 60px;
  height: 60px;
}
.unCollapsedLogo {
  height: 80px;
}
.unCollapsedLogo img {
  animation: smallToBig 0.2s linear forwards;
}
.collapsedLogo {
  height: 64px;
}
.collapsedLogo img {
  animation: bigToSmall 0.2s linear forwards;
}
.ivu-menu-item {
  display: flex !important;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 24px;
}
.ivu-menu-item-selected {
  border-right: none;
  color: #fff !important;
  background: #2d8cf0 !important;
}
.ivu-menu-submenu-title {
  display: flex !important;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 24px;
}
.submenu-title-space {
  flex: 1;
}
.ivu-menu-submenu-title-icon {
  top: 0 !important;
}
.icon-area {
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: auto;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
  text-align: left;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.collapsed-menu .ivu-menu-submenu-title-icon {
  display: none;
}
.collapsed-menu .ivu-menu-submenu ul {
  display: none;
}
@keyframes bigToSmall {
  from {
    width: 60px;
    height: 60px;
  }
  to {
    width: 30px;
    height: 30px;
  }
}
@keyframes smallToBig {
  from {
    width: 30px;
    height: 30px;
  }
  to {
    width: 60px;
    height: 60px;
  }
}
</style>

