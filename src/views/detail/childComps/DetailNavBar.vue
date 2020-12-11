<template>
  <div class="detail-nav-bar">
    <NavBar>
      <div slot="left" class="left" @click="goClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title"
          @click="titleClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  data() {
    return {
      titles: ["商品", "参数", "评论","推荐"],
      currentIndex: 0
    };
  },
  created() {},
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
      // console.log("titleClick");
    },
    goClick() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.detail-nav-bar {
  background-color: #fff;
  position: relative;
  z-index: 1;
}
.left {
  margin-top: 5px;
}
.left img {
  width: 20px;
  height: 20px;
}
.center {
  display: flex;
}
.title {
  flex: 1;
}
.active {
  color: red;
}
</style>
