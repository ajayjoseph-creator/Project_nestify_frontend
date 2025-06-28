import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import propertyReducer from '../features/properties/propertySlice'
import singlePropertyReducer from '../features/properties/singlePropertySlice'
import userReducer from '../features/user/userSlice'
import subscriptionReducer from '../features/subscription/subscriptionSlice';
import propertyUploadReducer from '../features/properties/propertyUploadSlice'
import ownerReducer from '../features/owner/ownerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    singleProperty: singlePropertyReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    propertyUpload: propertyUploadReducer,
    owner: ownerReducer 
  },
});