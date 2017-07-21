import { FETCH_ROUTES } from'../actions/Types'

const defaultState = {
  routes: []
}

export default function(state = defaultState, action){
  switch (action.type) {
    case FETCH_ROUTES:
      return {
        ...state,
        routes: action.payload
      }
  }
  return state
}
