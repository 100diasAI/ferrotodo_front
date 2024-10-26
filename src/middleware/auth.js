export const authMiddleware = store => next => action => {
  if (action.type === 'GET_ALL_FAVS' || action.type === 'ADD_FAVORITE') {
    const state = store.getState();
    if (!state.auth.isAuthenticated) {
      console.error('User not authenticated');
      return next({ type: `${action.type}_ERROR`, payload: 'User not authenticated' });
    }
  }
  return next(action);
};

