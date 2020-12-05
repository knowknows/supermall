<template>
  <div id="home">
    <!---导航栏--->
    <NavBar class="home-nav">
      <div slot="center" class="shop">购物车</div>
    </NavBar>
    <!---content会写在swiper里 所以相当于是给swiper添加的--->
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentscroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <!---轮播图--->
      <HomeSwiper :banners="banners"></HomeSwiper>
      <!---轮播图下面--->
      <RecommendView :recommends="recommends"></RecommendView>
      <!---本周流行--->
      <FeatherView></FeatherView>
      <!--- ['流行','新款','精选']--->
      <tabControl
        :titles="titles"
        class="tab-control"
        @tabControl="tabControl"
      ></tabControl>
      <GoodsList :goodsList="showgoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backtopClick" v-show="isShow"></BackTop>
  </div>
</template>
<script>
//导航栏
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
//流行，推荐
import tabControl from "components/content/tabControl/tabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

//轮播图
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
//本周流行
import FeatherView from "./childComps/FeatherView";

//引入网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  data() {
    return {
      banners: [], //轮播图
      recommends: [],
      titles: ["流行", "新款", "精选"], //流行", "新款", "精选
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      backtop: 0,
      isShow: false
    };
  },
  components: {
    NavBar, //头部
    Scroll,
    tabControl, //['流行','新款','精选']
    HomeSwiper, //轮播图
    RecommendView, //轮播下几个图
    GoodsList, // GoodsList商品展示页
    BackTop,
    FeatherView //本周流行
  },
  created() {
    //流行','新款','精选'  上面的所有数据
    this.getHomeMultidata();

    //显示流行 新款 精选 
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听图片加载完毕,组件创建完后
    this.$bus.$on("loadImage", () => {
      this.$refs.scroll && this.$refs.scroll.refresh();
      // console.log(this.$refs.scroll.refresh);
    });
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    tabControl(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    //小图标点击回到顶部
    backtopClick() {
      // console.log(this.$refs.scroll.scroll);
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //监听滚动
    //这里小图标什么时候隐藏和显示
    contentscroll(position) {
      this.isShow = -position.y > 1000;
    },
    //下拉进行加载
    pullingUp() {
      this.getHomeGoods(this.currentType);
    },
    /**
     * 网络请求相关的
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //显示流行 新款 精选
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res.data.list);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        this.$refs.scroll && this.$refs.scroll.finishPullUp();
      });
    }
  },
  activated() {
    this.$refs.scroll && this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: var(--color-tint);
}
.shop {
  color: #fff;
}
.tab-control {
  background-color: #fff;
}
.content {
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
