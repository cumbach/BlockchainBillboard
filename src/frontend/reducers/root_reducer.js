import { combineReducers } from 'redux';
import pixelsReducer from './pixels_reducer';
import selectedPixelsReducer from './selected_pixels_reducer';
import web3Reducer from './web3_reducer';
import accountsReducer from './accounts_reducer';

const rootReducer = combineReducers({
  selectedPixels: selectedPixelsReducer,
  pixels: pixelsReducer,
  web3: web3Reducer,
  accounts: accountsReducer
});

export default rootReducer;
