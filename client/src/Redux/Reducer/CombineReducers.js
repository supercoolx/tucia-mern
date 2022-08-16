import CartBadgeReducer from "./CartBadgeReducer";
import OrderBadgeReducer from "./OrderBadgeReducer";
import LoginReducer from "./LoginReducer";
import PricingReducer from "./PricingReducer";

import { combineReducers } from "redux";

export default combineReducers({
  counter: CartBadgeReducer,
  order: OrderBadgeReducer,
  login: LoginReducer,
  pricing: PricingReducer,
});
