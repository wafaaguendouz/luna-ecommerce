import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  shopListReducer,
} from "./reducers/shopReducers";

import {
  sellerLoginReducer,
  sellerRegisterReducer,
  sellerDetailsReducer,
  sellerUpdateProfileReducer,
  sellerListReducer,
  sellerDeleteReducer,
  sellerUpdateReducer,
} from "./reducers/sellerReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";
import { cartReducer } from "./reducers/cartReducers";

axios.defaults.baseURL = "https://api.lunacommerce.xyz/";
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  shopList: shopListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  sellerLogin: sellerLoginReducer,
  sellerRegister: sellerRegisterReducer,
  sellerDetails: sellerDetailsReducer,
  sellerUpdateProfile: sellerUpdateProfileReducer,
  sellerList: sellerListReducer,
  sellerDelete: sellerDeleteReducer,
  sellerUpdate: sellerUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  orderDeliver: orderDeliverReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const sellerInfoFromStorage = localStorage.getItem("sellerInfo")
  ? JSON.parse(localStorage.getItem("sellerInfo"))
  : null;

//bringing shippingAdressfromlocalStorage
const ShippingAddressFromStorage = localStorage.getItem("shippingAddress") //check for shippingAdress in local storage
  ? JSON.parse(localStorage.getItem("shippingAddress")) //if it's out there let's use it
  : {};

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: ShippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  sellerLogin: { sellerInfo: sellerInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
