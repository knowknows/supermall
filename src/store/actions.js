import { ADD_COUNTER, ADD_TOCART } from "./mutations-types"
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldpayload = context.state.cartList.find(item => {
        return item.iid === payload.iid;
      })
      if (oldpayload) {
        context.commit(ADD_COUNTER, oldpayload)
        resolve('当前数量+1');
        // oldpayload.count++;
      } else {
        payload.count = 1;
        context.commit(ADD_TOCART, payload)
        resolve('添加了新的商品');
      }
    })

  }
}