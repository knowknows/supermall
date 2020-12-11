export default {
  cartlenght(state) {
    // console.log(222, state.cartList.length);
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList;
  }
}