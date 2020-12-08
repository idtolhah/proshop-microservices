import axios from 'axios'
import {
  USER_ADDRESS_DETAILS_FAIL,
  USER_ADDRESS_DETAILS_REQUEST,
  USER_ADDRESS_DETAILS_SUCCESS,
  USER_ADDRESS_MAIN_FAIL,
  USER_ADDRESS_MAIN_REQUEST,
  USER_ADDRESS_MAIN_SUCCESS,
  USER_ADDRESS_CREATE_FAIL,
  USER_ADDRESS_CREATE_REQUEST,
  USER_ADDRESS_CREATE_SUCCESS,
  USER_ADDRESS_LIST_FAIL,
  USER_ADDRESS_LIST_SUCCESS,
  USER_ADDRESS_LIST_REQUEST,
  USER_ADDRESS_DELETE_REQUEST,
  USER_ADDRESS_DELETE_SUCCESS,
  USER_ADDRESS_DELETE_FAIL,
  USER_ADDRESS_UPDATE_FAIL,
  USER_ADDRESS_UPDATE_SUCCESS,
  USER_ADDRESS_UPDATE_REQUEST,
} from '../constants/userAddressConstants'
import { logout } from '../actions/userActions'

export const addUserAddress = (address, city, postalCode, province) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADDRESS_CREATE_REQUEST,
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

    const { data } = await axios.post(
      '/api/users/address',
      { address, city, postalCode, province },
      config
    )

    dispatch({
      type: USER_ADDRESS_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_ADDRESS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserAddressDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADDRESS_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/users/address/${id}`, config)

    dispatch({
      type: USER_ADDRESS_DETAILS_SUCCESS,
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
      type: USER_ADDRESS_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const getUserAddressMain = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADDRESS_MAIN_REQUEST,
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

    const { data } = await axios.get(`/api/users/address/main`, config)

    dispatch({
      type: USER_ADDRESS_MAIN_SUCCESS,
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
      type: USER_ADDRESS_MAIN_FAIL,
      payload: message,
    })
  }
}

export const listUserAddress = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADDRESS_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/users/address`, config)

    dispatch({
      type: USER_ADDRESS_LIST_SUCCESS,
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
      type: USER_ADDRESS_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteUserAddress = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADDRESS_DELETE_REQUEST,
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

    await axios.delete(`/api/users/address/${id}`, config)

    dispatch({ type: USER_ADDRESS_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_ADDRESS_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateUserAddress = (userAddress) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADDRESS_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/users/address/${userAddress._id}`, userAddress, config)

    dispatch({ type: USER_ADDRESS_UPDATE_SUCCESS })

    dispatch({ type: USER_ADDRESS_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_ADDRESS_UPDATE_FAIL,
      payload: message,
    })
  }
}
