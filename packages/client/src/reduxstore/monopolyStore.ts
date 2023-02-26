import { configureStore } from '@reduxjs/toolkit';

//app reducers
const appReducer = {
};

export const store = configureStore({
  reducer: appReducer,
});

// Use RootState and Dispatch typing inside files that will need this reference.
// Therefore, these definitions are created and exported within the store.ts file.

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
