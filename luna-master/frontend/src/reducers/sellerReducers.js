import {
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAIL,
  SELLER_LOGOUT,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAIL,
  SELLER_DETAILS_REQUEST,
  SELLER_DETAILS_SUCCESS,
  SELLER_DETAILS_FAIL,
  SELLER_DETAILS_RESET,
  SELLER_UPDATE_PROFILE_REQUEST,
  SELLER_UPDATE_PROFILE_SUCCESS,
  SELLER_UPDATE_PROFILE_FAIL,
  SELLER_LIST_SUCCESS,
  SELLER_LIST_REQUEST,
  SELLER_LIST_FAIL,
  SELLER_LIST_RESET,
  SELLER_DELETE_FAIL,
  SELLER_DELETE_SUCCESS,
  SELLER_DELETE_REQUEST,
  SELLER_UPDATE_REQUEST,
  SELLER_UPDATE_SUCCESS,
  SELLER_UPDATE_FAIL,
  SELLER_UPDATE_RESET,
} from "../constants/sellerConstants";

export const sellerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_LOGIN_REQUEST:
      return { loading: true };
    case SELLER_LOGIN_SUCCESS:
      return { loading: false, sellerInfo: action.payload };
    case SELLER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case SELLER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const sellerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_REGISTER_REQUEST:
      return { loading: true };
    case SELLER_REGISTER_SUCCESS:
      return { loading: false, sellerInfo: action.payload };
    case SELLER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const sellerDetailsReducer = (state = { seller: {} }, action) => {
  switch (action.type) {
    case SELLER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SELLER_DETAILS_SUCCESS:
      return { loading: false, seller: action.payload };
    case SELLER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SELLER_DETAILS_RESET:
      return { seller: {} };

    default:
      return state;
  }
};

export const sellerUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case SELLER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, sellerInfo: action.payload };
    case SELLER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerListReducer = (state = { sellers: [] }, action) => {
  switch (action.type) {
    case SELLER_LIST_REQUEST:
      return { ...state,loading: true };
    case SELLER_LIST_SUCCESS:
      return { loading: false, sellers: action.payload };
    case SELLER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case SELLER_LIST_RESET:
      return { sellers: [] };
    default:
      return state;
  }
};

export const sellerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_DELETE_REQUEST:
      return { loading: true };
    case SELLER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SELLER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sellerUpdateReducer = (state = { seller: {} }, action) => {
  switch (action.type) {
    case SELLER_UPDATE_REQUEST:
      return { loading: true };
    case SELLER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case SELLER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SELLER_UPDATE_RESET:
      return { seller: {} };
    default:
      return state;
  }
};
