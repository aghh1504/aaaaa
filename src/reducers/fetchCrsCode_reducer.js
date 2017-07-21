import { FETCH_CRS_CODE } from'../actions/Types'

const defaultState = {
  crsCodes: []
}

export default function(state = defaultState, action){
  switch (action.type) {
    case FETCH_CRS_CODE:
      return {
        ...state,
        crsCodes: action.payload
      }
  }
  return state
}
