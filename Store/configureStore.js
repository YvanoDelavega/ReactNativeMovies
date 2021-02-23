import {createStore} from 'redux';
// import {createStore, combineReducers} from 'redux';
import tooggleFavoriteReducer from './Reducers/favoriteReducer'
import setAvatarReducer from './Reducers/avatarReducer';
import {persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export default createStore(tooggleFavoriteReducer);
/*export default createStore(
  combineReducers({tooggleFavoriteReducer, setAvatarReducer}),
);*/

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
export default createStore(
  persistCombineReducers(rootPersistConfig, {
    tooggleFavoriteReducer,
    setAvatarReducer,
  }),
);
/*// Store/configureStore.js

import { createStore } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))*/

/*import { createStore } from 'redux';
import tooggleFavoriteReducer from './Reducers/favoriteReducer'

export default createStore(tooggleFavoriteReducer);*/