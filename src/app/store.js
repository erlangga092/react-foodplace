import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import authReducer from "../features/Auth/reducer";
import productReducer from "../features/Products/reducer";
import cartReducer from "../features/Cart/reducer";

import thunk from "redux-thunk";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
});

const store = createStore(
    rootReducers,
    composerEnhancer(applyMiddleware(thunk))
);

export default store;
