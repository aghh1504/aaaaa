import axios from 'axios'
import { FETCH_ROUTES, FETCH_CRS_CODE } from './Types'

const API_KEY = '483f0018-5d44-46a9-877c-641cbceea080'
const ROOT_URL = `https://huxley.apphb.com/`

export function fetchRoutes(startingPoint, destination) {
  return dispatch => {
    axios.get(`${ROOT_URL}all/${startingPoint}/from/${destination}/?accessToken=483f0018-5d44-46a9-877c-641cbceea080`)
    .then(res => {
      console.log('res', res.data)
      dispatch({type: FETCH_ROUTES, payload: res.data})
    })
    .catch((err) => console.log(err))
  }
}

export function fetchCrsCode() {
  return dispatch => {
    axios.get(`${ROOT_URL}crs`)
      .then(res => dispatch({type: FETCH_CRS_CODE, payload: res.data}))
      .catch((err) => console.log(err))
  }
}
