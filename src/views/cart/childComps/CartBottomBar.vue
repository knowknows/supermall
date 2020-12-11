<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton
        class="check-button"
        :isChecked="isChecked"
        @click.native="checkClick"
      ></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算{{ checkedLength }}</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  components: {
    CheckButton
  },
  computed: {
    //计算总价格
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((total, item) => {
            return (total += item.price * item.count);
          }, 0)
          .toFixed(2)
      );
    },
    //去计算
    checkedLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    //全选按钮知否选中
    isChecked() {
      //1:这是第一种传统的做法利用cartList
      // return !this.$store.state.cartList.cartList(item => {
      //   return !item.checked;
      // }).length;

      //2:find找到就会返回数据,然后取反就会是false
      if (this.$store.state.cartList.length === 0) {
        return false;
      } else {
        return !this.$store.state.cartList.find(item => {
          return !item.checked;
        });
      }
    }
  },
  methods: {
    checkClick() {
      if (this.isChecked) {
        //全部选中的时候点击
        //就变成全部不选中
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        //如果有部分选中或者全部不选中
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isChecked) {
        this.$toast.show("请选择商品");
      }
      console.log(1111);
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 90px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 20px;
  margin: 0 10px 0;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 60px;
  background-color: red;
  color: #fff;
  text-align: center;
  font-size: 14px;
}
</style>
