import { combineReducers } from 'redux';
import fetchRoutes from './fetchRoutes_reducer'
import fetchCrsCode from './fetchCrsCode_reducer'

const rootReducer = combineReducers({
  fetchRoutes,
  fetchCrsCode
});

export default rootReducer;
