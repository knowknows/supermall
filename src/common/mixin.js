import { debounce } from "common/utils";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //对refresh进行防抖操做
    let refresh = debounce(this.$refs.scroll.refresh, 50);

    this.itemImgListener = () => {
      refresh();
      // console.log(this.$refs.scroll.refresh);
    };
    //监听图片加载完毕,组件创建完后
    this.$bus.$on("loadImage", this.itemImgListener);
  },
}