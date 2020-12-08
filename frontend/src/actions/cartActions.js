import axios from 'axios'
import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,

  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,

  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_UPDATE_ITEM_FAIL,

  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,

  CART_SAVE_SHIPPING_ADDRESS_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS_SUCCESS,
  CART_SAVE_SHIPPING_ADDRESS_FAIL,

  CART_SAVE_PAYMENT_METHOD_REQUEST,
  CART_SAVE_PAYMENT_METHOD_SUCCESS,
  CART_SAVE_PAYMENT_METHOD_FAIL,
} from '../constants/cartConstants'
import { logout } from './userActions'

export const listCarts = (pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/carts?pageNumber=${pageNumber}`,
      config
    )

    dispatch({
      type: CART_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    let { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: CART_ADD_ITEM_REQUEST,
    })

    const cart = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    }

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    data = await axios.post(`/api/carts/${id}`, cart, config)
    
    dispatch({
      type: CART_ADD_ITEM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: message,
    })
  }
}

export const updateCart = (cart, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_UPDATE_ITEM_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    cart.qty = qty
    const { data } = await axios.put(
      `/api/carts/${cart._id}`,
      cart,
      config
    )

    dispatch({
      type: CART_UPDATE_ITEM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CART_UPDATE_ITEM_FAIL,
      payload: message,
    })
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM_REQUEST,
      payload: id,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/carts/${id}`, config)

    dispatch({
      type: CART_REMOVE_ITEM_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CART_REMOVE_ITEM_FAIL,
      payload: message,
    })
  }
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS_REQUEST,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD_REQUEST,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
