<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{ cartlenght }})</div>
    </NavBar>
    <!--商品的列表-->
    <CartList></CartList>
    <!--底部汇总-->
    <CartBottomBar></CartBottomBar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //这个是辅助函数的用法
    ...mapGetters(["cartlenght"])
    // CartLength() {
    //   console.log(111111, this.$store.getters.cartlenght);
    //   return this.$store.getters.cartlenght;
    // }
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
