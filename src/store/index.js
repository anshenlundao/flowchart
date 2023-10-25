import {combineReducers} from 'redux' 
import { configureStore } from '@reduxjs/toolkit'
import {initCirclePropsReducer} from '@/store/reducers/circle'

const reducer=combineReducers({
  initCirclePropsReducer
})
export default configureStore({reducer})