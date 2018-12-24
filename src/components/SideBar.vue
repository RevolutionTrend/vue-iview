<template>
  <div id="SideBar">
    <div class="logoArea" :class="logoClass">
      <img src="../assets/logo.png">
    </div>
    <Menu
      active-name="/"
      theme="dark"
      width="auto"
      :class="menuitemClasses"
      :accordion="isAccordion"
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

Vue.component("Menu", Menu);
Vue.component("MenuItem", MenuItem);
Vue.component("Submenu", Submenu);

// const getMenuItem = item => `
//     <MenuItem name="${item.path}">
//         <i v-if="${item.hasOwnProperty("icon")}" class="fas ${item.icon}"></i>
//         <span>${item.name}</span>
//     </MenuItem>
// `;

// const getSubMenu = item => {
//   let str = `<Submenu name=${item.path}>`;
//   for (let i = 0; i < item.children.length; i++) {
//     if (item.children[i].hasOwnProperty("children")) {
//       str += `
//                 <template slot="title">
//                     <i v-if="${item.hasOwnProperty("icon")}" class="fas ${
//         item.icon
//       }"></i>
//                     <span>${item.name}</span>
//                 </template>
//             `;
//       str += getSubMenu(item.children[i]);
//     } else {
//       str += getMenuItem(item.children[i]);
//     }
//   }

//   str += "</Submenu>";
//   return str;
// };

// const getMenuTemplate = () => {
//   let str =
//     '<Menu active-name="/" theme="dark" width="auto" :class="menuitemClasses">';
//   for (let i = 0; i < routes.length; i++) {
//     if (routes[i].hasOwnProperty("children")) {
//       str += getSubMenu(routes[i]);
//     } else {
//       str += getMenuItem(routes[i]);
//     }
//   }

//   str += "</Menu>";
//   return str;
// };

// const MyMenu = {
//   props: ["isCollapsed", "menuitemClasses"],
//   template: getMenuTemplate(),
//   components: {
//     Menu,
//     MenuItem,
//     Submenu
//   }
// };

export default {
  name: "SideBar",
  data() {
    return {
      routes,
      isAccordion: true
    };
  },
  computed: {
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

