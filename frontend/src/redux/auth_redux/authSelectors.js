export const selectAuth=(state)=>state.auth;
export const selectIUser=(state)=>state.auth.user;
export const selectStatus=(state)=>state.auth.status;
export const selectError=(state)=>state.auth.error;
export const selectIsAuthenticated=(state)=>state.auth.isLoggedIn;
