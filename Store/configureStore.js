import { createStore } from 'redux';
import tooggleFavoriteReducer from './Reducers/favoriteReducer'

export default createStore(tooggleFavoriteReducer);