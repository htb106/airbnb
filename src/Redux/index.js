import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import locationReducer from "./Reducer/LocationReducer";
import roomReducer from "./Reducer/RoomReducer";
import authReducer from "./Reducer/AuthReducer";
import userReducer from "./Reducer/UserReducer";

const rootReducer = combineReducers({
  locationReducer,
  roomReducer,
  authReducer,
  userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;