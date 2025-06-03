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
  SELLER_LIST_REQUEST,
  SELLER_LIST_SUCCESS,
  SELLER_LIST_FAIL,
  SELLER_DELETE_FAIL,
  SELLER_DELETE_SUCCESS,
} from "../constants/sellerConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import { USER_DELETE_REQUEST, USER_LIST_RESET } from "../constants/userConstants";

import axios from "axios";

export const login = (email, password,isAdmin) => async (dispatch) => {
  try {
    dispatch({
      type: SELLER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/sellers/login",
      { email, password },
      config
    );
    dispatch({
      type: SELLER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("sellerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SELLER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("sellerInfo");
  dispatch({ type: SELLER_LOGOUT });
  dispatch({ type: SELLER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

export const register =({ name, email, shop, password, offer }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SELLER_REGISTER_REQUEST,
      });
      const { data } = await axios.post(
        "/sellers",
        { name, email, password, shop, offer },
        {headers: {
          "Content-Type": "application/json",
        }}
      );
      dispatch({
        type: SELLER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: SELLER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("sellerInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SELLER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};

export const getSellerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELLER_DETAILS_REQUEST,
    });

    const {
      sellerLogin: { sellerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sellerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/sellers/${id}`, config);
    dispatch({
      type: SELLER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSellers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELLER_LIST_REQUEST,
    });

    const {
      sellerLogin: { sellerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${sellerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/sellers`, config);

    dispatch({
      type: SELLER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSeller = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      sellerLogin: { sellerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${sellerInfo.token}`,
      },
    };

    await axios.delete(`/sellers/${id}`, config);

    dispatch({ type: SELLER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: SELLER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSellerProfile = (seller) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELLER_UPDATE_PROFILE_REQUEST,
    });

    const {
      sellerLogin: { sellerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sellerInfo.token}`,
      },
    };

    const { data } = await axios.put(`/sellers/profile`, seller, config);

    dispatch({
      type: SELLER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELLER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
