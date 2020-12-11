import Vue from 'vue'
import Vuex from 'vuex'
//导入封装好的vuex
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getter"
Vue.use(Vuex)

//创建state对象
const state = {
  cartList: []
}
export default new Vuex.Store({
  //相当于data
  state,
  // state: {
  //   cartList: []
  // },
  //相当于methods
  //mutations唯一的目地就是修改state中的状态
  //mutations中的每个方法尽可能的完后单一点
  getters,
  mutations,
  actions,
  // mutations: {
  //   // addCart(state, payload) {

  //   //   //1:第一种比较常规的写法
  //   //   // let oldpayload = null;
  //   //   // state.cartList.forEach(element => {
  //   //   //   //如果cartList里的iid和payload.iid相等
  //   //   //   //证明就是同同一件商品,所以就直接赋值
  //   //   //   if (element.iid === payload.iid) {
  //   //   //     oldpayload = element;
  //   //   //   }
  //   //   // });

  //   //   //2:这个是判断item.iid === payload.iid是否相等
  //   //   //如果相等就是item的值赋值给oldpayload
  //   //   let oldpayload = state.cartList.find(item => {
  //   //     return item.iid === payload.iid;
  //   //   })
  //   //   if (oldpayload) {
  //   //     oldpayload.count++;
  //   //   } else {
  //   //     payload.count = 1;
  //   //     state.cartList.push(payload);
  //   //   }
  //   // }

  //     //3：这是把他放在actions里面进新了封装
  //   // addCounter(state, payload) {
  //   //   payload.count++;
  //   // },
  //   // addToCart(state, payload) {
  //   //   state.cartList.push(payload);
  //   // }
  // },
  // actions: {
  //   addCart(context, payload) {
  //     let oldpayload = context.state.cartList.find(item => {
  //       return item.iid === payload.iid;
  //     })
  //     if (oldpayload) {
  //       context.commit('addCounter', oldpayload)
  //       // oldpayload.count++;
  //     } else {
  //       payload.count = 1;
  //       context.commit('addToCart', payload)

  //     }
  //   }
  // },
  modules: {
  }
})
