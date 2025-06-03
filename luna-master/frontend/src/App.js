import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AboutScreen from "./screens/AboutScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import SellerListScreen from "./screens/SellerListScreen";
import ShopListScreen from "./screens/ShopListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SuperAdminScreen from "./screens/SuperAdminScreen";
import SellerHomeScreen from "./screens/sellerScreens/SellerHomeScreen";
import SellerLoginScreen from "./screens/sellerScreens/SellerLoginScreen";
import SellerRegisterScreen from "./screens/sellerScreens/SellerRegisterScreen";
import SellerProductList from "./screens/sellerScreens/SellerProductList";
import SellerProductScreen from "./screens/sellerScreens/SellerProductScreen";
import SellerProfileScreen from "./screens/sellerScreens/SellerProfileScreen";
import SellerOrderListScreen from "./screens/sellerScreens/SellerOrderListScreen";
import SellerOrderScreen from "./screens/sellerScreens/SellerOrderScreen";
import SellerLandingScreen from "./screens/sellerScreens/SellerLandingScreen";
import SellerProductEditScreen from "./screens/sellerScreens/SellerProductEditScreen";
import SellerDashboardScreen from "./screens/sellerScreens/SellerDashboardScreen";
import NotFoundSeller from "./screens/NotFoundSeller";
import NotFoundUser from "./screens/NotFoundUser";
function App() {
  return (
    <Router>
      {window.location.host.split(".")[0] === "lunacommerce" ? (
        <Switch>
          <Route path="/" component={SellerHomeScreen} exact />
          <Route path="/about" component={AboutScreen} exact />
          <Route path="/seller" component={SellerLandingScreen} exact />
          <Route path="/login" component={SellerLoginScreen} exact />
          <Route path="/register" component={SellerRegisterScreen} exact />
          <Route path="/seller/userlist" component={UserListScreen} />
          <Route path="/seller/sellerlist" component={SellerListScreen} />
          <Route path="/seller/shoplist" component={ShopListScreen} />
          <Route path="/seller/user/:id/edit" component={UserEditScreen} />
          <Route
            path="/seller/productlist"
            component={SellerProductList}
            exact
          />
          <Route
            path="/seller/product/:id"
            component={SellerProductScreen}
            exact
          />
          <Route
            path="/seller/product/:id/edit"
            component={SellerProductEditScreen}
            exact
          />
          <Route path="/seller/profile" component={SellerProfileScreen} exact />
          <Route
            path="/seller/orderlist"
            component={SellerOrderListScreen}
            exact
          />
          <Route
            path="/seller/orders/:id"
            component={SellerOrderScreen}
            exact
          />
          <Route
            path="/seller/dashboard"
            component={SellerDashboardScreen}
            exact
          />
           <Route
            path="/seller/superadmindashboard"
            component={SuperAdminScreen}
            exact
          />
          <Route component={NotFoundSeller} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/payment" exact component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
          <Route path="/orders/:id" component={OrderScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/:shop/search/:keyword" component={HomeScreen} />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/Profile" component={ProfileScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/" component={HomeScreen} exact />
          <Route component={NotFoundUser} />
        </Switch>
      )}

      <Footer />
    </Router>
  );
}

export default App;
