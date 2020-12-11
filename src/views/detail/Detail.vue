<template>
  <div id="detail">
    <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll
      class="content"
      ref="scroll"
      @scroll="contnentscroll"
      :probeType="3"
    >
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goodsInfo"></DetailBaseInfo>
      <DeatilShopInfo :shop="shop"></DeatilShopInfo>
      <DetailGoodsInfo
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo" ref="params"></DetailParamInfo>
      <DetailComentInfo
        :commentInfo="commenInfo"
        ref="commen"
      ></DetailComentInfo>
      <GoodsList :goodsList="recommends" ref="recommends"></GoodsList>
    </Scroll>
    <DetailBottomBar @addtoCart="addtoCart"></DetailBottomBar>
    <BackTop @click.native="backtopClick" v-show="isShow"></BackTop>
    <!-- <Toast :message="message" :show="show"></Toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DeatilShopInfo from "./childComps/DeatilShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailComentInfo from "./childComps/DetailComentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import Toast from "components/common/toast/Toast";
import BackTop from "components/content/backTop/BackTop";

//mixin
import { itemListenerMixin } from "common/mixin";
import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import { debounce } from "common/utils";
export default {
  name: "Detail",
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: 0,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commenInfo: {},
      recommends: [],

      // themTopYs: [0, 1000, 2000, 3000],
      themTopYs: [],
      getThemeTopY: null,
      currentindex: 0,
      // itemImgListener: null
      isShow: false
      // show: false,
      // message: ""
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    this.getDetail();
    this.getRecommend();
    //4给getThemeTopY赋值 (进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themTopYs = [];
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.params.$el.offsetTop);
      this.themTopYs.push(this.$refs.commen.$el.offsetTop);
      this.themTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themTopYs.push(Number.MAX_VALUE); //这是骇客的做法
      // console.log(this.themTopYs);
    }, 100);
  },
  components: {
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    Scroll,
    DeatilShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
    // Toast
  },
  methods: {
    backtopClick() {
      // console.log(this.$refs.scroll.scroll);
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 500);
    },
    getDetail() {
      getDetail(this.iid).then(res => {
        //1:获取数据
        const data = res.result;
        //2:取出轮播图数据
        this.topImages = data.itemInfo.topImages;
        //3:创建商品的对象
        this.goodsInfo = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //4:获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //5:获取商品详情数据
        this.detailInfo = data.detailInfo;

        //6:获取参数列表
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        //7:取出评论信息
        if (data.rate.cRate !== 0) {
          this.commenInfo = data.rate.list[0];
        }
        //小图标点击回到顶部

        // console.log(res);

        //1:第一次获取，值压根没有进行渲染
        //这时虽然发送了请求，但是还是在渲染，需要一会
        // this.themTopYs = [];
        // this.themTopYs.push(0);
        // this.themTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themTopYs.push(this.$refs.commen.$el.offsetTop);
        // this.themTopYs.push(this.$refs.recommends.$el.offsetTop);
        // console.log(this.themTopYs);

        // this.$nextTick(() => {
        //   //2:第二次获取，图片没有进行渲染
        //   //这里虽然可以读取，但是demo中的图片还没有加载完
        //   this.themTopYs = [];
        //   this.themTopYs.push(0);
        //   this.themTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themTopYs.push(this.$refs.commen.$el.offsetTop);
        //   this.themTopYs.push(this.$refs.recommends.$el.offsetTop);
        //   console.log(this.themTopYs);
        // });
      });
    },
    getRecommend() {
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list;
      });
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    //点击找到对应的位置
    titleClick(index) {
      // console.log(111111);
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 200);
      // console.log(index);
    },
    //监听滚动
    contnentscroll(position) {
      const positionY = -position.y;
      // console.log(positionY);
      //[0, 1000, 2000, 3000],
      //positionY在 0和100之间,index=0
      //positionY在 100和300之间,index=1
      //positionY在 200和300之间,index=2
      ///positionY在>300 index=3
      let length = this.themTopYs.length;
      // for (let i = 0; i < length; i++) {
      for (let i = 0; i < length - 1; i++) {
        // if (positionY > this.themTopYs[i] && positionY <this.themTopYs[i + 1]) {
        //   console.log(i);
        // }

        // if (
        //   this.currentindex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themTopYs[i] &&
        //     positionY < this.themTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themTopYs[i]))
        // ) {
        //   this.currentindex = i;
        //   this.$refs.nav.currentIndex = this.currentindex;
        // }

        if (
          this.currentindex !== i &&
          positionY >= this.themTopYs[i] &&
          positionY < this.themTopYs[i + 1]
        ) {
          this.currentindex = i;
          this.$refs.nav.currentIndex = this.currentindex;
        }
      }
      this.isShow = -position.y > 1000;
    },

    //
    ...mapActions(["addCart"]),
    //点击加入购物车
    addtoCart() {
      //1：获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.iid = this.iid;

      //2:将商品添加到购物车里 这里添加到vuex里的moudent
      // this.$store.commit("addCart", product);
      // console.log(111111111);

      // 2:将数据放到actions里
      this.$store.dispatch("addCart", product).then(res => {
        // this.message = res;
        // this.show = true;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        // console.log(this.$toast);
        this.$toast.show(res);
      });

      // //3:利用映射关系
      // this.addCart(product).then(res => {
      //   console.log(res);
      // });
    }
  },
  mounted() {
    //1:这里注释是因为用了mixins
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // this.itemImgListener = () => {
    //   refresh();
    //   // console.log(this.$refs.scroll.refresh);
    // };
    // this.$bus.$on("loadImage", this.itemImgListener);
  },
  destroyed() {
    this.$bus.$off("loadImage", this.itemImgListener);
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>
