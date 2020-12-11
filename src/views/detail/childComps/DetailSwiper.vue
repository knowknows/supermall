<template>
  <Swiper class="swiperItem">
    <SwiperItem v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" />
    </SwiperItem>
  </Swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  created() {},
  components: {
    Swiper,
    SwiperItem
  },
  methods: {}
};
</script>
<style scoped>
.swiperItem {
  height: 300px;
  overflow: hidden;
}
.swiperItem img {
  width: 100%;
  height: 100%;
}
</style>
