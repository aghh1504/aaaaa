import { FETCH_ROUTES } from'../actions/Types'

export default function(state=[], action){
  switch (action.type) {
    case FETCH_ROUTES:
      return [...state, action.payload]
  }
  return state
}
