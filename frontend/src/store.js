import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  newCustomOrderReducer,
  // newReviewReducer,
  customOrderDetailsReducer,
  customOrderReducer,
  customOrderReviewsReducer,
  customOrdersReducer,
  myCustomOrdersReducer,
  confirmCustomOrderReducer,
  declineCustomOrderReducer,
  pendingCustomOrdersReducer,
  confrimedCustomOrdersReducer,
  assignCustomOrderReducer,
  assignedCustomOrdersReducer,
  myAssignedCustomOrdersReducer,
  updateProgressReducer,
  // customerPendingCustomOrdersReducer,
  // reviewReducer,
  myPendingCustomOrdersReducer,
} from "./reducers/customOrderReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
  allTeamUsersReducer
} from "./reducers/userReducer";

import {
  newProjectReducer,
  projectReducer,
  projectsReducer,
} from "./reducers/projectReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  customOrders: customOrdersReducer,
  productDetails: productDetailsReducer,
  customOrderDetails: customOrderDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  newCustomOrder: newCustomOrderReducer,
  product: productReducer,
  customOrder: customOrderReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  customOrderReviews: customOrderReviewsReducer,
  review: reviewReducer,
  projects: projectsReducer,
  myCustomOrders: myCustomOrdersReducer,
  project: projectReducer,
  newProject: newProjectReducer,
  confirmCustomOrder:   confirmCustomOrderReducer,
  declineCustomOrder:   declineCustomOrderReducer,
  pendingCustomOrders : pendingCustomOrdersReducer,
  confirmedCustomOrders : confrimedCustomOrdersReducer,
  teamUsers: allTeamUsersReducer,
  assignCustomOrder:assignCustomOrderReducer,
  assignedCustomOrders : assignedCustomOrdersReducer,
  myAssignedCustomOrders : myAssignedCustomOrdersReducer,
  updateProgress : updateProgressReducer,
  myPendingCustomOrders: myPendingCustomOrdersReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
