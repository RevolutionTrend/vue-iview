<template>
  <div class="page-top">
    <div class="page-top-side menu-icon" @click="collapsedSider">
      <i class="fas fa-bars"></i>
    </div>
    <span class="paget-top-title">{{getTitle}}</span>
    <div class="page-top-side page-top-tools">
      <i class="fas fa-user-circle"></i>
    </div>
  </div>
</template>

<style lang="scss">
$pageTopHeight: 64px;
.page-top {
  width: 100%;
  height: $pageTopHeight;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.page-top-side {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #fff;
}
.menu-icon {
  width: $pageTopHeight;
}
.page-top-tools {
  width: auto;
  padding-left: 17px;

  i {
    margin-right: 17px;
  }
}
.paget-top-title {
  flex: 1;
  height: 100%;
  line-height: $pageTopHeight;
  text-align: center;
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
}
</style>

<script>
import { CHANGEMENUCOLLAPSE } from "../vuex/actions.js";

export default {
  name: "PageTop",
  methods: {
    collapsedSider() {
      this.$store.dispatch(CHANGEMENUCOLLAPSE);
      console.log(this.$refs);
    }
  },
  computed: {
    getTitle() {
      return this.$store.state.title;
    }
  }
};
</script>

