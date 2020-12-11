<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></CartListItem>
    </Scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  //计算属性
  computed: {
    ...mapGetters(["cartList"])
  },
  //注册组件
  components: {
    Scroll,
    CartListItem
  },
  //因为这个被混缓存了,所以需要用actived这个事件
  //activated是进来的时候触发这个事件
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
