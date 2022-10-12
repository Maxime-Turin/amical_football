import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import reducer from '../reducers';
import authMiddleware from '../middlewares/auth';
import signUpMiddleware from '../middlewares/signUp';
import dataMiddleware from '../middlewares/data';
import userMiddleware from '../middlewares/user';
import requestMiddleware from '../middlewares/request';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    authMiddleware,
    signUpMiddleware,
    dataMiddleware,
    userMiddleware,
    requestMiddleware,
  ),
);

const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store);

export { persistor };
export default store;
