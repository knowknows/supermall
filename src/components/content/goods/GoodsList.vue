<template>
  <div class="goods">
    <GoodsListItem
      v-for="(item, indx) in goodsList"
      :key="indx"
      :goodsItem="item"
    ></GoodsListItem>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
