import fetch from 'cross-fetch';

export const FETCH_URL = "FETCH_URL";

const initial = {
  clicks: 0,
  fetching: false,
  urls: [],
  errors: []
};

const merge = (state, obj) => {
  return Object.assign({}, state, obj);
}

export function reducer(state = initial, action) {
  let newState = state;

  console.log(action);
  switch(action.type) {
    case "APP_STARTED":
      newState = merge(state, {visible: true});
      break;
    case "BOOM":
      newState = merge(state, {clicks: state.clicks + 1});
      break;
  }

  console.log(newState);
  return newState;
}

export function fetchUrl(url) {

}

