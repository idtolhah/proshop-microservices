import {
  USER_ADDRESS_DETAILS_FAIL,
  USER_ADDRESS_DETAILS_REQUEST,
  USER_ADDRESS_DETAILS_RESET,
  USER_ADDRESS_DETAILS_SUCCESS,
  USER_ADDRESS_MAIN_FAIL,
  USER_ADDRESS_MAIN_REQUEST,
  USER_ADDRESS_MAIN_RESET,
  USER_ADDRESS_MAIN_SUCCESS,
  USER_ADDRESS_LIST_REQUEST,
  USER_ADDRESS_LIST_SUCCESS,
  USER_ADDRESS_LIST_FAIL,
  USER_ADDRESS_LIST_RESET,
  USER_ADDRESS_CREATE_FAIL,
  USER_ADDRESS_CREATE_REQUEST,
  USER_ADDRESS_CREATE_SUCCESS,
  USER_ADDRESS_DELETE_REQUEST,
  USER_ADDRESS_DELETE_SUCCESS,
  USER_ADDRESS_DELETE_FAIL,
  USER_ADDRESS_UPDATE_REQUEST,
  USER_ADDRESS_UPDATE_SUCCESS,
  USER_ADDRESS_UPDATE_FAIL,
  USER_ADDRESS_UPDATE_RESET,
} from '../constants/userAddressConstants'

export const userAddressCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESS_CREATE_REQUEST:
      return { loading: true }
    case USER_ADDRESS_CREATE_SUCCESS:
      return { loading: false, userAddress: action.payload }
    case USER_ADDRESS_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userAddressDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_ADDRESS_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_ADDRESS_DETAILS_SUCCESS:
      return { loading: false, userAddress: action.payload }
    case USER_ADDRESS_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_ADDRESS_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userAddressMainReducer = (state = { user: {} }, action) => {
  console.log('action: ', action)
  switch (action.type) {
    case USER_ADDRESS_MAIN_REQUEST:
      return { ...state, loading: true }
    case USER_ADDRESS_MAIN_SUCCESS:
      return { loading: false, userAddress: action.payload }
    case USER_ADDRESS_MAIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_ADDRESS_MAIN_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userAddressListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ADDRESS_LIST_REQUEST:
      return { loading: true }
    case USER_ADDRESS_LIST_SUCCESS:
      return { loading: false, userAddress: action.payload }
    case USER_ADDRESS_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_ADDRESS_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userAddressDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADDRESS_DELETE_REQUEST:
      return { loading: true }
    case USER_ADDRESS_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_ADDRESS_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userAddressUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_ADDRESS_UPDATE_REQUEST:
      return { loading: true }
    case USER_ADDRESS_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_ADDRESS_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_ADDRESS_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}
