import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import PRODUCT reducers
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers'
// import CART reducer
import { 
  cartListReducer,
  cartCreateReducer,
  cartDeleteReducer,
} from './reducers/cartReducers'
// import USER reducers
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
// import USER ADDRESS reducers
import {
  userAddressCreateReducer,
  userAddressDeleteReducer,
  userAddressDetailsReducer,
  userAddressMainReducer,
  userAddressListReducer,
  userAddressUpdateReducer,
} from './reducers/userAddressReducers'
// import ORDER reducers
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

// COMBINE reducers into one (reducer) ({
//    stateName: stateNameReducer,
//    a: doSomethingWithA,             })
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  
  cartList: cartListReducer,
  cartCreate: cartCreateReducer,
  cartDelete: cartDeleteReducer,
  
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  userAddressCreate: userAddressCreateReducer,
  userAddressDetails: userAddressDetailsReducer,
  userAddressMain: userAddressMainReducer,
  userAddressList: userAddressListReducer,
  userAddressUpdate: userAddressUpdateReducer,
  userAddressDelete: userAddressDeleteReducer,
  
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
})

// const cartItemsFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//   ? JSON.parse(localStorage.getItem('shippingAddress'))
//   : {}
// inisialisasi state AWAL
const initialState = {
  // cart: {
    // cartItems: cartItemsFromStorage,
    // shippingAddress: shippingAddressFromStorage,
    // paymentMethod: JSON.parse(localStorage.getItem('paymentMethod'))
  // },
  userLogin: { userInfo: userInfoFromStorage },
}
// optional middleware yg dimasukkan ke store
const middleware = [thunk]

// store berisi state yg akan menentukan konten di UI 
// berdasarkan update yg dilakukan/dikirimkan oleh reducer
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
