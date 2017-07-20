import { FETCH_CRS_CODE } from'../actions/Types'

export default function(state=[], action){
  switch (action.type) {
    case FETCH_CRS_CODE:
      return [...state, ...action.payload]
}
  return state
}
