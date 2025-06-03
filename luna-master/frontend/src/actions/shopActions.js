import {

   SHOP_DETAILS_REQUEST,
   SHOP_DETAILS_SUCCESS,
   SHOP_DETAILS_FAIL,

   SHOP_LIST_SUCCESS,
   SHOP_LIST_FAIL,
   SHOP_LIST_REQUEST,

   SHOP_DELETE_SUCCESS,
   SHOP_DELETE_FAIL,
   SHOP_DELETE_REQUEST,

  } from "../constants/shopConstants"

  
  import axios from "axios";
  

  
  export const getShopDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOP_DETAILS_REQUEST,
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
  
      const { data } = await axios.get(`/shops/${id}`, config);
      dispatch({
        type: SHOP_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SHOP_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listShops = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOP_LIST_REQUEST,
      });
  
      const {
        sellerLogin: { sellerInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${sellerInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/shops`, config);
  
      dispatch({
        type: SHOP_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SHOP_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const deleteShop = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHOP_DELETE_REQUEST,
      });
  
      const {
        sellerLogin: { sellerInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${sellerInfo.token}`,
        },
      };
  
      await axios.delete(`/shops/${id}`, config);
  
      dispatch({ type: SHOP_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: SHOP_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
