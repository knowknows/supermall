<template>
  <div class="HomeSwiper">
    <Swiper>
      <SwiperItem v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageload" />
        </a>
      </SwiperItem>
    </Swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isflage: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageload() {
      if (!this.isflage) {
        this.$emit("swiperimageload");
        this.isflage = true;
      }
    }
  }
};
</script>
<style scoped></style>
