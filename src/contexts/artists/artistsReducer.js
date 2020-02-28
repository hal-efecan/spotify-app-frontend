import { LONG_TERM, MEDIUM_TERM, SHORT_TERM } from './artistsTypes';

export const artistsReducer = (state, action) => {
    switch(action.type) {
      case LONG_TERM:
        return {
          ...state,
          term: 'long_term'
        };
      case MEDIUM_TERM:
        return {
          ...state,
          term: 'medium_term'
        };
      case SHORT_TERM:
        return {
          ...state,
          term: 'short_term'
        };
      default:
        return state
    }
  }