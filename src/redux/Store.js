import { combineReducers, createStore } from '@reduxjs/toolkit'
import snackbarReducer from './reducers/SnackBarReducer';
import {DarkModeReducers} from './reducers/DarkModeReducers'

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    DarkMode:DarkModeReducers,
});

const store = createStore(rootReducer);

export default store;
