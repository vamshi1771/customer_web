import { combineReducers, createStore } from '@reduxjs/toolkit'
import snackbarReducer from './Reducers/SnackBarReducer';
import {DarkModeReducers} from '../Redux/Reducers/DarkModeReducers'

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    DarkMode:DarkModeReducers,
});

const store = createStore(rootReducer);

export default store;
