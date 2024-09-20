import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Đảm bảo import đúng
import rootReducer from './store/reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Đảm bảo `thunk` được truyền vào `applyMiddleware`
);

export default store;
