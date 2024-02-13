import { configureStore } from '@reduxjs/toolkit'
import  sidebarReducer from "./slices/sidebar"
import  searchReducer from "./slices/search"
import  authReducer from "./slices/auth"
import  messageReducer from "./slices/message"

const reducer = {
  auth: authReducer,
  message: messageReducer,
  sidebar: sidebarReducer,
  search: searchReducer
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch