import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,

  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_RESET,

  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  CART_REMOVE_ITEM_RESET,

  CART_SAVE_SHIPPING_ADDRESS_REQUEST,
  CART_SAVE_PAYMENT_METHOD_REQUEST,
} from '../constants/cartConstants'

export const cartListReducer = (state = { carts: [] }, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true, carts: [] }
    case CART_LIST_SUCCESS:
      return {
        loading: false,
        carts: action.payload.carts,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cartCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return { loading: true }
    case CART_ADD_ITEM_SUCCESS:
      return { loading: false, success: true, carts: action.payload }
    case CART_ADD_ITEM_FAIL:
      return { loading: false, error: action.payload }
    case CART_ADD_ITEM_RESET:
      return {}
    default:
      return state
  }
}

export const cartDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_REMOVE_ITEM_REQUEST:
      return { loading: true }
    case CART_REMOVE_ITEM_SUCCESS:
      return { loading: false, success: true }
    case CART_REMOVE_ITEM_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.cart === item.cart)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.cart === existItem.cart ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REMOVE_ITEM_REQUEST:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.cart !== action.payload),
      }
    case CART_SAVE_SHIPPING_ADDRESS_REQUEST:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    case CART_SAVE_PAYMENT_METHOD_REQUEST:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    default:
      return state
  }
}
