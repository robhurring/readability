import fetch from 'cross-fetch';

export const FETCH_URL = "FETCH_URL";

const initial = {
  fetching: false,
  urls: [],
  errors: []
};

export function reducer(state = initial, action) {
  let newState = state;

  switch(action.type) {
  }

  console.log(action, newState);

  return newState;
}

export function fetchUrl(url) {

}

